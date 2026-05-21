"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/button";
import { Sheet, SheetTrigger } from "@/components/sheet";

import UpsertSheetContent, { ComboboxOption } from "./upsert-sheet-content";

interface CreateSaleButtonProps {
  products: {
    id: string;
    name: string;
    price: number;
    stock: number;
  }[];
}

const CreateSaleButton = ({ products }: CreateSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Venda
        </Button>
      </SheetTrigger>
      <UpsertSheetContent
        onSubmitSuccess={() => setSheetIsOpen(false)}
        products={products}
        productOptions={productOptions}
      />
    </Sheet>
  );
};

export default CreateSaleButton;
