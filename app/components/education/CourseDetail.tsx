"use client";

import React from "react";
import { Badge, Button, Card, Eyebrow, Icon, StarMark } from "../shared";
import type { Course } from "./CoursesHome";

const LESSONS = [
  { n: "01", t: "Rytm dobowy w podróży",           len: "22 min" },
  { n: "02", t: "Nawodnienie i elektrolity",        len: "18 min" },
  { n: "03", t: "Jedzenie na lotnisku — co wybierać", len: "26 min" },
  { n: "04", t: "Sen w samolocie i strefy czasowe", len: "20 min" },
  { n: "05", t: "Trening w drodze",                len: "24 min" },
  { n: "06", t: "Apteczka, którą warto mieć",      len: "20 min" },
];

export function CourseDetail({
  course,
  onBack,
  onStart,
}: {
  course: Course;
  onBack: () => void;
  onStart?: (lesson: { n: string }) => void;
}) {
  return (
    <div style={{ padding: "24px 72px 96px", paddingTop: 96 }}>
      <button
        onClick={onBack}
        style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "var(--fg-muted)", padding: 0, marginBottom: 16 }}
      >← wróć do kursów</button>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 48, alignItems: "start" }}>
        {/* Left */}
        <div>
          <Badge variant="outline">{course.tag}</Badge>
          <h1 style={{ marginTop: 16, fontSize: 48, fontWeight: 300, letterSpacing: "-0.03em", color: "var(--fg)", lineHeight: 1.05 }}>
            {course.title}
          </h1>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 26, color: "var(--fg-muted)", margin: "6px 0 20px" }}>
            {course.sub}
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--fg-muted)", maxWidth: 560 }}>{course.desc}</p>

          {/* Curriculum */}
          <div style={{ marginTop: 40 }}>
            <Eyebrow>Program · curriculum</Eyebrow>
            <div style={{ marginTop: 12, border: "1px solid var(--adx-sage-a12)", borderRadius: 16, overflow: "hidden" }}>
              {LESSONS.map((l, i) => (
                <div
                  key={l.n}
                  onClick={() => onStart?.(l)}
                  style={{
                    padding: "16px 22px", display: "flex", alignItems: "center", gap: 16,
                    borderBottom: i < LESSONS.length - 1 ? "1px solid var(--adx-sage-a12)" : "none",
                    background: i === 0 ? "var(--adx-paper-warm)" : "var(--adx-chalk)",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-faint)", letterSpacing: "0.1em", minWidth: 28 }}>
                    {l.n}
                  </span>
                  <div style={{
                    width: 28, height: 28, borderRadius: 999,
                    background: i === 0 ? "var(--adx-sage)" : "transparent",
                    border: i === 0 ? "none" : "1px solid var(--adx-sage-a24)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon name="play" size={10} color={i === 0 ? "var(--adx-paper)" : "var(--fg-faint)"} />
                  </div>
                  <span style={{ flex: 1, fontSize: 15.5, color: "var(--fg)", fontWeight: i === 0 ? 500 : 400 }}>{l.t}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)" }}>{l.len}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky sidebar */}
        <aside style={{ position: "sticky", top: 96 }}>
          <Card style={{ overflow: "hidden" }}>
            <img src={course.img} alt={course.title} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} />
            <div style={{ padding: 24 }}>
              <div style={{ fontSize: 36, fontWeight: 300, letterSpacing: "-0.03em", color: "var(--fg)" }}>{course.price}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)" }}>dostęp na zawsze · offline</div>
              <Button size="lg" style={{ width: "100%", marginTop: 16 }} onClick={() => onStart?.({ n: "01" })}>
                Zacznij kurs
              </Button>
              <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid var(--adx-sage-a12)" }} />
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 999,
                  background: "var(--adx-paper-warm)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <StarMark size={16} color="var(--adx-sage)" />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--fg)" }}>{course.author}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-faint)" }}>prowadzący · instructor</div>
                </div>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
