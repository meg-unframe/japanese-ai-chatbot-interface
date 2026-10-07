import { useState } from "react";
import { Bot, User, Copy, Check } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API が利用不可の場合は何もしない
    }
  };

  return (
    <div
      className={`message-in flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* アバター */}
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm ${
          isUser
            ? "bg-gradient-to-br from-sky-500 to-blue-600"
            : "bg-gradient-to-br from-teal-500 to-emerald-600"
        }`}
      >
        {isUser ? (
          <User className="h-4.5 w-4.5 text-white" strokeWidth={2.2} />
        ) : (
          <Bot className="h-4.5 w-4.5 text-white" strokeWidth={2.2} />
        )}
      </div>

      {/* メッセージバブル */}
      <div
        className={`flex max-w-[78%] flex-col gap-1 sm:max-w-[70%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
            isUser
              ? "rounded-tr-md bg-gradient-to-br from-sky-500 to-blue-600 text-white"
              : "rounded-tl-md bg-white text-slate-700 ring-1 ring-slate-100"
          }`}
        >
          {message.content}
        </div>

        <div
          className={`flex items-center gap-2 px-1 ${
            isUser ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <span className="text-[11px] text-slate-400">
            {formatTime(message.createdAt)}
          </span>
          {!isUser && (
            <button
              onClick={handleCopy}
              aria-label="コピー"
              className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" strokeWidth={2.2} />
                  コピー済み
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" strokeWidth={2.2} />
                  コピー
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
