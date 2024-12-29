"use client";

import { NotesCard } from "@/components/notes-card";
import { CreateNoteButton } from "./create-notes-button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Notes() {
  const notes = useQuery(api.notes.getNotes);

  return (
    <div className="min-h-screen  px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold ">Notes</h1>
          <CreateNoteButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {notes?.map((note) => <NotesCard key={note._id} notes={note} />)}
        </div>

        {( notes?.length === 0) && (
          <div className="grid grid-cols-4 gap-8 mt-6">
            {new Array(8).fill("").map((_, i) => (
              <Card
                key={i}
                className="h-[200px] p-6 flex flex-col justify-between"
              >
                <Skeleton className="h-[20px] w-full rounded-lg" />
                <Skeleton className="h-[20px] w-full rounded-lg" />
                <Skeleton className="h-[20px] w-full rounded-lg" />
                <Skeleton className="w-[80px] h-[40px] rounded-lg" />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
