import { Bot } from "lucide-react";

export default function Header() {
  return (
    <header className="shrink-0 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3.5 sm:px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-sm">
          <Bot className="h-5 w-5 text-white" strokeWidth={2.2} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold leading-tight text-slate-800">
            AIチャットボット
          </h1>
          <p className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            オンライン
          </p>
        </div>
      </div>
    </header>
  );
}
