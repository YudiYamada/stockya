import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mt-8 flex min-h-screen flex-col items-center justify-center gap-4 rounded-md p-8 text-center">
      <h2 className="text-2xl font-bold">Página não encontrada</h2>
      <p className="text-muted-foreground">
        Não conseguimos encontrar o recurso solicitado.
      </p>
      <Link
        href="/"
        className="bg-primary text-background hover:bg-primary/90 mt-4 rounded-md px-4 py-2"
      >
        Voltar para o Início
      </Link>
    </main>
  );
}
