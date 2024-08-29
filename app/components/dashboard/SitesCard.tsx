import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import imageDe from "@/public/image_de.jpg";


export interface ISitesCardProps {
    sites : {
    id: string;
    name: string;
    descrption: string;
    subdirectory: string;
    createdAt: Date;
    updateAt: Date;
    imageUrl: string;
    keyId: string;
    userId: string | null;
}[]
}

export default function SitesCard ({sites}: ISitesCardProps) {
  return (
    <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 py-5 ">
      {sites.map((site) => (
        <Card key={site.id}>
          <div
            className={` w-full  flex justify-center  h-[200px] `}
          >
            <Image
              src={site.imageUrl || imageDe}
              alt={site.name}
              className="rounded-t-lg w-full   object-contain "
              width={200}
              height={400}
            /> 
          </div>
          <CardHeader>
            <CardTitle className=" truncate">{site.name} </CardTitle>
            <CardDescription className="line-clamp-3">
              {site.descrption}{" "}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/dashboard/sites/${site.id}`}>view Article</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
