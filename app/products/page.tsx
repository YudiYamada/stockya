import { Plus } from "lucide-react";

import { Button } from "@/components/button";
import { getProducts } from "@/data-access/product/get-products";

import { DataTable } from "./_components/data-table";
import { productColumns } from "./_components/table-columns";

const Products = async () => {
  const products = await getProducts();
  return (
    <main className="mt-8 w-full px-8">
      <span className="text-primary text-2xl text-[15px] font-semibold">
        Produtos
      </span>
      <div className="flex min-w-full justify-between">
        <h2 className="text-xl font-semibold">Gestão de Produtos</h2>
        <Button className="gap-2">
          <Plus size={16} /> Novo Produto
        </Button>
      </div>
      <DataTable data={products} columns={productColumns} className="mt-5" />
    </main>
  );
};

export default Products;
