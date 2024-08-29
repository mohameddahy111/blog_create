import BlackButton from "@/app/components/BackButton";
import RenderJson from "@/app/components/dashboard/ReanderJson";
import prisma from "@/app/utils/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JSONContent } from "novel";
import * as React from "react";

export interface IBlogDEtailsPageProps {
  params: Params;
}

async function getSlug(slug: string) {
  const data = await prisma.post.findUnique({
    where: {
      slug: slug
    },
    select: {
      title: true,
      slug: true,
      smallDescription: true,
      image: true,
      id: true,
      createAt: true,
      articleContent: true,
      siteId: true
    }
  });
  if (!data) return notFound();
  return data;
}

export default async function BlogDEtailsPage({
  params
}: IBlogDEtailsPageProps) {
  const data = await getSlug(params.slug);

  return (
    <div>
      <div className="gap-x-3 pt-10 pb-5">
        <BlackButton linlk={`/blog/${params.name}`} text="Back to Blogs" />
      </div>
      <div className=" flex flex-col items-center justify-center mb-10 gap-5">
        <div className="m-auto w-full text-center md:w-7/12">
          <p className="m-auto my-5 w-10/12 text-sm font-light text-muted-foreground md:text-base tracking-tight">
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
              // timeStyle: "medium"
            }).format(data.createAt)}
          </p>
          <h1 className=" text-3xl capitalize font-bold tracking-tight md:text-6xl mb-5">
            {data.title}{" "}
          </h1>
          <p className="m-auto w-10/12 line-clamp-3 text-muted-foreground">
            {data.smallDescription}
          </p>
        </div>
      </div>
      <div className=" relative m-auto mb-5 h-80 w-full max-w-screen-lg overflow-hidden md:h-[600px] md:w-5/6 md:rounded-2xl lg:w-1/2 ">
        <Image
          src={data.image}
          alt={data.title}
          width={1200}
          height={640}
          className=" h-full w-full"
          priority
        />
      </div>
      <RenderJson json={data.articleContent as JSONContent} />
    </div>
  );
}
