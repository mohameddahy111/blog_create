import EditArticle from '@/app/components/forms/EditForm';
import prisma from '@/app/utils/db';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as React from 'react';

export interface IArticleIdEditProps {
    params:Params
}

async function getArticleIdDetails(articleId: string) {
    const data = await prisma.post.findUnique({
      where: {
        id: articleId
      },
      select: {
        title: true,
        articleContent: true,
        image: true,
        id: true,
        slug: true,
        smallDescription: true,
        siteId: true,
        KeyId: true
      }
    });
    if (!data) {
        return notFound();
    }
    return data;
}

export default async function ArticleIdEdit ({params}: IArticleIdEditProps) {
    const { articleId, siteId } = params;
    const data = await getArticleIdDetails(articleId);
  return (
    <div className="">
      <div className="flex items-center">
        <Button asChild size={"icon"} variant={"outline"}>
          <Link href={`/dashboard/sites/${siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold ml-3 capitalize">
          Edit Article{" "}
        </h1>
      </div>
      <div className="">
        <EditArticle data={data}  />
      </div>
    </div>
  );
}
