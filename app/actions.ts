"use server";

import { notFound, redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import {
  PostCreationSchema,
  PostSchema,
  SiteCreationSchema
} from "./utils/zodSchema";
import prisma from "./utils/db";
import { requireUser } from "@/lib/requierdUser";
import { UTApi } from "uploadthing/server";
import { strip } from "@/lib/strip";

export async function CreateStiesAction(prevState: any, formData: FormData) {
  const user = await requireUser();
  const submssion = await parseWithZod(formData, {
    schema: SiteCreationSchema({
      async isSubdroctoryUnique() {
        const isExist = await prisma.site.findFirst({
          where: {
            subdirectory: formData.get("subdirectory") as string
          }
        });
        return !isExist;
      }
    }),
    async: true
  });

  if (submssion.status !== "success") {
    return submssion.reply();
  }
  const response = await prisma.site.create({
    data: {
      descrption: submssion.value.descrption,
      name: submssion.value.name,
      subdirectory: submssion.value.subdirectory,
      imageUrl: submssion.value.imageUrl,
      keyId: submssion.value.keyId,
      userId: user.id
    }
  });
  return redirect("/dashboard/sites");
}

export async function CreatePostAction(prevState: any, formData: FormData) {
  const user = await requireUser();
  const submssion = await parseWithZod(formData, {
    schema: PostCreationSchema({
      async isSlugUnique() {
        const isExitst = await prisma.post.findUnique({
          where: {
            slug: formData.get("slug") as string
          }
        });
        return !isExitst;
      }
    }),
    async: true
  });

  if (submssion.status !== "success") {
    return submssion.reply();
  }
  const response = await prisma.post.create({
    data: {
      title: submssion.value.title,
      articleContent: JSON.parse(submssion.value.articleContent),
      slug: submssion.value.slug,
      smallDescription: submssion.value.smallDescription,
      image: submssion.value.coverImage,
      KeyId: submssion.value.KeyId,
      userId: user.id,
      siteId: formData.get("siteId") as string
    }
  });
  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}
export async function EsitPostAction(prevState: any, formData: FormData) {
  const user = await requireUser();
  const submssion = parseWithZod(formData, {
    schema: PostSchema
  });

  if (submssion.status !== "success") {
    return submssion.reply();
  }
  const response = await prisma.post.update({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string
    },
    data: {
      title: submssion.value.title,
      articleContent: JSON.parse(submssion.value.articleContent),
      slug: submssion.value.slug,
      smallDescription: submssion.value.smallDescription,
      image: submssion.value.coverImage,
      KeyId: submssion.value.KeyId,

      userId: user.id
    }
  });
  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}
export async function deleteImage(imageKey: string | string[]) {
  const utapi = new UTApi();
  await utapi.deleteFiles(imageKey);
}

export async function ChandeImageAction(formData: FormData) {
  const user = await requireUser();
  const imageKey = formData.get("imageKey") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const siteId = formData.get("siteId") as string;
  const data = await prisma.site.findUnique({
    where: {
      id: siteId,
      userId: user.id
    }
  });
  await deleteImage(data?.keyId as string);
  await prisma.site.update({
    where: {
      id: siteId,
      userId: user.id
    },
    data: {
      imageUrl: imageUrl,
      keyId: imageKey
    }
  });
  return redirect(`/dashboard/sites/`);
}
export async function DeleteSiteAction(formData: FormData) {
  const user = await requireUser();
  const siteId = formData.get("siteId") as string;
  const keys: string[] = [];
  const data = await prisma.site.findUnique({
    where: {
      id: siteId,
      userId: user.id
    }
  });
  keys.push(data?.keyId as string);
  const article = await prisma.post.findMany({
    where: {
      siteId: siteId,
      userId: user.id
    }
  });
  article.map((ele) => {
    keys.push(ele.KeyId as string);
  });
  await deleteImage(keys);
  await prisma.site.delete({
    where: {
      id: siteId,
      userId: user.id
    }
  });
  return redirect(`/dashboard/sites/`);
}

export async function PaymentStripemothod(formData: FormData) {
  const productId = formData.get("productId") as string;

  const user = await requireUser();
  let stripeUserId = await prisma.user.findUnique({
    where: {
      id: user.id
    },
    select: {
      customerId: true,
      firstName: true,
      email: true,
      expiry: true
    }
  });
  if (!stripeUserId?.customerId) {
    const customer = await strip.customers.create({
      email: stripeUserId?.email,
      name: stripeUserId?.firstName
    });
    stripeUserId = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        customerId: customer.id
      }
    });
  }
  if (stripeUserId?.expiry && stripeUserId?.expiry > new Date()) {
    return redirect("/dashboard/pricing");
  }
  if (productId === "0") {
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        package: "Free",
        payment: null,
        paymentDate: null,
        expiry: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 15)
      }
    });
    return redirect("/dashboard/sites");
  }

  const session = await strip.checkout.sessions.create({
    customer: stripeUserId?.customerId as string,
    mode: "subscription",
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    line_items: [{ price: formData.get("priceId") as string, quantity: 1 }],
    success_url: `http://localhost:3000/payment/${user.id}/${productId}/success`,
    cancel_url: "http://localhost:3000/payment/cancel",
    customer_update: {
      address: "auto",
      name: "auto"
    }
  });
  return redirect(session.url as string);
}

export async function canselPlan(formData: FormData) {
  const user = await requireUser();

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      package: null,
      payment: null,
      paymentDate: null,
      expiry: null,
      customerId: null
    }
  });
  return redirect(`/dashboard/pricing`);
}
export async function expiryPackage() {
  const user = await requireUser();
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
  if (packagedetails?.expiry && packagedetails?.expiry < new Date()) {
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        package: null,
        payment: null,
        paymentDate: null,
        expiry: null,
        customerId: null
      }
    });
  }
  return null;
}
