"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

import { CreateProductSchema, createProductSchema } from "./schema";

export const createProduct = async (data: CreateProductSchema) => {
  createProductSchema.parse(data);
  await db.product.create({
    data,
  });
  revalidatePath("/products");
};
