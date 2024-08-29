import prisma from "@/app/utils/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import { notFound } from "next/navigation";
import * as React from "react";
import { date } from "zod";
import logo from "@/public/globe.svg";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import imageDe from "@/public/image_de.jpg";
import Link from "next/link";

export interface IBlogPageProps {
  params: Params;
}
async function getData(sudDir: string) {
  const data = await prisma.site.findUnique({
    where: {
      subdirectory: sudDir
    },
    select: {
      name: true,
      posts: {
        select: {
          title: true,
          slug: true,
          smallDescription: true,
          image: true,
          id: true,
          createAt: true
        },
        orderBy: {
          createAt: "desc"
        }
      }
    }
  });
  if (!date) {
    return notFound();
  }
  return data;
}

export default async function BlogPage({ params }: IBlogPageProps) {
  const data = await getData(params.name);
  return (
    <>
      <nav className=" grid grid-cols-3 py-10">
        <div className="col-span-1" />
        <div className=" flex justify-center items-center gap-4">
          <Image src={logo} alt="logo" width={40} height={40} />
          <h1 className="text-2xl font-semibold capitalize tracking-tight">
            {data?.name}
          </h1>
        </div>
      </nav>
      <div className=" my-10">
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 py-5 ">
          {data?.posts.map((item) => (
            <Card key={item.id}>
              <div className={` w-full  flex justify-center  h-[200px] `}>
                <Image
                  src={item.image || imageDe}
                  alt={item.title}
                  className="rounded-t-lg  object-contain "
                  width={200}
                  height={400}
                />
              </div>
              <CardHeader>
                <CardTitle className=" truncate">{item.title} </CardTitle>
                <CardDescription className="line-clamp-3">
                  {item.smallDescription}{" "}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/blog/${params.name}/${item.slug}`}>
                    Read More ....
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
