"use client";

import { InputBar } from "./input-bar";

export function ChatContainer() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center pt-20 text-center">
            <h1 className="font-cavest text-5xl font-bold text-zinc-900">
              meChat
            </h1>
            <p className="mt-4 text-zinc-500">
              How can I help you today?
            </p>
          </div>
        </div>
      </div>
      
      <div className="sticky bottom-0 w-full bg-gradient-to-t from-[#f4f4f5] via-[#f4f4f5]/80 to-transparent pt-4">
        <InputBar />
      </div>
    </div>
  );
}
