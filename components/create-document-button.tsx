import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { UploadDocumentForm } from "./UploadDocumentForm";

export const CreateDocumentButton = () => {
  const createDocument = useMutation(api.documents.createDocument);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => createDocument({ title: "New Document" })}>
          Create Document
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
            <DialogTitle>Upload a Document</DialogTitle>
            <DialogDescription>
                Upload a team document for you to search and recall later.
            </DialogDescription>
        </DialogHeader>
        <UploadDocumentForm/>
      </DialogContent>
    </Dialog>
  );
};
