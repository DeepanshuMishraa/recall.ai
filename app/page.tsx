'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function page() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Link href="/dashboard" prefetch>
        <Button>Dashboard</Button>
      </Link>
    </div>
  );
}
