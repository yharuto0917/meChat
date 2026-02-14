"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import { ChatBubbleLeftRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function ChatHistory() {
  const { isOpen } = useSidebarStore();
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);

  // Mock history data
  const history = [
    { id: 1, title: "Next.js 15 features" },
    { id: 2, title: "Cloudflare Workers AI" },
    { id: 3, title: "Tailwind CSS v4" },
    { id: 4, title: "Drizzle ORM with SQLite" },
    { id: 5, title: "Firebase Auth Setup" },
  ];

  if (!isOpen) {
    return (
      <div className="mt-8 flex flex-col items-center gap-6">
        {history.slice(0, 3).map((chat) => (
          <button
            key={chat.id}
            className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
            title={chat.title}
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6 px-3">
      <button
        onClick={() => setIsHistoryOpen(!isHistoryOpen)}
        className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
      >
        <span>Recent Chats</span>
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-200 ${
            isHistoryOpen ? "" : "-rotate-90"
          }`}
        />
      </button>

      {isHistoryOpen && (
        <div className="mt-2 space-y-1">
          {history.map((chat) => (
            <button
              key={chat.id}
              className="flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            >
              <ChatBubbleLeftRightIcon className="h-4 w-4 shrink-0 opacity-70" />
              <span className="truncate text-left">{chat.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
