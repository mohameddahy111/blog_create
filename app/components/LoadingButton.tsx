"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { useFormStatus } from "react-dom";

export interface ILoadingButtonProps {
  className?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  text: string;
}

export default function LoadingButton({
  variant,
  className,
  text
}: ILoadingButtonProps) {
  const { pending } = useFormStatus();
  return (
    <div>
      {pending ? (
        <Button disabled className={cn("w-fit", className)} variant={variant}>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Loading...
        </Button>
      ) : (
        <Button className={cn("w-fit", className)} variant={variant}>
          {text}
        </Button>
      )}
    </div>
  );
}
