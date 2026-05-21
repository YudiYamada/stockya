"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import { createSale } from "@/actions/sale/create-sale";
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
import { DataTable } from "@/components/data-table";
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
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/sheet";
import { formatCurrency } from "@/helpers/currency";
import { toast } from "@/lib/toast-store";

import { getProductColumns, SelectedProduct } from "./table-columns";

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
  stock: number;
}

interface UpsertSheetContentProps {
  products: SerializableProduct[];
  productOptions: ComboboxOption[];
  onSubmitSuccess?: () => void;
}

const UpsertSheetContent = ({
  products,
  productOptions,
  onSubmitSuccess,
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
        const productIsOutOfStock =
          existingProduct.quantity + data.quantity > selectedProduct.stock;
        if (productIsOutOfStock) {
          form.setError("quantity", {
            message: `Quantidade de ${selectedProduct.name} excede o estoque disponível (${selectedProduct.stock}).`,
          });
          return currencyProducts;
        }
        form.reset();
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

      const addingExceedsStock = data.quantity > selectedProduct.stock;
      if (addingExceedsStock) {
        form.setError("quantity", {
          message: `Quantidade de ${selectedProduct.name} excede o estoque disponível (${selectedProduct.stock}).`,
        });
        return currencyProducts;
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

  const onSubmitSale = async () => {
    try {
      await createSale({
        products: selectedProducts.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
      });
      toast.success("Venda criada com sucesso!");
      onSubmitSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ocorreu um erro ao criar a venda.");
    }
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

      <DataTable
        columns={getProductColumns(onDelete)}
        data={selectedProducts}
        className="mt-6"
      />
      <div className="mt-4 text-right text-sm font-semibold">
        Total: {formatCurrency(productsTotal)}
      </div>

      <SheetFooter className="pt-6">
        <Button
          className="w-full gap-2"
          disabled={selectedProducts.length === 0}
          onClick={onSubmitSale}
        >
          <CheckIcon size={20} />
          Finalizar Venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent;
