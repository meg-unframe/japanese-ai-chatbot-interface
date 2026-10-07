import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="message-in flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 shadow-sm">
        <Bot className="h-4.5 w-4.5 text-white" strokeWidth={2.2} />
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md bg-white px-4 py-3.5 shadow-sm ring-1 ring-slate-100">
        <span
          className="typing-dot h-2 w-2 rounded-full bg-slate-400"
          style={{ animationDelay: "0s" }}
        />
        <span
          className="typing-dot h-2 w-2 rounded-full bg-slate-400"
          style={{ animationDelay: "0.2s" }}
        />
        <span
          className="typing-dot h-2 w-2 rounded-full bg-slate-400"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
    </div>
  );
}
