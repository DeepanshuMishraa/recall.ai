import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";

export function DeleteButton() {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="bg-zinc-950 px-4 py-2 text-sm text-white hover:bg-zinc-900 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
      >
        <Button variant="destructive">
          <TrashIcon />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md bg-white p-6  dark:bg-zinc-900">
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-zinc-900 dark:text-white">
            Delete the document
          </DialogTitle>
          <DialogDescription className="text-zinc-600  dark:text-zinc-400">
            Are you sure you want to delete this document? This action cannot be
            undone.
          </DialogDescription>

          <div className="flex items-center gap-2">
            <Button variant="destructive">Continue</Button>
            <Button variant="secondary">Cancel</Button>
          </div>
        </DialogHeader>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
