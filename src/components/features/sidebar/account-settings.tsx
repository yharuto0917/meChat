"use client";

import { Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AccountSettingsProps {
  isOpen: boolean;
}

export function AccountSettings({ isOpen }: AccountSettingsProps) {
  return (
    <div className="mt-auto border-t border-zinc-200/50 px-2 py-4">
      <div className={`flex flex-col gap-1 ${isOpen ? "" : "items-center"}`}>
        <Button
          variant="ghost"
          className={`text-zinc-600 hover:bg-zinc-100/50 hover:text-zinc-900 ${
            isOpen ? "w-full justify-start px-4 rounded-full" : "justify-center p-0 h-10 w-10 rounded-full"
          }`}
        >
          <Settings className="h-5 w-5 shrink-0" />
          {isOpen && <span className="ml-3 text-sm">Settings</span>}
        </Button>
        <Button
          variant="ghost"
          className={`text-zinc-600 hover:bg-zinc-100/50 hover:text-zinc-900 ${
            isOpen ? "w-full justify-start px-4 rounded-full" : "justify-center p-0 h-10 w-10 rounded-full"
          }`}
        >
          <User className="h-5 w-5 shrink-0" />
          {isOpen && <span className="ml-3 text-sm">Profile</span>}
        </Button>
      </div>
    </div>
  );
}
