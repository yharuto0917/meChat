"use client";

import { useSubmitJP } from "use-submit-jp";
import { Button } from "@/components/ui/button";
import { 
  PromptInput, 
  PromptInputTextarea, 
  PromptInputFooter, 
  PromptInputTools,
  usePromptInputAttachments
} from "@/components/ai-elements/prompt-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  ModelSelector, 
  ModelSelectorContent, 
  ModelSelectorGroup, 
  ModelSelectorInput, 
  ModelSelectorItem, 
  ModelSelectorList, 
  ModelSelectorTrigger,
  ModelSelectorLogo
} from "@/components/ai-elements/model-selector";
import { Send, Brain, Hammer, ChevronDown, Paperclip } from "lucide-react";
import { useState, useCallback } from "react";
import { ModelOption, ToolOption, ThinkingLevel } from "./types";

const models: ModelOption[] = [
  { id: "gemini-3-pro", name: "Gemini 3 Pro" },
  { id: "gemini-3-flash", name: "Gemini 3 Flash" },
  { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite" },
];

const thinkingLevels: { value: ThinkingLevel; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const tools: ToolOption[] = [
  { id: "search", name: "Search", enabled: true },
  { id: "code-interpreter", name: "Code Interpreter", enabled: false },
];

function AttachmentButton() {
  const { openFileDialog } = usePromptInputAttachments();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => openFileDialog()}
          className="h-9 w-9 rounded-full border border-zinc-200 hover:bg-zinc-100 shrink-0 shadow-none"
        >
          <Paperclip className="h-4 w-4 text-zinc-500" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Attach files</TooltipContent>
    </Tooltip>
  );
}

export function InputBar() {
  const [value, setValue] = useState("");
  const [selectedModel, setSelectedModel] = useState(models[0]);

  const { onKeyDown } = useSubmitJP({
    onSubmit: () => {
      if (!value.trim()) return;
      handleSend();
    },
    submitWithCommand: true, // Cmd+Enter for submission
  });

  const handleSend = useCallback(() => {
    if (!value.trim()) return;
    console.log("Submit:", value);
    setValue("");
  }, [value]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-8">
      <PromptInput
        onSubmit={(msg) => {
          console.log("AI Elements Submit:", msg);
        }}
        className="rounded-[2.5rem] border border-zinc-200 bg-white/50 transition-all focus-within:border-zinc-400 backdrop-blur-sm shadow-none"
      >
        <PromptInputTextarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDownCapture={onKeyDown}
          placeholder="Ask me anything..."
          className="min-h-[100px] w-full resize-none border-none bg-transparent p-6 text-base text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-0 shadow-none"
        />

        <PromptInputFooter className="px-6 pb-6">
          <PromptInputTools className="gap-2">
            <ModelSelector>
              <ModelSelectorTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 rounded-full border border-zinc-200 px-3 text-[11px] font-medium text-zinc-600 hover:bg-zinc-100 shadow-none">
                  <ModelSelectorLogo provider="google" className="mr-1.5 size-3.5" />
                  <span>{selectedModel.name}</span>
                  <ChevronDown className="ml-1 h-3 w-3 opacity-50" />
                </Button>
              </ModelSelectorTrigger>
              <ModelSelectorContent title="Select Model">
                <ModelSelectorInput placeholder="Search models..." />
                <ModelSelectorList>
                  <ModelSelectorGroup heading="Google">
                    {models.map((m) => (
                      <ModelSelectorItem 
                        key={m.id} 
                        onSelect={() => setSelectedModel(m)}
                        className="flex items-center gap-2"
                      >
                        <ModelSelectorLogo provider="google" />
                        <span>{m.name}</span>
                      </ModelSelectorItem>
                    ))}
                  </ModelSelectorGroup>
                </ModelSelectorList>
              </ModelSelectorContent>
            </ModelSelector>

            <Select defaultValue="medium">
              <SelectTrigger className="h-9 w-fit rounded-full border border-zinc-200 bg-transparent px-3 text-[11px] font-medium text-zinc-600 hover:bg-zinc-100 shrink-0 shadow-none">
                <Brain className="mr-1.5 h-3.5 w-3.5 text-zinc-400" />
                <SelectValue placeholder="Thinking" />
              </SelectTrigger>
              <SelectContent>
                {thinkingLevels.map((l) => (
                  <SelectItem key={l.value} value={l.value}>
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select defaultValue="search">
              <SelectTrigger className="h-9 w-fit rounded-full border border-zinc-200 bg-transparent px-3 text-[11px] font-medium text-zinc-600 hover:bg-zinc-100 shrink-0 shadow-none">
                <Hammer className="mr-1.5 h-3.5 w-3.5 text-zinc-400" />
                <SelectValue placeholder="Tools" />
              </SelectTrigger>
              <SelectContent>
                {tools.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <AttachmentButton />
          </PromptInputTools>

          <Button
            type="button"
            onClick={handleSend}
            disabled={!value.trim()}
            className="h-10 w-10 rounded-full bg-zinc-900 p-0 text-white hover:bg-zinc-700 disabled:bg-zinc-100 disabled:text-zinc-300 transition-all shrink-0 shadow-none"
          >
            <Send className="h-5 w-5" />
          </Button>
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}
