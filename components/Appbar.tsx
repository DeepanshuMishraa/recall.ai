"use client";

import { Montserrat, Rubik } from "next/font/google";
import Link from "next/link";
import { ModeToggle } from "./toggle";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const mons = Montserrat({
  subsets: ["latin"],
});
export const AppBar = () => {
  const pathName = usePathname();
  return (
    <nav
      className={`flex justify-between items-center p-4 border-b ${mons.className}`}
    >
      <div>
        <Link
          href="/"
          className={`${mons.className} font-semibold md:text-xl text-pretty `}
        >
          Recall.ai
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {!pathName.startsWith("/dashboard") && (
          <Link href="/dashboard" className="font-bold">
            Dashboard
          </Link>
        )}
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
