'use client'

import * as React from "react";
import { FileText, Notebook, Settings, PanelLeft, ChevronLeft, ChevronRight, SearchIcon } from "lucide-react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "./toggle";

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="flex h-screen">
      <aside
        className={`h-screen transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="flex items-center p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
            <FileText className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <span className="ml-3 text-lg font-semibold ">Recall.ai</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex px-4 py-4">
          <div className="space-y-4">
            <Link
            prefetch
              href="/dashboard/search"
              className="flex items-center gap-3  transition-colors"
            >
              <SearchIcon className="h-5 w-5" />
              {!isCollapsed && <span>Search</span>}
            </Link>
            <Link
            prefetch
              href="/dashboard/documents"
              className="flex items-center gap-3  transition-colors"
            >
              <FileText className="h-5 w-5" />
              {!isCollapsed && <span>Documents</span>}
            </Link>
            <Link
            prefetch
              href="/dashboard/notes"
              className="flex items-center gap-3  transition-colors"
            >
              <Notebook className="h-5 w-5" />
              {!isCollapsed && <span>Notes</span>}
            </Link>

            <Link
            prefetch
              href="/dashboard/settings"
              className="flex items-center gap-3  transition-colors"
            >
              <Settings className="h-5 w-5" />
              {!isCollapsed && <span>Settings</span>}
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-auto px-4 py-4 border-t ">
          <div
            className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}
          >
            <div className="flex items-center gap-2">
              <Unauthenticated>
                <SignInButton />
              </Unauthenticated>
              <Authenticated>
                <UserButton />
              </Authenticated>
              <AuthLoading>
                <div className="w-8 h-8 rounded-full  animate-pulse" />
              </AuthLoading>
            </div>
            {!isCollapsed && <ModeToggle />}
          </div>
        </div>
      </aside>

      {/* Collapse/Expand Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="h-10 -ml-3 mt-4 flex items-center justify-center  rounded-r"
      >
        {isCollapsed ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
