"use client";

import { NotesCard } from "@/components/notes-card";
import { CreateNoteButton } from "./create-notes-button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

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

        {(!notes || notes.length === 0) && (
          <div className="text-center py-12">
            <p>No notes yet. Create your first note!</p>
          </div>
        )}
      </div>
    </div>
  );
}
