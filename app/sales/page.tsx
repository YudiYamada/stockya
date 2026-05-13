import { Plus } from "lucide-react";

import { Button } from "@/components/button";
import { Sheet, SheetTrigger } from "@/components/sheet";
import { getProducts } from "@/data-access/product/get-products";

import type { ComboboxOption } from "./_components/upsert-sheet-content";
import UpsertSheetContent from "./_components/upsert-sheet-content";

const Sales = async () => {
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  return (
    <main className="mt-8 w-full px-8">
      <span className="text-primary text-2xl text-[15px] font-semibold">
        Vendas
      </span>
      <div className="flex min-w-full justify-between">
        <h2 className="text-xl font-semibold">Gestão de Vendas</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Venda
            </Button>
          </SheetTrigger>
          <UpsertSheetContent productOptions={productOptions} />
        </Sheet>
      </div>
    </main>
  );
};

export default Sales;
