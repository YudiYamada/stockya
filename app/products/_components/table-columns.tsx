"use client";

import { ClipboardCopy, Ellipsis, SquarePen, Trash2 } from "lucide-react";

import { AlertDialog, AlertDialogTrigger } from "@/components/alert-dialog";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/drop-down-menu";
import { cn } from "@/lib/utils";

import { Column, PlainProduct } from "./data-table";
import DeleteDialogContent from "./delete-dialog-content";

export const productColumns: Column[] = [
  {
    header: "Produto",
    accessor: "name",
  },
  {
    header: "Valor unitário",
    accessor: (product: PlainProduct) =>
      Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(product.price),
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
    accessor: (product: PlainProduct) => (
      <Dropdown>
        <DropdownTrigger>
          <div className="hover:bg-foreground/5 cursor-pointer rounded-full p-2 transition-colors">
            <Ellipsis size={20} />
          </div>
        </DropdownTrigger>

        <DropdownContent>
          <DropdownItem
            onClick={() => navigator.clipboard.writeText(product.id)}
          >
            <ClipboardCopy size={18} /> Copiar ID
          </DropdownItem>

          <DropdownItem>
            <SquarePen size={18} /> Editar
          </DropdownItem>

          <AlertDialog>
            <AlertDialogTrigger className="w-full">
              <DropdownItem>
                <Trash2 size={18} /> Excluir
              </DropdownItem>
            </AlertDialogTrigger>
            <DeleteDialogContent productId={product.id} />
          </AlertDialog>
        </DropdownContent>
      </Dropdown>
    ),
  },
];
