"use client";

import { deleteImage, EsitPostAction } from "@/app/actions";
import TailwindEditor from "@/app/components/dashboard/Edtior";
import { PostSchema } from "@/app/utils/zodSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Atom, ImageDownIcon, ImageOff } from "lucide-react";
import Image from "next/image";
import { JSONContent } from "novel";
import * as React from "react";
import { toast } from "sonner";
import slugify from "react-slugify";
import LoadingButton from "@/app/components/LoadingButton";

export interface IEditArticleProps {
  data: {
    articleContent: any;
    smallDescription: string;
    title: string;
    slug: string;
    id: string;
    image: string;
    siteId: string | null;
    KeyId: string;
  };
}

export default function EditArticle({ data }: IEditArticleProps) {
  const [imageUrl, setImageUrl] = React.useState<undefined | string>(
    data.image
  );
  const [imageKey, setimageKey] = React.useState<undefined | string>(
    data.KeyId
  );

  const [title, setTitle] = React.useState<undefined | string>(data.title);
  const [slugValue, setSlugValue] = React.useState<undefined | string>(
    data.slug
  );
  const [value, setValue] = React.useState<JSONContent | undefined>(
    data.articleContent
  );
  const [lastResult, action] = React.useActionState(EsitPostAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: PostSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput"
  });
  function slugCreator() {
    const titleSlug = title;
    if (titleSlug?.length === 0 || titleSlug === undefined) {
      toast.error("Please enter a title");
    }
    setSlugValue(slugify(titleSlug));
    return toast.success("Slug has been created");
  }
  return (
    <>
      <div className="mt-5">
        <Card>
          <CardHeader>
            <CardTitle>Article Details</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Nesciunt, ea ipsum rem voluptatibus maxime eligendi, impedit eum
              expedita
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-6"
              id={form.id}
              onSubmit={form.onSubmit}
              action={action}
            >
              <Input type="hidden" name="articleId" value={data.id} />
              <Input
                type="hidden"
                name="siteId"
                value={data.siteId as string}
              />

              <div className="grid gap-2">
                <Label className="">Title </Label>
                <Input
                  key={fields.title.key}
                  name={fields.title.name}
                  defaultValue={fields.title.initialValue}
                  placeholder="Next js  ..... "
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p className=" text-red-500 text-sm">{fields.title.errors} </p>
              </div>
              <div className="grid gap-2">
                <Label className="">Slug </Label>
                <Input
                  key={fields.slug.key}
                  name={fields.slug.name}
                  defaultValue={fields.slug.initialValue}
                  placeholder=" Article Slug"
                  value={slugValue}
                  onChange={(e) => setSlugValue(e.target.value)}
                />

                <Button
                  onClick={slugCreator}
                  type="button"
                  variant={"secondary"}
                  className="w-fit"
                >
                  <Atom className="size-4 mr-2" />
                  create Slug
                </Button>
                <p className=" text-red-500 text-sm">{fields.slug.errors} </p>
              </div>
              <div className="grid gap-2">
                <Label className="">Small Decrption </Label>
                <Textarea
                  key={fields.smallDescription.key}
                  name={fields.smallDescription.name}
                  defaultValue={data.smallDescription}
                  className="h-32"
                  placeholder=" Article Descrption ......"
                />
                <p className=" text-red-500 text-sm">
                  {fields.smallDescription.errors}{" "}
                </p>
              </div>
              <div className=" grid gap-2">
                <Label>Caver Image </Label>
                <Input
                  type="hidden"
                  name={fields.coverImage.name}
                  key={fields.coverImage.key}
                  defaultValue={fields.coverImage.initialValue}
                  value={imageUrl}
                />
                <Input
                  type="hidden"
                  name={fields.KeyId.name}
                  key={fields.KeyId.key}
                  defaultValue={fields.KeyId.initialValue}
                  value={imageKey}
                />

                {imageUrl ? (
                  <div className="">
                    <Image
                      className="object-cover"
                      width={200}
                      height={200}
                      src={imageUrl}
                      alt="uplode image"
                    />
                    <Button
                      className="w-fit m-2"
                      variant={'secondary'}
                      type="button"
                      onClick={() => {
                        deleteImage(imageKey as string)
                          .then(() => {
                            setImageUrl(undefined);
                            setimageKey(undefined);
                            toast.success("Image has been deleted");
                          })
                          .catch((err) => {
                            toast.error("Image has not been deleted");
                          });
                      }}
                    >
                      <ImageOff className="size-4 mr-2" />
                      Delete Image
                    </Button>
                  </div>
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
                  {fields.coverImage.errors}{" "}
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Article content </Label>
                <Input
                  type="hidden"
                  name={fields.articleContent.name}
                  key={fields.articleContent.key}
                  defaultValue={fields.articleContent.initialValue}
                  value={JSON.stringify(value)}
                />
                <TailwindEditor onChange={setValue} initialValue={value} />
                <p className=" text-red-500 text-sm">
                  {fields.articleContent.errors}{" "}
                </p>
              </div>
              <div className="">
                <LoadingButton text={"Edit Article"} />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
