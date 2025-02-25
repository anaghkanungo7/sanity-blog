import Link from "next/link";
import groq from "groq";
import client from "../client";

const Index = ({ posts }) => {
  return (
    <div>
      <h1>Anagh&apos;s blog</h1>

      <div>
        <a href="https://anagh-blog.sanity.studio">Login</a>
      </div>

      <br />

      <h3>Posts </h3>

      {posts.length > 0 &&
        posts.map(
          ({ _id, title = "", slug = "", publishedAt = "" }) =>
            slug && (
              <li key={_id}>
                <Link href="/post/[slug]" as={`/post/${slug.current}`}>
                  <a>{title}</a>
                </Link>{" "}
                ({new Date(publishedAt).toDateString()})
              </li>
            )
        )}
    </div>
  );
};

export async function getStaticProps() {
  const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()]|order(publishedAt desc)
    `);
  return {
    props: {
      posts
    },

    revalidate: 10
  };
}

export default Index;
