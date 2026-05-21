import { ClipboardCopy, Ellipsis, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

import { AlertDialog, AlertDialogTrigger } from "@/components/alert-dialog";
import { Dialog } from "@/components/dialog";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/drop-down-menu";

import { PlainProduct } from "../../../components/data-table";
import DeleteDialogContent from "./delete-dialog-content";
import UpsertProductDialogContent from "./upsert-dialog";

interface TableDropdownMenuProps {
  product: PlainProduct;
}

const TableDropdownMenu = ({ product }: TableDropdownMenuProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <AlertDialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
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

            <DropdownItem onClick={() => setEditDialogOpen(true)}>
              <SquarePen size={18} /> Editar
            </DropdownItem>

            <AlertDialogTrigger className="w-full">
              <DropdownItem>
                <Trash2 size={18} /> Excluir
              </DropdownItem>
            </AlertDialogTrigger>
          </DropdownContent>
        </Dropdown>
        <UpsertProductDialogContent
          defaultValues={{
            id: product.id,
            name: product.name,
            price: Number(product.price),
            stock: product.stock,
          }}
          onSuccess={() => setEditDialogOpen(false)}
        />
      </Dialog>
      <DeleteDialogContent productId={product.id} />
    </AlertDialog>
  );
};

export default TableDropdownMenu;
