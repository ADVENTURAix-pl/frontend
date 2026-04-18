"use client";

import React, { useState, useRef, useEffect } from "react";
import { Icon, StarMark } from "./shared";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Cześć! Jestem asystentem ADVENTURAix. Pomogę ci zaplanować idealną podróż. Dokąd chcesz pojechać?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) throw new Error("API error");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content: accumulated };
            return updated;
          });
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Przepraszam, wystąpił błąd. Spróbuj ponownie." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 200,
          width: 56,
          height: 56,
          borderRadius: 999,
          background: open ? "var(--adx-sage-deep)" : "var(--adx-sage)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(86,95,89,0.35)",
          transition: "all 220ms var(--ease-out)",
        }}
        aria-label="Open AI chat"
      >
        {open
          ? <Icon name="x" size={20} color="#F3F4F2" strokeWidth={2} />
          : <StarMark size={24} color="#F3F4F2" />
        }
      </button>

      {/* Chat panel */}
      {open && (
        <div style={{
          position: "fixed",
          bottom: 92,
          right: 24,
          zIndex: 200,
          width: 360,
          maxHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          background: "var(--adx-chalk)",
          borderRadius: 20,
          border: "1px solid var(--adx-sage-a12)",
          boxShadow: "0 8px 32px rgba(31,36,33,0.12), 0 2px 8px rgba(31,36,33,0.06)",
          overflow: "hidden",
          animation: "slideUp 220ms var(--ease-out)",
        }}>
          {/* Header */}
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--adx-sage-a12)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "var(--adx-paper-warm)",
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 999,
              background: "var(--adx-sage)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <StarMark size={16} color="#F3F4F2" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--fg)", letterSpacing: "-0.01em" }}>
                Asystent ADX
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-faint)" }}>
                powered by Claude
              </div>
            </div>
            <div style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: 999, background: "var(--adx-ok)" }} />
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                }}
              >
                <div style={{
                  padding: "10px 14px",
                  borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: m.role === "user" ? "var(--adx-sage)" : "var(--adx-paper-warm)",
                  color: m.role === "user" ? "var(--adx-paper)" : "var(--fg)",
                  fontSize: 14,
                  lineHeight: 1.5,
                  fontFamily: "var(--font-sans)",
                }}>
                  {m.content || (loading && i === messages.length - 1 ? "…" : "")}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role !== "assistant" && (
              <div style={{ alignSelf: "flex-start" }}>
                <div style={{
                  padding: "10px 14px", borderRadius: "16px 16px 16px 4px",
                  background: "var(--adx-paper-warm)", color: "var(--fg-faint)",
                  fontSize: 14, fontFamily: "var(--font-sans)",
                }}>…</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "12px 16px",
            borderTop: "1px solid var(--adx-sage-a12)",
            display: "flex",
            gap: 8,
            alignItems: "flex-end",
            background: "var(--adx-chalk)",
          }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Zapytaj o podróż…"
              rows={1}
              style={{
                flex: 1,
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                border: "1px solid var(--adx-sage-a24)",
                borderRadius: 12,
                padding: "10px 12px",
                outline: "none",
                resize: "none",
                background: "var(--adx-paper)",
                color: "var(--fg)",
                lineHeight: 1.4,
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              style={{
                width: 36, height: 36, borderRadius: 999,
                background: input.trim() && !loading ? "var(--adx-sage)" : "var(--adx-sage-a12)",
                border: "none", cursor: input.trim() && !loading ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 180ms var(--ease-out)",
                flexShrink: 0,
              }}
            >
              <Icon name="send" size={16} color={input.trim() && !loading ? "#F3F4F2" : "var(--fg-faint)"} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
