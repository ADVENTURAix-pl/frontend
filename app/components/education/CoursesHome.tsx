"use client";

import React from "react";
import { Card, Badge, Eyebrow } from "../shared";

export type Course = {
  id: string;
  title: string;
  sub: string;
  author: string;
  tag: string;
  len: string;
  price: string;
  img: string;
  desc: string;
};

export const COURSES: Course[] = [
  {
    id: "c1", title: "Podróżuj zdrowo", sub: "Travel healthy", author: "Abdelrahman A.",
    tag: "Zdrowie · Health", len: "6 lekcji · 2h 10min", price: "249 zł",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80",
    desc: "Jak jeść, spać i regenerować się w drodze. Program oparty na badaniach MSc w żywieniu.",
  },
  {
    id: "c2", title: "Bliski Wschód od środka", sub: "Middle East from within", author: "Paradise Egypt",
    tag: "Kultura", len: "8 lekcji · 3h 40min", price: "349 zł",
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=900&q=80",
    desc: "Zanim zapakujesz walizkę — zrozum kontekst. Historia, kuchnia, protokół.",
  },
  {
    id: "c3", title: "Kurs fotografii podróżnej", sub: "Travel photography", author: "Yasser El-Deeb",
    tag: "Rzemiosło", len: "10 lekcji · 4h 20min", price: "299 zł",
    img: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=900&q=80",
    desc: "Światło, kompozycja, narracja. Od portretu ulicznego po krajobraz złotej godziny.",
  },
  {
    id: "c4", title: "AI dla podróżników", sub: "AI for travellers", author: "Zespół ADX",
    tag: "Technologia", len: "5 lekcji · 1h 50min", price: "199 zł",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
    desc: "Jak używać naszego silnika AI do układania własnych tras. Praktycznie.",
  },
];

const FILTERS = ["Wszystkie", "Zdrowie", "Kultura", "Rzemiosło", "Technologia", "Logistyka"];

export function CoursesHome({ onOpen }: { onOpen?: (c: Course) => void }) {
  const [active, setActive] = React.useState("Wszystkie");

  return (
    <div style={{ padding: "96px 72px 96px" }}>
      {/* Header */}
      <section style={{ paddingBottom: 48 }}>
        <Eyebrow>Adventuraix · Edukacja</Eyebrow>
        <h1 style={{
          fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 300,
          letterSpacing: "-0.03em", color: "var(--fg)",
          margin: "12px 0 4px", maxWidth: 900, lineHeight: 1.05,
        }}>Naucz się podróżować, zanim wyjedziesz.</h1>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 28, color: "var(--fg-muted)", margin: "4px 0 24px" }}>
          Learn to travel, before you go.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--fg-muted)", maxWidth: 560 }}>
          Kursy od ludzi, którzy przetarli szlak. Bez marketingowej gadki — wiedza, którą można spakować do plecaka.
        </p>
      </section>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            style={{
              padding: "8px 16px", borderRadius: 999, cursor: "pointer",
              border: `1px solid ${f === active ? "var(--adx-sage)" : "var(--adx-sage-a24)"}`,
              background: f === active ? "var(--adx-sage)" : "transparent",
              color: f === active ? "var(--adx-paper)" : "var(--fg-muted)",
              fontFamily: "var(--font-sans)", fontSize: 13,
              transition: "all 180ms var(--ease-out)",
            }}
          >{f}</button>
        ))}
      </div>

      {/* Course grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 20 }}>
        {COURSES.map((c, i) => (
          <Card key={c.id} onClick={() => onOpen?.(c)} style={{ gridColumn: i === 0 ? "span 2" : "auto" }}>
            <div style={{ aspectRatio: i === 0 ? "16/7" : "4/3", position: "relative", overflow: "hidden" }}>
              <img src={c.img} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 14, left: 14 }}>
                <Badge variant="glass">{c.tag}</Badge>
              </div>
            </div>
            <div style={{ padding: "18px 20px 20px" }}>
              <Eyebrow style={{ fontSize: 10 }}>{c.len}</Eyebrow>
              <h3 style={{
                fontSize: i === 0 ? 26 : 19, fontWeight: 500,
                letterSpacing: "-0.02em", color: "var(--fg)", margin: "6px 0 4px",
              }}>{c.title}</h3>
              <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 15, color: "var(--fg-muted)", margin: "0 0 8px" }}>
                {c.sub}
              </p>
              {i === 0 && (
                <p style={{ fontSize: 14.5, color: "var(--fg-muted)", margin: "0 0 12px", lineHeight: 1.6 }}>{c.desc}</p>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 10 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)" }}>{c.author}</span>
                <span style={{ fontSize: 16, fontWeight: 500, color: "var(--adx-clay-deep)" }}>{c.price}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
