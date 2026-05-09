import "server-only";

import { unstable_cache } from "next/cache";

import { Product } from "@/app/generated/prisma/client";
import { db } from "@/lib/prisma";

export const getProducts = async (): Promise<Product[]> => {
  return db.product.findMany({});
};

export const cachedGetProducts = unstable_cache(
  getProducts,
  ["get-products"],
  {
    revalidate: 60, // Revalidate every 60 seconds
  }
)