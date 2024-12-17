'use client'

import { UserButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { Unauthenticated } from "convex/react";
import { Authenticated } from "convex/react";

export default function Home() {
  return (
    <main>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <div>Hello welcome you are authenticated</div>
      </Authenticated>
    </main>
  );
}
