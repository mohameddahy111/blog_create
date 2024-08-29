import prisma from "@/app/utils/db";
import { pricingList } from "@/lib/data";
import { ArrowLeft, CircleCheckBigIcon } from "lucide-react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import { redirect } from "next/navigation";
import * as React from "react";

export interface ISuccessPageProps {
  params: Params;
}
async function updateUser(userId: string, packageName: string) {
  const user = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      package: packageName,
      payment: "success",
      paymentDate: new Date(),
      expiry: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30)
    }
  });
  return user;
}

export default async function SuccessPage({ params }: ISuccessPageProps) {
  const { userId, id } = params;
  const packageName = pricingList.find((p) => p.id == id)?.priceTitle;
  if (!packageName) {
    return redirect('/payment/cancel')
  }
 const user =  await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      payment: true,
      package: true,
      expiry: true,
      customerId: true
    }
  });
  if (!user?.customerId) {
    return redirect(`/dashboard/pricing`);
  } 
  if (user?.expiry && user?.expiry  > new Date(new Date().getTime())) {
    return redirect('/dashboard/sites')
  }
  await updateUser(userId, packageName as string);

  return (
    <div className="flex w-full h-svh flex-col items-center justify-center gap-4">
      <CircleCheckBigIcon className="text-green-500 text-4xl font-bold size-24" />
      <h1 className="text-4xl font-bold capitalize ">
        congratulations to join {packageName}
      </h1>
      <p className=" text-xl "> Enjoy all the features offered to you</p>
      <Link
        href={`/dashboard/sites`}
        className=" text-primary flex justify-center items-center gap-2"
      >
        <ArrowLeft />
        back to Dashboard
      </Link>
    </div>
  );
}
