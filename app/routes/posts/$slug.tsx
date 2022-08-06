import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ReactMarkdown from "react-markdown";
import { LiProps, UnorderedListProps } from "react-markdown/lib/ast-to-react";
import invariant from "tiny-invariant";

import type { Post } from "~/models/post.server";

import { getPost } from "~/models/post.server";

type LoaderData = { post: Post };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);
  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  return json<LoaderData>({ post });
};

export const components = {
  ul: ({ children }: UnorderedListProps) => <ul className="list-disc ml-4 mt-4">{children}</ul>,
  // li: ({ children }: LiProps) => <li className=" mt-1">{children}</li>,
}

export default function PostSlug() {
  const { post } = useLoaderData<LoaderData>();

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
      {post.markdown}
      {/* <ReactMarkdown children={post.markdown} components={components} /> */}
    </main>
  );
}
