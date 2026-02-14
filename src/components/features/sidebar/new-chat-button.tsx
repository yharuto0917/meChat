"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import { PlusIcon } from "@heroicons/react/24/outline";

export function NewChatButton() {
  const { isOpen } = useSidebarStore();

  return (
    <div className="px-2 py-2">
      <button className="flex w-full items-center gap-3 rounded-full bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-700">
        <PlusIcon className="h-5 w-5 shrink-0" />
        {isOpen && <span>New Chat</span>}
      </button>
    </div>
  );
}
