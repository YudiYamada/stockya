"use client";

import { ClipboardCopy, Ellipsis, SquarePen, Trash2 } from "lucide-react";

import { ProductModel } from "@/app/generated/prisma/models/Product";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/drop-down-menu";
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
    accessor: (product: ProductModel) => (
      <Dropdown>
        <DropdownTrigger>
          <Ellipsis size={20} />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem
            onClick={() => navigator.clipboard.writeText(product.id)}
          >
            <ClipboardCopy /> Copiar ID
          </DropdownItem>
          <DropdownItem>
            <SquarePen />
            Editar
          </DropdownItem>
          <DropdownItem>
            <Trash2 /> Excluir
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    ),
  },
];
