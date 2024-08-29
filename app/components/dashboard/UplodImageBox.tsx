"use client";

import { ChandeImageAction } from "@/app/actions";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import * as React from "react";
import { toast } from "sonner";
import LoadingButton from "../LoadingButton";

export interface IUplodImageBoxProps {
  siteId: string;
}

export default function UplodImageBox({ siteId }: IUplodImageBoxProps) {
  console.log(siteId);
  const [imageUrl, setImageUrl] = React.useState<undefined | string>(undefined);
  const [imageKey, setImageKey] = React.useState<undefined | string>(undefined);
  return (
    <div className="w-full py-5">
      <h2 className="text-xl font-bold py-4">Chenge Image</h2>
      {imageUrl ? (
        <div className=" flex flex-col gap-y-4 items-start justify-start">
          <Image
            src={imageUrl}
            alt="image"
            width={200}
            height={200}
            className="rounded-lg size-[200px]"
          />
          <div className="">
            <form action={ChandeImageAction}>
              <input type="text" name="imageKey" hidden value={imageKey} />
              <input type="text" name="imageUrl" hidden value={imageUrl} />
              <input type="text" name="siteId" hidden value={siteId} />
              <input type="text" hidden value={siteId} />
              <LoadingButton text="change image" />
            </form>
          </div>
        </div>
      ) : (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setImageUrl(res[0].url);
            setImageKey(res[0].key);
            toast.success("Image uploaded successfully");
          }}
        />
      )}
    </div>
  );
}
