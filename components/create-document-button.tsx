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
import { useState } from "react";

export const CreateDocumentButton = () => {
    const [open,setIsOpen] = useState(false);
  return (
    <Dialog onOpenChange={setIsOpen} open={open}>
      <DialogTrigger asChild>
        <Button>
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
        <UploadDocumentForm onUpload={()=>setIsOpen(false)}/>
      </DialogContent>
    </Dialog>
  );
};
