import * as React from "react";
import PricePlans from "./PricePlane";
import { pricingList } from "@/lib/data";
import Link from "next/link";
import { Mail } from "lucide-react";
import prisma from "@/app/utils/db";
import { requireUser } from "@/lib/requierdUser";
import LoadingButton from "@/app/components/LoadingButton";
import { canselPlan } from "@/app/actions";

export interface IPricingPageProps {}

export default async function PricingPage({}: IPricingPageProps) {
  const id = (await requireUser()).id
  const plan = await prisma.user.findUnique({
    where:{
      id: id
    },
    select:{
      expiry:true,
      package:true,
    }
  })
  return (
    <div>
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-semibold text-2xl text-primary">Pricing</p>
        <h1 className=" font-bold text-4xl capitalize my-5 tracking-tight sm:text-2xl">
          Pricing plans for everyone for every budget !{" "}
        </h1>
      </div>
      <p className=" mx-auto max-w-2xl mt-6 text-center leading-5 text-gray-500 text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        soluta eum quia porro possimus, fugiat exercitationem! Deleniti sequi, a
        facilis excepturi molestiae incidunt nostrum maxime reiciendis dolore
        vitae dolores eius.
      </p>
      {plan?.expiry && (plan?.expiry > new Date()) && (
      <div className="my-5 w-full  bg-red-500/10 shadow-md rounded-md capitalize">
        <h2 className=" text-red-500 font-bold text-center text-2xl py-5 ">
          {" "}
          worring !
        </h2>
        <p className=" text-center py-5 ">
          You are subscribed to a package {plan?.package} valid for use until
          the date{" "}
          {Intl.DateTimeFormat("en-US", {
            dateStyle: "medium"
          }).format(plan?.expiry as Date)}
        </p>
        <p className=" text-center py-5 ">
          if you want to subscribe to a package other than {plan?.package}{" "}
          please cancel it first
        </p>
        <div className="py-5 flex justify-center items-center">
          <form action={canselPlan}>
            <LoadingButton text="Cancel Subscription" variant={'destructive'} />
          </form>
        </div>
      </div>
      )}
      <div className="grid grid-cols-1  justify-center w-full gap-4 mt-10 sm:grid-cols-2 lg:grid-cols-3 py-10">
        {pricingList.map((item) => (
          <PricePlans data={item} key={item.id} />
        ))}
      </div>
      <div className="mt-5">
        <h3 className="py-5 capitalize text-xl md:text-3xl text-center truncate font-semibold">
          {" "}
          for more Plans please connect us{" "}
        </h3>
        <Link href={"#"}>
          <p className=" flex justify-center items-center text-primary ">
            <Mail className="size-4" />: info@blogcreator.com
          </p>
        </Link>
      </div>
    </div>
  );
}
