import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request: Request) {
  const { messages } = await request.json();

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system:
      "Jesteś asystentem podróży ADVENTURAix — polskiej platformy premium do planowania podróży. " +
      "Pomagasz użytkownikom planować boutique podróże na Bałkany, do Maroka, Jordanii i Gruzji. " +
      "Odpowiadaj głównie po polsku, możesz dodać angielskie akcenty. " +
      "Bądź concise, ciepły i ekspercki. Styl: minimalistyczny, premium, uważny.",
    messages: messages.map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
