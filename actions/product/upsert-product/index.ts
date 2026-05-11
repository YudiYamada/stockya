"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

import { UpsertProductSchema, upsertProductSchema } from "./schema";

export const upsertProduct = async (data: UpsertProductSchema) => {
  upsertProductSchema.parse(data);
  await db.product.upsert({
    where: { id: data.id ?? "" },
    update: data,
    create: data,
  });
  revalidatePath("/products");
};
