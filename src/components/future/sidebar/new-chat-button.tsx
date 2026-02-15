"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewChatButtonProps } from "./types";

export function NewChatButton({ isOpen }: NewChatButtonProps) {
  return (
    <div className={`py-2 flex ${isOpen ? "" : "justify-center"}`}>
      <Button 
        className={`bg-zinc-900 text-white hover:bg-zinc-700 transition-all duration-300 ${
          isOpen ? "w-full rounded-full px-4 justify-start" : "rounded-full p-0 h-10 w-10 justify-center"
        }`}
      >
        <Plus className={`h-5 w-5 shrink-0 ${isOpen ? "mr-2" : ""}`} />
        {isOpen && <span>New Chat</span>}
      </Button>
    </div>
  );
}
