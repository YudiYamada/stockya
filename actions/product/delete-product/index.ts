"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

import { DeleteProductSchema, deleteProductSchema } from "./schema";

export const deleteProduct = async ({ id }: DeleteProductSchema) => {
  deleteProductSchema.parse({ id });
  await db.product.delete({
    where: { id },
  });
  revalidatePath("/products");
};
