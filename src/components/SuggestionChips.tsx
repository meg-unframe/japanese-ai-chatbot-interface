import { MessageCircle } from "lucide-react";

const SUGGESTIONS = [
  "AIについて教えてください",
  "今日の天気は？",
  "おすすめの本を教えてください",
  "プログラミングの学習法は？",
  "日本の観光名所を教えてください",
  "健康な食事のポイントは？",
];

interface SuggestionChipsProps {
  onSuggestionClick: (text: string) => void;
  disabled?: boolean;
}

export default function SuggestionChips({
  onSuggestionClick,
  disabled = false,
}: SuggestionChipsProps) {
  return (
    <div className="shrink-0 border-t border-slate-200 bg-white/80 px-4 py-2.5 backdrop-blur-md sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
          <MessageCircle className="h-3 w-3" strokeWidth={2.2} />
          よく使う質問
        </div>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((text) => (
            <button
              key={text}
              onClick={() => onSuggestionClick(text)}
              disabled={disabled}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 transition-all hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
