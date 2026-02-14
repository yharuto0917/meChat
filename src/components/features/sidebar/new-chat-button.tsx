"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewChatButtonProps {
  isOpen: boolean;
}

export function NewChatButton({ isOpen }: NewChatButtonProps) {
  return (
    <div className="py-2">
      <Button 
        className={`w-full bg-zinc-900 text-white hover:bg-zinc-700 transition-all duration-300 ${
          isOpen ? "rounded-full px-4 justify-start" : "rounded-full p-0 h-12 w-12 mx-auto justify-center"
        }`}
      >
        <Plus className={`h-5 w-5 shrink-0 ${isOpen ? "mr-2" : ""}`} />
        {isOpen && <span>New Chat</span>}
      </Button>
    </div>
  );
}
