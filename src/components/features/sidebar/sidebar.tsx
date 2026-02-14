"use client";

import { useState } from "react";
import { SidebarLogo } from "./sidebar-logo";
import { NewChatButton } from "./new-chat-button";
import { ChatHistory } from "./chat-history";
import { AccountSettings } from "./account-settings";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <aside
      className={`relative z-50 flex flex-col transition-all duration-300 ease-in-out rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xl bg-white/70 h-[calc(100dvh-2rem)] ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <SidebarLogo isOpen={isOpen} onToggle={toggle} />
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-2">
        <NewChatButton isOpen={isOpen} />
        {isOpen && <ChatHistory isOpen={isOpen} />}
      </div>

      <AccountSettings isOpen={isOpen} />
    </aside>
  );
}
