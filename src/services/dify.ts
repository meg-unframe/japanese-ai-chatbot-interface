import type { ChatMessage } from "@/types/chat";

/**
 * Dify API 連携サービス
 *
 * このファイルは後から Cursor 等で Dify API と接続する際のエントリポイントです。
 * 現在はモック実装（ダミー応答）となっており、APIキーとエンドポイントを
 * 設定すれば実際の Dify API に切り替えられる構成になっています。
 *
 * 実装時の手順:
 * 1. .env に VITE_DIFY_API_URL と VITE_DIFY_API_KEY を追加
 * 2. sendMessage() 内のモック処理を実際の fetch リクエストに置き換え
 * 3. DifyのチャットAPI（POST /v1/chat-messages）を呼び出す
 */

const DIFY_API_URL = import.meta.env.VITE_DIFY_API_URL ?? "";
const DIFY_API_KEY = import.meta.env.VITE_DIFY_API_KEY ?? "";

export interface SendOptions {
  conversationId?: string;
}

export interface SendResult {
  answer: string;
  conversationId: string;
}

/**
 * Dify API にメッセージを送信し、回答を取得する。
 *
 * 現在はモック実装: 入力をオウム返けするダミー応答を返す。
 * API連携時はこの関数の中身を実際の fetch リクエストに置き換える。
 */
export async function sendMessage(
  message: string,
  _options?: SendOptions
): Promise<SendResult> {
  // --- モック実装（後でDify API呼び出しに置き換え） ---
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockAnswer = `「${message}」についてですね。これはモック応答です。Dify APIとの連携を設定すると、実際のAI回答がここに表示されます。`;

  return {
    answer: mockAnswer,
    conversationId: _options?.conversationId ?? "",
  };
  // --- モック実装 ここまで ---

  // --- Dify API連携の実装例（Cursorで置き換え） ---
  // const response = await fetch(`${DIFY_API_URL}/v1/chat-messages`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${DIFY_API_KEY}`,
  //   },
  //   body: JSON.stringify({
  //     inputs: {},
  //     query: message,
  //     response_mode: "blocking",
  //     conversation_id: _options?.conversationId ?? "",
  //     user: "user-001",
  //   }),
  // });
  //
  // if (!response.ok) {
  //   throw new Error(`Dify API error: ${response.status}`);
  // }
  //
  // const data = await response.json();
  // return {
  //   answer: data.answer,
  //   conversationId: data.conversation_id,
  // };
  // --- ここまで ---
}

/**
 * ユーティリティ: ChatMessage配列から会話IDを取得（将来的にDifyのconversation_id管理用）
 */
export function getLastConversationId(_messages: ChatMessage[]): string | undefined {
  return undefined;
}
