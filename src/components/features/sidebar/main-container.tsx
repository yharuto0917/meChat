"use client";

import { useSidebarStore } from "@/store/sidebar-store";

export function MainContainer({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebarStore();

  return (
    <main
      className={`min-h-dvh transition-all duration-300 ease-in-out ${
        isOpen ? "pl-64" : "pl-20"
      }`}
    >
      {children}
    </main>
  );
}
