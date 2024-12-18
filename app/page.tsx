"use client";

import { CreateDocumentButton } from "@/components/create-document-button";
import { DocumentCard } from "@/components/document-card";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {  useQuery } from "convex/react";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);
  return (
    <main className="p-16">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <CreateDocumentButton/>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-20">
        {documents?.map((doc) => <DocumentCard key={doc._id} document={doc} />)}
      </div>
    </main>
  );
}
