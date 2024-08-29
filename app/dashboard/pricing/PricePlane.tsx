import { PaymentStripemothod } from "@/app/actions";
import LoadingButton from "@/app/components/LoadingButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as React from "react";

export interface IPricePlansProps {
  data: any;
}

export default function PricePlans({ data }: IPricePlansProps) {
  return (
    <div
      className={cn(
        data.id === 1 && " border border-[#f0c000]",
        " bg-card rounded-lg p-4 shadow-md font-bold relative "
      )}
    >
      {data.id === 1 && (
        <div className=" absolute z-10 right-1/2 top-0 -translate-y-1/2 translate-x-1/2 ">
          <Badge>Most Popular</Badge>
        </div>
      )}
      <h1 className=" capitalize text-2xl text-center">{data.priceTitle} </h1>
      <p
        className={cn(
          data.priceTitle === "Golden"
            ? "text-[#f0c000] border border-[#f0c000] rounded-md shadow-md shadow-[#f0c000]"
            : data.priceTitle === "Platinum"
            ? "text-[#c86407] border border-[#c86407] rounded-md shadow-md shadow-[#c86407]"
            : "text-primary border border-primary rounded-md shadow-md shadow-primary",
          "text-center mt-5 text-4xl font-bold py-5"
        )}
      >
        {data.price}$ <sup className="text-sm capitalize">monthly</sup>
      </p>
      <p className=" py-5 text-center  text-muted-foreground">
        {data.description}{" "}
      </p>
      <ul className=" flex h-96 flex-col mx-auto sm:items-start items-center ">
        {data.benefites.map((ele: any, i: number) => (
          <li
            className=" p-5 font-normal  w-[250px] m-auto  flex justify-start items-center gap-4"
            key={i}
          >
            <ele.icon />
            <p className=" "> {ele.title} </p>
          </li>
        ))}
      </ul>
      <form action={PaymentStripemothod} >
        <input hidden type="hidden" name="priceId" value={data.priceId} />
        <input hidden type="hidden" name="productId" value={data.id} />
        <LoadingButton text="GET START" className=" w-full " />
      </form>
    </div>
  );
}
