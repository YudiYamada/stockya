import "server-only";

import { Product } from "@/app/generated/prisma/client";
import { db } from "@/lib/prisma";

export const getProducts = async (): Promise<Product[]> => {
  return db.product.findMany({});
};
