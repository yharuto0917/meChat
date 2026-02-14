"use client";

import { MessageSquare, ChevronDown } from "lucide-react";
import { useState } from "react";

interface ChatHistoryProps {
  isOpen: boolean;
}

export function ChatHistory({ isOpen }: ChatHistoryProps) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);

  const history = [
    { id: 1, title: "Next.js 15 features" },
    { id: 2, title: "Cloudflare Workers AI" },
    { id: 3, title: "Tailwind CSS v4" },
  ];

  if (!isOpen) return null;

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsHistoryOpen(!isHistoryOpen)}
        className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:bg-zinc-100/50 hover:text-zinc-900"
      >
        <span>Recent Chats</span>
        <ChevronDown
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
              className="flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100/50 hover:text-zinc-900"
            >
              <MessageSquare className="h-4 w-4 shrink-0 opacity-70" />
              <span className="truncate text-left">{chat.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
