"use client";

import { Rubik } from "next/font/google";
import Link from "next/link";
import { ModeToggle } from "./toggle";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";

const rubik = Rubik({
  subsets: ["latin"],
});

export const AppBar = () => {
  return (
    <nav
      className={`flex justify-between items-center p-4 border-b ${rubik.className}`}
    >
      <div>
        <Link href="/" className={`${rubik.className} md:text-xl text-pretty `}>
          Recall.ai
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <Unauthenticated>
          <SignInButton />
        </Unauthenticated>
        <Authenticated>
          <UserButton />
        </Authenticated>
        <AuthLoading>
          <div>Loading...</div>
        </AuthLoading>
      </div>
    </nav>
  );
};
