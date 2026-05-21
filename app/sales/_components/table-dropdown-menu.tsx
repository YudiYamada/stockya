import { ClipboardCopy, Ellipsis, Trash2 } from "lucide-react";

import { Product } from "@/app/generated/prisma/client";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/drop-down-menu";

interface SalesTableDropdownMenuProps {
  product: Pick<Product, "id">;
  onDelete?: (id: string) => void;
}

const SalesTableDropdownMenu = ({
  product,
  onDelete,
}: SalesTableDropdownMenuProps) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="hover:bg-foreground/5 cursor-pointer rounded-full p-2 transition-colors">
          <Ellipsis size={20} />
        </div>
      </DropdownTrigger>

      <DropdownContent>
        <DropdownItem onClick={() => navigator.clipboard.writeText(product.id)}>
          <ClipboardCopy size={18} /> Copiar ID
        </DropdownItem>

        <DropdownItem onClick={() => onDelete?.(product.id)}>
          <Trash2 size={18} /> Excluir
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};

export default SalesTableDropdownMenu;
