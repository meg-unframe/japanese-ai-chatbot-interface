import { MessageCircle } from "lucide-react";

const SUGGESTIONS = [
  "AIについて教えてください",
  "今日の天気は？",
  "おすすめの本を教えてください",
];

interface EmptyStateProps {
  onSuggestionClick: (text: string) => void;
}

export default function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg shadow-emerald-500/20">
        <MessageCircle className="h-8 w-8 text-white" strokeWidth={2} />
      </div>
      <h2 className="mb-2 text-xl font-bold text-slate-700">
        AIチャットボットへようこそ
      </h2>
      <p className="mb-8 max-w-sm text-sm leading-relaxed text-slate-400">
        何でもお気軽に質問してください。以下の例をタップして始めることもできます。
      </p>
      <div className="flex w-full max-w-md flex-col gap-2.5">
        {SUGGESTIONS.map((text) => (
          <button
            key={text}
            onClick={() => onSuggestionClick(text)}
            className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-600 transition-all hover:border-teal-300 hover:bg-teal-50/50 hover:text-teal-700 active:scale-[0.99]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 transition-colors group-hover:bg-teal-500" />
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
