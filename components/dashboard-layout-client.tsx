import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

export function DashboardLayoutClient({
  children,
}: DashboardLayoutClientProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar className="w-64 max-w-md border-r" />
        <main className="flex overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
