"use client";

import React from "react";
import { Logo, Eyebrow } from "./shared";
import { useLocale } from "../providers/LocaleProvider";

export const FOOTER_HEIGHT = 380;

export function Footer() {
  const { t } = useLocale();
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: FOOTER_HEIGHT,
        zIndex: 1,
        background: "var(--adx-paper-warm)",
        fontFamily: "var(--font-sans)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(36px, 5vh, 52px) clamp(32px, 6vw, 80px) 28px",
        boxSizing: "border-box",
      }}
    >
      {/* Top row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }}>
        <div>
          <Logo size={24} />
          <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.65, color: "var(--fg-muted)", fontWeight: 300, maxWidth: 300 }}>
            {t.footer.tagline}
          </p>
        </div>
        {t.footer.cols.map((col) => (
          <div key={col.h}>
            <Eyebrow>{col.h}</Eyebrow>
            <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
              {col.l.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{ fontSize: 14, color: "var(--fg-muted)", textDecoration: "none", transition: "color 180ms var(--ease-out)" }}
                    onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--fg)")}
                    onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--fg-muted)")}
                  >{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid var(--adx-sage-a12)",
        paddingTop: 20,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
        fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)",
      }}>
        <span>{t.footer.copy}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span>{t.footer.tagline2}</span>
          <Logo size={13} />
          <span style={{ marginLeft: 6 }}>{t.footer.payments}</span>
        </span>
      </div>
    </footer>
  );
}
