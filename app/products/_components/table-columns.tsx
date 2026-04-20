import { Ellipsis } from "lucide-react";

import { ProductModel } from "@/app/generated/prisma/models/Product";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

export const productColumns: Column<ProductModel>[] = [
  {
    header: "Produto",
    accessor: "name",
  },
  {
    header: "Valor unitário",
    accessor: (product: ProductModel) =>
      Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price)),
  },
  {
    header: "Estoque",
    accessor: "stock",
  },
  {
    header: "Status",
    accessor: (product: ProductModel) => (
      <span
        className={cn(
          "rounded-full px-2 py-1 text-xs font-medium",
          product.stock > 0
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700",
        )}
      >
        {product.stock > 0 ? "Em estoque" : "Esgotado"}
      </span>
    ),
  },
  {
    header: "Ações",
    accessor: () => (
      <div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Ellipsis size={20} />
        </Button>
      </div>
    ),
  },
];
