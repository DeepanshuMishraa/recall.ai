"use client";

import { CreateDocumentButton } from "@/components/create-document-button";
import { DocumentCard } from "@/components/document-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);
  return (
    <main className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font:-bold">My Documents</h1>
        <CreateDocumentButton />
      </div>
      {documents === undefined && (
        <div className="grid grid-cols-4 gap-8 mt-6">
          {new Array(8).fill("").map((_, i) => (
            <Card
              key={i}
              className="h-[200px] p-6 flex flex-col justify-between"
            >
              <Skeleton className="h-[20px] rounded-lg" />
              <Skeleton className="h-[20px] rounded-lg" />
              <Skeleton className="h-[20px] rounded-lg" />
              <Skeleton className="w-[80px] h-[40px] rounded-lg" />
            </Card>
          ))}
        </div>
      )}

      {documents && documents.length === 0 && (
        <div className="flex items-center justify-center w-full h-[200px]">
          <h1>No Documents Found, you might wanna create one</h1>
        </div>
      )}
      {documents && documents.length > 0 && (
        <div className="grid grid-cols-4 gap-4 mt-20">
          {documents?.map((doc) => (
            <DocumentCard key={doc._id} document={doc} />
          ))}
        </div>
      )}
    </main>
  );
}
