"use client";

import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarLogoProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SidebarLogo({ isOpen, onToggle }: SidebarLogoProps) {
  return (
    <div className={`flex items-center px-4 py-4 ${isOpen ? "justify-between" : "justify-center"}`}>
      {isOpen && (
        <span className="font-cavest text-2xl font-bold text-zinc-900">
          meChat
        </span>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="h-10 w-10 rounded-full hover:bg-zinc-200/50"
      >
        <PanelLeft className="h-5 w-5 text-zinc-600" />
      </Button>
    </div>
  );
}
