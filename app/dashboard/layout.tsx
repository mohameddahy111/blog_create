import Link from "next/link";
import * as React from "react";
import logo from "@/public/globe.svg";
import Image from "next/image";
import DashboardItems from "../components/dashboard/DashboardItems";
import { ThemeToggle } from "../components/dashboard/ThemeToggel";
import UserMenu from "../components/dashboard/UserMenu";
import prisma from "../utils/db";
import { requireUser } from "@/lib/requierdUser";
import { expiryPackage } from "../actions";

export interface IDashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children
}: IDashboardLayoutProps) {
  const user = await requireUser();
  const userDetalis = await prisma.user.findUnique({
    where: {
      id: user.id
    },
    select: {
      payment: true,
      package: true,
      expiry: true
    }
  });
  if (userDetalis?.expiry && userDetalis?.expiry < new Date()) {
    await expiryPackage().then(() => {
      window.location.reload();
    });
  }
  return (
    <section className=" grid min-h-screen  md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className=" hidden border-r bg-muted/40 md:block">
        <div className=" flex h-full gap-2 max-h-screen flex-col ">
          <div className="flex items-center h-14 border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href={"/"}
              className="flex items-center gap-2 font-semibold capitalize "
            >
              <Image src={logo} alt="logo" className="size-8" />
              <h3 className=" text-2xl w-fit">
                blog <span className="text-primary">create </span>
              </h3>
            </Link>
          </div>
          <div className=" flex-1">
            <div className="grid items-start px-2 font-medium lg:px-4">
              <DashboardItems />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex h-14 items-center gap-4 px-4 border-b bg-muted/40 lg:h-[60px]  lg:px-6">
          <div className="ml-auto flex justify-center items-center gap-x-5">
            <ThemeToggle />
            <div className=" flex justify-center items-center gap-1">
              <UserMenu />
              <span className="text-sm text-green-600">
                {userDetalis?.package}{" "}
              </span>
            </div>
          </div>
        </div>
        <div className=" flex flex-1 flex-col gap-4 lg:gap-6 lg:p-6">
          {children}
        </div>
      </div>
    </section>
  );
}
