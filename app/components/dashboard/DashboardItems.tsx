"use client";

import { sideMenu } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export interface IDashboardItemsProps {}

export default function DashboardItems(props: IDashboardItemsProps) {
  const pathname = usePathname();
  return (
    <div>
      {sideMenu.map((ele, i) => (
        <Link
          href={ele.link}
          key={i}
          className={cn(
            `flex justify-start px-3 items-center gap-3 rounded-md py-4 transition-all hover:text-primary/70 ${
              pathname === ele.link ? "bg-muted text-primary" : "text-muted-foreground bg-none"
            }`
          )}
        >
          <ele.icon className="size-4" />
          {ele.title}
        </Link>
      ))}
    </div>
  );
}
