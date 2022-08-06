import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getPosts } from "~/models/post.server";

type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};

export default function Posts() {
  const { posts } = useLoaderData<LoaderData>();

  console.log(posts);
  return (
    <main className="bg-blue-200 p-6">
      <h1 className="bg-violet-200 sm:bg-violet-300 md:bg-violet-400  lg:bg-violet-500 xl:bg-violet-700 2xl:bg-violet-900">
        Posts
      </h1>
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
      <ul className="list-disc">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
