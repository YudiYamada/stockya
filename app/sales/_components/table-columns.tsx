import { formatCurrency } from "@/helpers/currency";

import SalesTableDropdownMenu from "./table-dropdown-menu";

export interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const getProductColumns = (onDelete: (productId: string) => void) => [
  { header: "Produto", accessor: "name" as const },
  {
    header: "Preço Unitário",
    accessor: (product: SelectedProduct) => formatCurrency(product.price),
  },
  { header: "Quantidade", accessor: "quantity" as const },
  {
    header: "Total",
    accessor: (product: SelectedProduct) =>
      formatCurrency(product.price * product.quantity),
  },
  {
    header: "Ações",
    accessor: (product: SelectedProduct) => (
      <SalesTableDropdownMenu
        product={{ id: product.id }}
        onDelete={onDelete}
      />
    ),
  },
];
