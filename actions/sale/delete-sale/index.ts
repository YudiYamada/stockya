"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";

import { deleteSaleSchema } from "./schema";

export const deleteSale = actionClient
  .schema(deleteSaleSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.$transaction(async (trx) => {
      const sale = await trx.sale.findUnique({
        where: {
          id,
        },
        include: {
          saleProducts: true,
        },
      });
      if (!sale) return;
      await trx.sale.delete({
        where: {
          id,
        },
      });
      for (const product of sale.saleProducts) {
        await trx.product.update({
          where: {
            id: product.productId,
          },
          data: {
            stock: {
              increment: product.quantity,
            },
          },
        });
      }
    });
    revalidatePath("/", "layout");
  });
