import { DleteArticle } from "@/app/components/dashboard/DeleteArticle";
import EmtyData from "@/app/components/dashboard/EmtyData";
import prisma from "@/app/utils/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Book, Edit, MoreHorizontal, PlusCircle, Settings } from "lucide-react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import * as React from "react";

export interface ISitesViewPageProps {
  params: Params;
}
async function getSiteDetails(siteId: string, userId: string) {
  const data = await prisma.post.findMany({
    where: {
      siteId: siteId,
      userId: userId
    },
    select: {
      image: true,
      id: true,
      title: true,
      createAt: true,
      Site:{
        select:{
          subdirectory: true,
        }
      }
    },
    orderBy: {
      createAt: "desc"
    }
  });
  return data;
}

export default async function SitesViewPage({ params }: ISitesViewPageProps) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("api/auth/login");
  }
  const { siteId } = params;
  const data = await getSiteDetails(siteId, user.id);

  return (
    <>
      <div className="flex justify-end gap-x-4">
        <Button asChild variant={"secondary"}>
          <Link href={data.length > 0 ? `/blog/${data[0]?.Site?.subdirectory}` : "# "}>
            <Book className="size-4 mr-2" />
            View Blog
          </Link>
        </Button>
        <Button asChild variant={"secondary"}>
          <Link href={`/dashboard/sites/${siteId}/setting`}>
            <Settings className="size-4 mr-2" />
            Setting
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${siteId}/create`}>
            <PlusCircle className="size-4 mr-2" />
            Create Article
          </Link>
        </Button>
      </div>
      <div className="">
        {data.length === 0 || data === undefined ? (
          <EmtyData
            title="you don't have any articles yet"
            link={`/dashboard/sites/${siteId}/create`}
            description="you currently do't have any articles . please create some so that you can see them rght here !"
            buttonText="create articles"
          />
        ) : (
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>Articles</CardTitle>
              <CardDescription>
                mangemnt your blog articles here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Create At</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((ele) => (
                    <TableRow key={ele.id}>
                      <TableCell>
                        <Image
                          src={ele.image}
                          alt={ele.title}
                          className="rounded-md object-cover size-16"
                          width={64}
                          height={64}
                        />
                      </TableCell>
                      <TableCell className="font-semibold capitalize">
                        {ele.title}{" "}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={"outline"}
                          className="bg-green-500/10 text-green-500"
                        >
                          Published{" "}
                        </Badge>{" "}
                      </TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium"
                        }).format(ele.createAt)}
                      </TableCell>
                      <TableCell className="text-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} size={"icon"}>
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel> Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/sites/${siteId}/${ele.id}`}
                              >
                                <Edit className="size-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <DleteArticle
                                item={{ id: ele.id, title: ele.title }}
                              />
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        )}
      </div>
    </>
  );
}
