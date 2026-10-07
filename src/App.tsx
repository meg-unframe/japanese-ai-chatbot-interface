import { useRef, useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";
import EmptyState from "@/components/EmptyState";
import SuggestionChips from "@/components/SuggestionChips";
import { sendMessage } from "@/services/dify";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

const STORAGE_KEY = "japanese-ai-chatbot:messages";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadMessages(): ChatMessageType[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (m): m is ChatMessageType =>
        typeof m.id === "string" &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        typeof m.createdAt === "number"
    );
  } catch {
    return [];
  }
}

function App() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasLoadedRef = useRef(false);

  // 初回マウント時に localStorage から復元
  useEffect(() => {
    setMessages(loadMessages());
    hasLoadedRef.current = true;
  }, []);

  // messages が変化したら localStorage に保存（初回復元後のみ）
  useEffect(() => {
    if (hasLoadedRef.current) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {
        // 容量超過等のエラーは無視
      }
    }
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending, scrollToBottom]);

  const handleSend = useCallback(
    async (text: string) => {
      const userMessage: ChatMessageType = {
        id: generateId(),
        role: "user",
        content: text,
        createdAt: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsSending(true);

      try {
        const result = await sendMessage(text);

        const aiMessage: ChatMessageType = {
          id: generateId(),
          role: "assistant",
          content: result.answer,
          createdAt: Date.now(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch {
        const errorMessage: ChatMessageType = {
          id: generateId(),
          role: "assistant",
          content:
            "エラーが発生しました。しばらくしてからもう一度お試しください。",
          createdAt: Date.now(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsSending(false);
      }
    },
    []
  );

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-[100dvh] flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />

      {/* チャット表示エリア */}
      <main
        ref={scrollRef}
        className="chat-scroll flex-1 overflow-y-auto"
      >
        {hasMessages ? (
          <div className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-6 sm:px-6">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isSending && <TypingIndicator />}
          </div>
        ) : (
          <EmptyState onSuggestionClick={handleSend} />
        )}
      </main>

      {/* よく使う質問チップ（会話中は非表示、送信中も非表示） */}
      {!isSending && (
        <SuggestionChips onSuggestionClick={handleSend} disabled={isSending} />
      )}

      {/* メッセージ入力欄 */}
      <ChatInput onSend={handleSend} disabled={isSending} />
    </div>
  );
}

export default App;
