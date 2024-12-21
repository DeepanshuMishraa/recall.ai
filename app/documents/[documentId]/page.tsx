"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import ChatPanel from "./chat-panel";
import { use } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DocumentPage({
  params,
}: {
  params: Promise<{
    documentId: Id<"documents">;
  }>;
}) {
  const unwrappedParams = use(params);
  const document = useQuery(api.documents.getDocument, {
    documentId: unwrappedParams.documentId,
  });



  if (!document) {
    return <div>You don't have access to view this document</div>;
  }

  return (
    <main className="p-24 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{document.title}</h1>
      </div>

      <Tabs defaultValue="document" className="w-full">
        <TabsList className="mb-2">
          <TabsTrigger value="document">Document</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="document">
          <div className="flex gap-12">
            <div className="bg-gray-900 p-4 rounded-xl flex-1 h-[400px]">
              {document.documentUrl && (
                <iframe className="w-full h-full" src={document.documentUrl} />
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="chat">
          <ChatPanel documentId={document._id} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
