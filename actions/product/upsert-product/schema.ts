import z from "zod";

export const upsertProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, "O nome do produto é obrigatório"),
  price: z.number().positive("O preço deve ser um número positivo"),
  stock: z
    .number()
    .int()
    .min(0, "A quantidade em estoque deve ser um número inteiro não negativo"),
});

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;
