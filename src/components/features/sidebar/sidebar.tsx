"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import { SidebarLogo } from "./sidebar-logo";
import { NewChatButton } from "./new-chat-button";
import { ChatHistory } from "./chat-history";
import { AccountSettings } from "./account-settings";

export function Sidebar() {
  const { isOpen } = useSidebarStore();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-zinc-50 transition-all duration-300 ease-in-out border-r border-zinc-200 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <SidebarLogo />
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <NewChatButton />
        <ChatHistory />
      </div>

      <AccountSettings />
    </aside>
  );
}
