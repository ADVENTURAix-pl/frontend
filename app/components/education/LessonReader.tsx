"use client";

import React from "react";
import { Button, Eyebrow, Icon } from "../shared";
import type { Course } from "./CoursesHome";

const SIDEBAR_LESSONS = [
  "Rytm dobowy w podróży",
  "Nawodnienie i elektrolity",
  "Jedzenie na lotnisku",
  "Sen w samolocie",
  "Trening w drodze",
  "Apteczka",
];

export function LessonReader({
  course,
  onBack,
}: {
  course: Course;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-[90vh] pt-[72px]">
      {/* Sidebar */}
      <aside className="w-full md:w-[280px] shrink-0 bg-[var(--adx-paper-warm)] p-6 md:p-8 md:border-r border-[var(--adx-sage-a12)]">
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--fg-muted)", padding: 0, marginBottom: 24 }}
        >← {course.title}</button>

        <Eyebrow>Lekcje · lessons</Eyebrow>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 2 }}>
          {SIDEBAR_LESSONS.map((t, i) => (
            <div key={i} style={{
              padding: "10px 12px", borderRadius: 8, cursor: "pointer",
              background: i === 0 ? "var(--adx-paper)" : "transparent",
              color: i === 0 ? "var(--fg)" : "var(--fg-muted)",
              fontSize: 14, fontWeight: i === 0 ? 500 : 400,
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-faint)", marginRight: 8 }}>
                0{i + 1}
              </span>
              {t}
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-6 md:px-[72px] py-10 md:py-12 pb-16 md:pb-[96px] max-w-[780px]">
        <Eyebrow>Lekcja 01 · 22 min</Eyebrow>
        <h1 style={{ marginTop: 14, fontSize: 44, fontWeight: 300, letterSpacing: "-0.03em", color: "var(--fg)", lineHeight: 1.1 }}>
          Rytm dobowy w podróży.
        </h1>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, color: "var(--fg-muted)", margin: "6px 0 0" }}>
          Circadian rhythm on the road.
        </p>

        {/* Video player */}
        <div style={{ marginTop: 32, aspectRatio: "16/9", borderRadius: 16, overflow: "hidden", background: "var(--adx-ink)", position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1600&q=80"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
          />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              width: 64, height: 64, borderRadius: 999,
              background: "rgba(243,244,242,0.92)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name="play" size={22} color="var(--fg)" />
            </div>
          </div>
          <div style={{
            position: "absolute", bottom: 16, left: 16, right: 16,
            display: "flex", alignItems: "center", gap: 12,
            color: "var(--adx-paper)", fontFamily: "var(--font-mono)", fontSize: 11,
          }}>
            <span>03:12</span>
            <div style={{ flex: 1, height: 3, background: "rgba(243,244,242,0.2)", borderRadius: 2 }}>
              <div style={{ width: "18%", height: "100%", background: "var(--adx-paper)", borderRadius: 2 }} />
            </div>
            <span>22:04</span>
          </div>
        </div>

        <p style={{ marginTop: 32, fontSize: 17, lineHeight: 1.8, color: "var(--fg-muted)" }}>
          Twoje ciało ma zegar. Nie zsynchronizuje się sam — trzeba mu pomóc. W tej lekcji pokażę trzy proste
          interwencje, które robię przed każdym wylotem: ekspozycja na światło, timing ostatniego posiłku
          i mikro-drzemka „no więcej niż 20 minut".
        </p>

        <h2 style={{ marginTop: 40, fontSize: 26, fontWeight: 400, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          Trzy interwencje
        </h2>
        <ol style={{ marginTop: 12, paddingLeft: 20, fontSize: 16, lineHeight: 1.8, color: "var(--fg-muted)" }}>
          <li><b style={{ color: "var(--fg)" }}>Światło poranne</b> — 10 minut w świetle dziennym w strefie docelowej.</li>
          <li><b style={{ color: "var(--fg)" }}>Post 14 h</b> — ostatni posiłek w strefie wylotu, pierwszy w strefie docelowej.</li>
          <li><b style={{ color: "var(--fg)" }}>Drzemka ≤ 20 min</b> — dłuższa wpycha cię w sen głęboki, z którego się nie wychodzi czysto.</li>
        </ol>

        {/* Curator note */}
        <div style={{ marginTop: 48, padding: 24, background: "var(--adx-paper-warm)", borderRadius: 16 }}>
          <Eyebrow>Uwaga kuratora · curator's note</Eyebrow>
          <p style={{ marginTop: 8, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 20, color: "var(--fg)", lineHeight: 1.4 }}>
            Nie każdy organizm reaguje tak samo. Ja testowałem te zasady na 14 lotach w 2025 — ale twój mózg wie więcej niż twój kalendarz.
          </p>
        </div>

        {/* Navigation */}
        <div style={{ marginTop: 48, display: "flex", justifyContent: "space-between" }}>
          <Button variant="secondary" onClick={onBack}>← Poprzednia</Button>
          <Button>Następna lekcja →</Button>
        </div>
      </main>
    </div>
  );
}
