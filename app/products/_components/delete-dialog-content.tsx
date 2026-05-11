import { deleteProduct } from "@/actions/product/delete-product";
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
  const handleContinueClick = async () => {
    try {
      await deleteProduct({ id: productId });
      toast.success("Produto deletado", "O produto foi removido com sucesso.");
    } catch (error) {
      console.error("Error ao deletar produto:", error);
      toast.error(
        "Erro ao deletar",
        "Ocorreu um erro ao tentar deletar o produto.",
      );
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
