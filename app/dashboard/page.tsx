import * as React from "react";
import prisma from "../utils/db";
import { requireUser } from "@/lib/requierdUser";
import EmtyData from "../components/dashboard/EmtyData";
import SitesCard from "../components/dashboard/SitesCard";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import imageDe from "@/public/image_de.jpg";


export interface IDashboardIndexProps {}
async function getData(userId: string) {
  const [sites, articles] = await Promise.all([
    prisma.site.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 3
    }),
    prisma.post.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createAt: "desc"
      },
      take: 3
    })
  ]);
  return {
    sites,
    articles
  };
}

export default async function DashboardIndex({}: IDashboardIndexProps) {
  const user = await requireUser();
  const { sites, articles } = await getData(user?.id);
  return (
    <div className="">
      <h3 className="text-2xl font-semibold capitalize mb-5"> your sites</h3>
      {sites.length > 0 ? (
        <SitesCard sites={sites} />
      ) : (
        <EmtyData
          title="you don't have any sites yet"
          link="/dashboard/sites/new"
          description="you currently do't have any sites . please create some so that you can see them rght here !"
          buttonText="Create Sites"
        />
      )}
      <h3 className="text-2xl font-semibold capitalize mb-5">
        {" "}
        Recent articles
      </h3>
      {articles.length > 0 ? (
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 py-5 ">
          {articles.map((item) => (
            <Card key={item.id}>
              <div className={` w-full  flex justify-center  h-[200px] `}>
                <Image
                  src={item.image || imageDe}
                  alt={item.title}
                  className="rounded-t-lg  object-contain "
                  width={200}
                  height={200}
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
                  <Link href={`/dashboard/sites/${item.siteId}/${item.id}`}>
                    Edit Article
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmtyData
          title="you don't have any articles yet"
          link={`/dashboard/sites`}
          description="you currently do't have any articles . please create some so that you can see them rght here !"
          buttonText="Create Articles"
        />
      )}
    </div>
  );
}
