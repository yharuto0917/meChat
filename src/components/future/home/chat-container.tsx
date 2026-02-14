"use client";

import { InputBar } from "./input-bar";

export function ChatContainer() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-4">
        <div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center text-center">
          <div className="mb-20">
            <h1 className="font-cavest text-7xl font-bold text-zinc-900">
              meChat
            </h1>
            <p className="mt-6 text-xl text-zinc-500">
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
