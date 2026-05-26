"use server";

import { revalidatePath } from "next/cache";
import { returnValidationErrors } from "next-safe-action";

import { db } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";

import { UpsertProductSchema, upsertProductSchema } from "./schema";

export const upsertProduct = actionClient
  .schema(upsertProductSchema)
  .action(async ({ parsedInput }) => {
    const data: UpsertProductSchema = parsedInput;

    if (data.id) {
      const existing = await db.product.findUnique({ where: { id: data.id } });
      if (!existing) {
        returnValidationErrors(upsertProductSchema, {
          id: { _errors: ["Produto não encontrado."] },
        });
      }
    } else {
      const existingByName = await db.product.findFirst({
        where: { name: data.name },
      });
      if (existingByName) {
        returnValidationErrors(upsertProductSchema, {
          name: { _errors: ["Já existe um produto com este nome."] },
        });
      }
    }

    await db.product.upsert({
      where: { id: data.id ?? "" },
      update: {
        name: data.name,
        price: data.price,
        stock: data.stock,
      },
      create: {
        name: data.name,
        price: data.price,
        stock: data.stock,
      },
    });

    revalidatePath("/products");
  });
