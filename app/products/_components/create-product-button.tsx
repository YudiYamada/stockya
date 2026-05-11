"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/button";
import { Dialog, DialogTrigger } from "@/components/dialog";

import UpsertProductDialogContent from "./upsert-dialog";

const CreateProductButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Produto
        </Button>
      </DialogTrigger>
      <UpsertProductDialogContent onSuccess={() => setDialogOpen(false)} />
    </Dialog>
  );
};

export default CreateProductButton;
