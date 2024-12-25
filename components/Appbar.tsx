"use client";

import { Montserrat, Rubik } from "next/font/google";
import Link from "next/link";
import { ModeToggle } from "./toggle";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";

const mons = Montserrat({
  subsets: ["latin"],
});
export const AppBar = () => {
  return (
    <nav
      className={`flex justify-between items-center p-4 border-b ${mons.className}`}
    >
      <div>
        <Link href="/" className={`${mons.className} font-semibold md:text-xl text-pretty `}>
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
