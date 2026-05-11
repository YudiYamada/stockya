import { cachedGetProducts } from "@/data-access/product/get-products";

import CreateProductButton from "./_components/create-product-button";
import { DataTable } from "./_components/data-table";
import { productColumns } from "./_components/table-columns";

const Products = async () => {
  const products = await cachedGetProducts();
  const plainProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    stock: p.stock,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }));
  return (
    <main className="mt-8 w-full px-8">
      <span className="text-primary text-2xl text-[15px] font-semibold">
        Produtos
      </span>
      <div className="flex min-w-full justify-between">
        <h2 className="text-xl font-semibold">Gestão de Produtos</h2>
        <CreateProductButton />
      </div>
      <DataTable
        data={plainProducts}
        columns={productColumns}
        className="mt-5 mb-5"
      />
    </main>
  );
};

export default Products;
