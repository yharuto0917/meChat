"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function SidebarLogo() {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <div className={`flex items-center px-4 py-4 ${isOpen ? "justify-between" : "justify-center"}`}>
      {isOpen && (
        <span className="font-cavest text-2xl font-bold text-zinc-900">
          MeChat
        </span>
      )}
      <button
        onClick={toggle}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200"
      >
        {isOpen ? (
          <XMarkIcon className="h-5 w-5" />
        ) : (
          <Bars3Icon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
