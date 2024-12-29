"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateNoteForm } from "./upload-notes-form";

export const CreateNoteButton = () => {
  const [open, setIsOpen] = useState(false);
  return (
    <Dialog onOpenChange={setIsOpen} open={open}>
      <DialogTrigger asChild>
        <Button>Create Note</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Note</DialogTitle>
          <DialogDescription>
            Create a Note for you to search and recall later.
          </DialogDescription>
        </DialogHeader>
        <CreateNoteForm onUpload={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
