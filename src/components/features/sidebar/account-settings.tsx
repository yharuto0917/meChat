"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import { Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export function AccountSettings() {
  const { isOpen } = useSidebarStore();

  return (
    <div className="mt-auto border-t border-zinc-200 px-2 py-4">
      <div className="flex flex-col gap-1">
        <button className="flex w-full items-center gap-3 rounded-full px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100">
          <Cog6ToothIcon className="h-5 w-5 shrink-0" />
          {isOpen && <span>Settings</span>}
        </button>
        <button className="flex w-full items-center gap-3 rounded-full px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100">
          <UserCircleIcon className="h-5 w-5 shrink-0" />
          {isOpen && <span>Profile</span>}
        </button>
      </div>
    </div>
  );
}
