import { db } from "@/db";
import { chatMessages } from "@/db/schema";
import { catalogContextForLlm, replyToChat } from "@/lib/chat-engine";

export const dynamic = "force-dynamic";

type Body = {
  message?: string;
  sessionId?: string;
  history?: { role: string; text: string }[];
};

async function tryYandex(message: string, history: { role: string; text: string }[]) {
  const apiKey = process.env.YANDEX_API_KEY || process.env.CHAT_API_KEY;
  const folderId = process.env.YANDEX_FOLDER_ID;
  if (!apiKey || !folderId) return null;

  const payload = {
    modelUri: `gpt://${folderId}/yandexgpt-lite/latest`,
    completionOptions: { stream: false, temperature: 0.35, maxTokens: "600" },
    messages: [
      { role: "system", text: catalogContextForLlm() },
      ...history.slice(-6).map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        text: m.text,
      })),
      { role: "user", text: message },
    ],
  };

  const res = await fetch("https://llm.api.cloud.yandex.net/foundationModels/v1/completion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${apiKey}`,
      "x-folder-id": folderId,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    result?: { alternatives?: { message?: { text?: string } }[] };
  };
  return data.result?.alternatives?.[0]?.message?.text ?? null;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Body;
  const message = (body.message || "").trim();
  const sessionId = body.sessionId || "anon";
  if (!message) {
    return Response.json({ text: "Please ask me about a sweet, price or gift box." });
  }

  const local = replyToChat(message);
  let text = local.text;
  try {
    const llm = await tryYandex(message, body.history || []);
    if (llm) text = llm;
  } catch {
    /* keep local reply */
  }

  try {
    await db.insert(chatMessages).values([
      { sessionId, role: "user", content: message },
      { sessionId, role: "assistant", content: text },
    ]);
  } catch {
    /* logging is optional */
  }

  return Response.json({ text, products: local.products ?? [] });
}
