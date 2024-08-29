import { Button } from "@/components/ui/button";
import { FileIcon, PlusCircle } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export interface IEmtyDataProps {
  title: string;
  link: string;
  description: string;
  buttonText: string;
}

export default function EmtyData({
  title,
  link,
  description,
  buttonText
}: IEmtyDataProps) {
  return (
    <div className="shadow-md p-8 mt-5 text-center animate-in fade-in-50  flex flex-col justify-center items-center  rounded-md border border-dashed">
      <div className="flex justify-center items-center size-20 rounded-full bg-primary/10">
        <FileIcon className="size-10 text-primary" />
      </div>
      <h2 className=" capitalize text-xl mt-6 font-semibold">{title}</h2>
      <p className="mb-8 mt-2 text-center text-sm leading-tight text-muted-foreground max-w-sm mx-auto ">
        {description}
      </p>
      <div className="flex w-full justify-center">
        <Button asChild>
          <Link href={link}>
            <PlusCircle className="mr-2 size-4" /> {buttonText}
          </Link>
        </Button>
      </div>
    </div>
  );
}
