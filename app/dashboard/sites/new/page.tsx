'use client'

import { CreateStiesAction } from "@/app/actions";
import LoadingButton from "@/app/components/LoadingButton";
import { siteSchema } from "@/app/utils/zodSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Image from "next/image";
import * as React from "react";
import { toast } from "sonner";

export interface INewPageProps {
}

export default function NewPage({  }: INewPageProps) {
    const [imageUrl, setImageUrl] = React.useState<undefined | string>(undefined);
  const [imageKey, setimageKey] = React.useState<undefined | string>(undefined);

  const [lastResult, action] = React.useActionState(
    CreateStiesAction,
    undefined
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: siteSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput"
  });
  return (
    <div className="flex flex-1 flex-col justify-start items-center">
      <Card className="max-w-[450px] ">
        <CardHeader>
          <CardTitle>create site</CardTitle>
          <CardDescription className=" capitalize">
            create your site here . click the button below once you are done...
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
          <CardContent>
            <div className="flex flex-col gap-y-6">
              <div className=" grid gap-3">
               <Label>Site Name</Label>
                <Input
                  name={fields.name.name}
                  key={fields.name.key}
                  defaultValue={fields.name.initialValue}
                  placeholder="Site Name"
                />
                <p className=" text-red-500 text-sm">{fields.name.errors} </p>
              </div>
              <div className=" grid gap-3">
                <Label> Subdirectory</Label>
                <Input
                  name={fields.subdirectory.name}
                  key={fields.subdirectory.key}
                  defaultValue={fields.subdirectory.initialValue}
                  placeholder="subdirectory"
                />
                <p className=" text-red-500 text-sm">
                  {fields.subdirectory.errors}{" "}
                </p>
              </div>
              <div className=" grid gap-3">
                <Label>Discrption</Label>
                <Textarea
                  name={fields.descrption.name}
                  key={fields.descrption.key}
                  defaultValue={fields.descrption.initialValue}
                  placeholder="small discrption for your site"
                />
              </div>
              <p className=" text-red-500 text-sm">
                {fields.descrption.errors}{" "}
              </p>
              <div className=" grid gap-2">
                <Label>Caver Image </Label>
                <Input
                  type="hidden"
                  name={fields.imageUrl.name}
                  key={fields.imageUrl.key}
                  defaultValue={fields.imageUrl.initialValue}
                  value={imageUrl}
                />
                <Input
                  type="hidden"
                  name={fields.keyId.name}
                  key={fields.keyId.key}
                  defaultValue={fields.keyId.initialValue}
                  value={imageKey}
                />

                {imageUrl ? (
                  <Image
                    className="object-cover"
                    width={200}
                    height={200}
                    src={imageUrl}
                    alt="uplode image"
                  />
                ) : (
                  <UploadDropzone
                    onClientUploadComplete={(res) => {
                      setImageUrl(res[0].url);
                      setimageKey(res[0].key);
                      toast.success("Image has been uploaded");
                    }}
                    endpoint="imageUploader"
                    onUploadError={() => {
                      toast.error("Image has not been uploaded");
                    }}
                  />
                )}
                <p className=" text-red-500 text-sm">
                  {fields.imageUrl.errors}{" "}
                </p>
                
                </div>
              </div>
          </CardContent>
          <CardFooter>
            <LoadingButton text="Submit"/>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
