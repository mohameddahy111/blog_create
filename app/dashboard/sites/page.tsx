import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import * as React from "react";
import EmtyData from "@/app/components/dashboard/EmtyData";
import SitesCard from "@/app/components/dashboard/SitesCard";

export interface ISitesPageProps {}

async function getSites(userId: string) {
  const data = await prisma.site.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return data;
}

export default async function SitesPage({}: ISitesPageProps) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  const packagedetails = await prisma.user.findUnique({
    where: {
      id: user.id
    },
    select: {
      package: true,
      payment: true,
      paymentDate: true,
      expiry: true
    }
  });
  const sites = await getSites(user?.id);
  return (
    <div>
      <div className="flex w-full justify-end">
        <Button asChild>
          <Link
            href={
              sites.length <= 10 && packagedetails?.package === "Golden"
                ? "/dashboard/sites/new"
                : sites.length <= 100 && packagedetails?.package === "Platinum"
                ? "/dashboard/sites/new"
                : sites.length === 1 && packagedetails?.package === "Free"
                ? "/dashboard/pricing"
                : "/dashboard/pricing"
            }
          >
            <PlusCircle className="mr-2 size-4" /> create sites
          </Link>
        </Button>
      </div>

      {sites === undefined || sites.length === 0 ? (
        <EmtyData
          title="you don't have any sites yet"
          link="/dashboard/sites/new"
          description="you currently do't have any sites . please create some so that you can see them rght here !"
          buttonText="create sites"
        />
      ) : (
        <SitesCard sites={sites} />
      )}
    </div>
  );
}
