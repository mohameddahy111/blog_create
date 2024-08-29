import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export interface IBlackButtonProps {
  linlk: string;
  text?: string;
}

export default function BlackButton({ linlk, text }: IBlackButtonProps) {
  return (
    <div className="flex w-fit justify-center items-center gap-x-2">
      <Button title="Go Back" variant={"outline"} size={"icon"} asChild>
        <Link href={linlk}>
          <ChevronLeft className="size-4 mr-2" />
        </Link>
      </Button>
      {text && (
        <h3 className="text-xl font-semibold capitalize truncate">{text}</h3>
      )}
    </div>
  );
}
