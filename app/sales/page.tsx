import { getProducts } from "@/data-access/product/get-products";

import CreateSaleButton from "./_components/create-sale-button";

const Sales = async () => {
  const products = await getProducts();
  const serializableProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: Number(product.price),
    stock: product.stock,
  }));

  return (
    <main className="mt-8 w-full px-8">
      <span className="text-primary text-2xl text-[15px] font-semibold">
        Vendas
      </span>
      <div className="flex min-w-full justify-between">
        <h2 className="text-xl font-semibold">Gestão de Vendas</h2>
        <CreateSaleButton products={serializableProducts} />
      </div>
    </main>
  );
};

export default Sales;
