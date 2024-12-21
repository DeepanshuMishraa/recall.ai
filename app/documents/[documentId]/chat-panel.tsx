"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAction } from "convex/react";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const askQuestion = useAction(api.documents.askQuestion);

  return (
    <div className="w-full h-[500px] bg-gray-900 flex flex-col rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-slate-800 rounded-lg p-4 text-white">
          Ask anything about the document to the AI
        </div>
        {/* Add more message components here as needed */}
      </div>
      <form
        className="p-4 bg-gray-800"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const text = formData.get("text") as string;
          await askQuestion({ question: text, documentId }).then(console.log);
          form.reset();
        }}
      >
        <div className="flex space-x-2">
          <Input
            required
            name="text"
            placeholder="Type your question here..."
            className="flex-1"
          />
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
