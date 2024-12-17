"use client";

import { api } from "@/convex/_generated/api";
import { UserButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { Unauthenticated, useMutation, useQuery } from "convex/react";
import { Authenticated } from "convex/react";

export default function Home() {
  const createDocument = useMutation(api.documents.createDocument);
  const documents = useQuery(api.documents.getDocuments);
  return (
    <main className="flex items-center justify-center h-screen flex-col">
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <div>Hello welcome you are authenticated</div>
        <button onClick={() => createDocument({ title: "Hello world" })}>
          Click Me
        </button>

        {documents?.map((doc) => <div key={doc._id}>{doc.title}</div>)}
      </Authenticated>
    </main>
  );
}
