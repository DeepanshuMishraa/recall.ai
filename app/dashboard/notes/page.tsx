import { CreateNoteButton } from "./create-notes-button";

export default function Notes() {
  return (
    <div className="flex w-full p-8 justify-between items-center h-full">
      <div>
        <h1 className="font-bold text-2xl">Notes</h1>
      </div>
      <CreateNoteButton />
    </div>
  );
}
