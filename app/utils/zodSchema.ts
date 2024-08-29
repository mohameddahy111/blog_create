import { conformZodMessage } from "@conform-to/zod";
import { boolean, z } from "zod";

export const siteSchema = z.object({
  name: z.string().min(1).max(35),
  descrption: z.string().min(1).max(150),
  subdirectory: z.string().min(1).max(40),
  imageUrl: z.string().min(1),
  keyId: z.string().min(1)
});

export const PostSchema = z.object({
  articleContent: z.string().min(1),
  smallDescription: z.string().min(1).max(200),
  title: z.string().min(1).max(100),
  coverImage: z.string().min(1),
  KeyId: z.string().min(1),
  slug: z.string().min(1).max(190)
});

export function PostCreationSchema(options?: {
  isSlugUnique: () => Promise<boolean>;
}) { 
  return z.object({
    slug: z
      .string()
      .min(1)
      .max(190)
      .transform((value) => value.toLowerCase())
      .pipe(
        z.string().superRefine((slug, ctx) => {
          if (typeof options?.isSlugUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: false
            });
          }
          return options?.isSlugUnique().then((unique) => {
            if (!unique) {
              ctx.addIssue({
                code: "custom",
                message: "Slug already exists"
              });
            }
          });
        })
      ),
    articleContent: z.string().min(1),
    smallDescription: z.string().min(1).max(200),
    title: z.string().min(1).max(100),
    coverImage: z.string().min(1),
    KeyId: z.string().min(1)
  });
  
}

export function SiteCreationSchema(options?: {
  isSubdroctoryUnique: () => Promise<boolean>;
}) {
  return z.object({
    subdirectory: z
      .string()
      .min(1)
      .max(40)
      .regex(/^[a-z]+$/, "subdirectory must be lowercase")
      .transform((value) => value.toLowerCase())
      .pipe(
        z.string().superRefine((text, ctx) => {
          if (typeof options?.isSubdroctoryUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true
            });
            return;
          }
          return options.isSubdroctoryUnique().then((unique) => {
            if (!unique) {
              ctx.addIssue({
                code: "custom",
                message: "Subdirectory already exists"
              });
            }
          });
        })
      ),
    name: z.string().min(1).max(35),
    descrption: z.string().min(1).max(150),
    imageUrl: z.string().min(1),
    keyId: z.string().min(1)
  });
}
