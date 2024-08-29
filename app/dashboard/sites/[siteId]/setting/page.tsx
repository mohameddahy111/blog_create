import { DeleteSiteAction } from "@/app/actions";
import BlackButton from "@/app/components/BackButton";
import UplodImageBox from "@/app/components/dashboard/UplodImageBox";
import LoadingButton from "@/app/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import * as React from "react";

export interface ISettingPageProps {
  params: Params;
}

export default function SettingPage({ params }: ISettingPageProps) {
  const { siteId } = params;
  return (
    <div>
      <div className=" flex items-center gap-x-4">
        <BlackButton linlk={`/dashboard/sites/${siteId}`} />
      </div>
      <UplodImageBox siteId={siteId} />
      {/* denger container  */}
      <div className="py-4">
        <Card className="border border-red-500 bg-red-500/10">
          <CardHeader>
            <CardTitle className="text-red-500 text-2xl font-bold">
              Dangers{" "}
            </CardTitle>
            <CardDescription>
              you will delete all your data from your site and all your articles
              when you click the delete button
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <form action={DeleteSiteAction}>
              <input type="text" name="siteId" hidden value={siteId} />
              <LoadingButton text="Delete Everything" variant={"destructive"} />
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
