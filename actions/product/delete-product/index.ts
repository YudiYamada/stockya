"use server";

import { revalidatePath } from "next/cache";
import { returnValidationErrors } from "next-safe-action";

import { db } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";

import { DeleteProductSchema, deleteProductSchema } from "./schema";

export const deleteProduct = actionClient
  .schema(deleteProductSchema)
  .action(async ({ parsedInput }) => {
    const data: DeleteProductSchema = parsedInput;

    const product = await db.product.findUnique({ where: { id: data.id } });
    if (!product) {
      returnValidationErrors(deleteProductSchema, {
        id: { _errors: ["Produto não encontrado."] },
      });
    }

    await db.product.delete({
      where: { id: data.id },
    });

    revalidatePath("/products");
  });
