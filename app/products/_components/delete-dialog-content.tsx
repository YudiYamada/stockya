import { deleteProduct } from "@/actions/product/delete-product";
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/alert-dialog";
import { toast } from "@/lib/toast-store";

interface DeleteProductDialogContentProps {
  productId: string;
}

const DeleteDialogContent = ({
  productId,
}: DeleteProductDialogContentProps) => {
  const { execute: executeDeleteProduct } = useAction(deleteProduct, {
    onError: ({ error: { validationErrors } }) => {
      const flat = flattenValidationErrors(validationErrors);
      if (flat.formErrors?.length) {
        toast.error(flat.formErrors[0]);
      } else {
        toast.error(
          "Erro ao deletar",
          "Ocorreu um erro ao tentar deletar o produto.",
        );
      }
    },
    onSuccess: () => {
      toast.success("Produto deletado", "O produto foi removido com sucesso.");
    },
  });

  const handleContinueClick = async () => {
    try {
      await executeDeleteProduct({ id: productId });
    } catch (error) {
      console.error("Error ao deletar produto:", error);
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirmar exclusão?</AlertDialogTitle>
        <AlertDialogDescription>
          Essa ação removerá o item permanentemente do sistema.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>Voltar</AlertDialogCancel>
        <AlertDialogAction variant="destructive" onClick={handleContinueClick}>
          Confirmar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteDialogContent;
