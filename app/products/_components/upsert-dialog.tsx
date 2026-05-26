"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { upsertProduct } from "@/actions/product/upsert-product";
import {
  UpsertProductSchema,
  upsertProductSchema,
} from "@/actions/product/upsert-product/schema";
import { Button } from "@/components/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";
import { toast } from "@/lib/toast-store";

interface UpsertProductDialogContentProps {
  defaultValues?: UpsertProductSchema;
  onSuccess?: () => void;
}

const UpsertProductDialogContent = ({
  defaultValues,
  onSuccess,
}: UpsertProductDialogContentProps) => {
  const form = useForm<UpsertProductSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertProductSchema),
    defaultValues: defaultValues ?? {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const isEditing = !!defaultValues;
  const { execute: executeUpsert } = useAction(upsertProduct, {
    onError: ({ error: { validationErrors } }) => {
      const flat = flattenValidationErrors(validationErrors);
      if (flat.formErrors?.length) {
        toast.error(flat.formErrors[0]);
      }
      Object.entries(flat.fieldErrors ?? {}).forEach(([key, arr]) => {
        const msg = Array.isArray(arr) ? arr[0] : undefined;
        if (msg) {
          form.setError(key as keyof UpsertProductSchema, { message: msg });
        }
      });
    },
    onSuccess: () => {
      if (isEditing) {
        toast.success("Produto atualizado com sucesso.");
      } else {
        toast.success("Produto adicionado com sucesso.");
      }
      onSuccess?.();
    },
  });

  const onSubmit = (data: UpsertProductSchema) => {
    executeUpsert({ ...data, id: defaultValues?.id });
  };

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar" : "Adicionar"} Produto
            </DialogTitle>
            <DialogDescription>
              Preencha os detalhes do produto para adicioná-lo ao estoque.
            </DialogDescription>
          </DialogHeader>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <NumericFormat
                    placeholder="Digite o preço do produto"
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix="R$ "
                    allowNegative={false}
                    customInput={Input}
                    onValueChange={(values) => {
                      field.onChange(values.floatValue);
                    }}
                    {...field}
                    onChange={() => {}}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Estoque</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o estoque do produto"
                    type="number"
                    {...field}
                    onChange={(e) => onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="flex justify-center gap-3">
            <DialogClose asChild>
              <Button variant="secondary" type="reset">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="gap-1.5"
            >
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" size={18} />
              )}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertProductDialogContent;
