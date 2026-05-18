"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import { DataTable } from "@/app/products/_components/data-table";
import { Button } from "@/components/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSearch,
} from "@/components/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/sheet";
import { formatCurrency } from "@/helpers/currency";

export type ComboboxOption = {
  label: string;
  value: string;
};

const formSchema = z.object({
  productId: z.string().uuid("Seleção de produto é obrigatória."),
  quantity: z.number().positive("A quantidade deve ser um número positivo."),
});

type FormSchema = z.infer<typeof formSchema>;

interface SerializableProduct {
  id: string;
  name: string;
  price: number;
}

interface UpsertSheetContentProps {
  products: SerializableProduct[];
  productOptions: ComboboxOption[];
}

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheetContent = ({
  products,
  productOptions,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const productsTotal = selectedProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  const onDelete = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.filter((product) => product.id !== productId),
    );
  };

  const columns = [
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
        <Button
          type="button"
          variant="destructive"
          onClick={() => onDelete(product.id)}
        >
          Remover
        </Button>
      ),
    },
  ];

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;
    setSelectedProducts((currencyProducts) => {
      const existingProduct = currencyProducts.find(
        (product) => product.id === selectedProduct.id,
      );
      if (existingProduct) {
        return currencyProducts.map((product) => {
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            };
          }
          return product;
        });
      }
      return [
        ...currencyProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
    form.reset();
  };

  return (
    <SheetContent className="rounded-l-3xl">
      <SheetHeader>
        <SheetTitle>Nova Venda</SheetTitle>
        <SheetDescription>
          Insira as informações da venda abaixo.
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox value={field.value} onValueChange={field.onChange}>
                    <ComboboxInput placeholder="Selecione um produto" />
                    <ComboboxContent>
                      <ComboboxSearch placeholder="Procurar produto..." />
                      <ComboboxList>
                        <ComboboxEmpty />
                        {productOptions.map((option) => (
                          <ComboboxItem key={option.value} value={option.value}>
                            {option.label}
                          </ComboboxItem>
                        ))}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    {...field}
                    onChange={(e) =>
                      onChange(parseInt(e.target.value, 10) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full gap-2" variant="secondary">
            <PlusIcon size={20} />
            Adicionar Venda
          </Button>
        </form>
      </Form>

      <DataTable columns={columns} data={selectedProducts} className="mt-6" />
      <div className="mt-4 text-right text-sm font-semibold">
        Total: {formatCurrency(productsTotal)}
      </div>
    </SheetContent>
  );
};

export default UpsertSheetContent;
