import Stripe from "stripe";

export const strip = new Stripe(process.env.STRIP_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
  typescript: true
});
