import { useRef, useState, type KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

const MAX_HEIGHT = 120;

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
  };

  return (
    <div className="shrink-0 border-t border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-3xl px-4 py-3 sm:px-6">
        <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 transition-colors focus-within:border-teal-400 focus-within:bg-white">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="メッセージを入力してください..."
            disabled={disabled}
            className="max-h-[120px] flex-1 resize-none bg-transparent py-1.5 text-sm leading-relaxed text-slate-700 placeholder:text-slate-400 focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={disabled || !text.trim()}
            aria-label="送信"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-sm transition-all hover:shadow-md hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100"
          >
            <Send className="h-4 w-4" strokeWidth={2.2} />
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-slate-400">
          Enter で送信 / Shift + Enter で改行
        </p>
      </div>
    </div>
  );
}
