import { ClipboardCopyIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";

import { Product } from "@/app/generated/prisma/client";
import { Button } from "@/components/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/drop-down-menu";

interface UpsertSaleTableDropdownMenuProps {
  product: Pick<Product, "id">;
  onDelete: (productId: string) => void;
}

const UpsertSaleTableDropdownMenu = ({
  product,
  onDelete,
}: UpsertSaleTableDropdownMenuProps) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="ghost">
          <MoreHorizontalIcon size={16} />
        </Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownLabel>Ações</DropdownLabel>
        <DropdownSeparator />
        <DropdownItem
          className="gap-1.5"
          onClick={() => navigator.clipboard.writeText(product.id)}
        >
          <ClipboardCopyIcon size={16} />
          Copiar ID
        </DropdownItem>

        <DropdownItem className="gap-1.5" onClick={() => onDelete(product.id)}>
          <TrashIcon size={16} />
          Excluir
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};

export default UpsertSaleTableDropdownMenu;
