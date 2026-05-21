"use client";

import { formatCurrency } from "@/helpers/currency";
import { cn } from "@/lib/utils";

import { Column, PlainProduct } from "../../../components/data-table";
import TableDropdownMenu from "./table-dropdown-menu";

const ProductActions = ({ product }: { product: PlainProduct }) => {
  return <TableDropdownMenu product={product} />;
};

export const productColumns: Column<PlainProduct>[] = [
  {
    header: "Produto",
    accessor: "name",
  },
  {
    header: "Valor unitário",
    accessor: (product: PlainProduct) => formatCurrency(product.price),
  },
  {
    header: "Estoque",
    accessor: "stock",
  },
  {
    header: "Status",
    accessor: (product: PlainProduct) => (
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
    accessor: (product: PlainProduct) => <ProductActions product={product} />,
  },
];
