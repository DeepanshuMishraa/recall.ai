"use client";

import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

interface DocumentPageProps {
  params: Promise<{
    documentId: Id<"documents">;
  }>;
}

const DocumentPage = ({ params }: DocumentPageProps) => {
  const unwrappedParams = React.use(params);
  const document = useQuery(api.documents.getDocument, {
    documentId: unwrappedParams.documentId,
  });
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  if (document === undefined) {
    return <DocumentSkeleton />;
  }

  if (document === null) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-muted-foreground text-2xl">
          Document not found
        </span>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }]);
      // TODO: Implement actual LLM chat functionality
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "This is a placeholder response. Implement actual LLM chat here.",
        },
      ]);
      setInput("");
    }
  };

  return (
    <div className="flex h-full">
      {/* Document View */}
      <div className="flex flex-col w-2/3 h-full border-r">
        <div className="flex items-center px-4 py-3 border-b">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
            {document.title}
          </h1>
        </div>
        <div className="flex-1 overflow-hidden">
          {document.documentUrl ? (
            <iframe
              src={document.documentUrl}
              className="w-full h-full border-none"
              title={document.title}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-muted-foreground">
                No preview available
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Chat View */}
      <div className="flex flex-col w-1/3 h-full bg-muted/30">
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted"
                } max-w-[80%]`}
              >
                {message.content}
              </div>
            ))}
          </ScrollArea>
        </div>
        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex space-x-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this document..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const DocumentSkeleton = () => {
  return (
    <div className="flex h-full">
      <div className="flex flex-col w-2/3 h-full border-r">
        <div className="flex items-center px-4 py-3 border-b">
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="flex-1 overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
      <div className="w-1/3 h-full bg-muted/30">
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
};

export default DocumentPage;
