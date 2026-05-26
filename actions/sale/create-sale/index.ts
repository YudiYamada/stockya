"use server";

import { revalidatePath } from "next/cache";
import { returnValidationErrors } from "next-safe-action";

import { db } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";

import { createSaleSchema } from "./schema";

export const createSale = actionClient
  .schema(createSaleSchema)
  .action(async ({ parsedInput: { products } }) => {
    await db.$transaction(async (trx) => {
      const sale = await trx.sale.create({
        data: {
          date: new Date(),
        },
      });
      for (const product of products) {
        const productFromDb = await db.product.findUnique({
          where: {
            id: product.id,
          },
        });
        if (!productFromDb) {
          returnValidationErrors(createSaleSchema, {
            _errors: [`Produto com ID ${product.id} não encontrado.`],
          });
        }
        const productIsOutOfStock = product.quantity > productFromDb.stock;
        if (productIsOutOfStock) {
          returnValidationErrors(createSaleSchema, {
            _errors: [
              `Quantidade de ${productFromDb.name} excede o estoque disponível (${productFromDb.stock}).`,
            ],
          });
        }
        await trx.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            quantity: product.quantity,
            unitPrice: productFromDb.price,
          },
        });
        await trx.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock: {
              decrement: product.quantity,
            },
          },
        });
      }
    });
    revalidatePath("/products");
  });
