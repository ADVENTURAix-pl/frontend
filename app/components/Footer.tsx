"use client";

import React from "react";
import { Logo, Eyebrow } from "./shared";
import { useLocale } from "../providers/LocaleProvider";

export function Footer() {
  const { t } = useLocale();
  return (
    <footer
      className="static lg:fixed bottom-0 left-0 right-0 z-0 bg-[var(--adx-paper-warm)] font-sans flex flex-col justify-between p-8 md:p-10 lg:px-[80px] lg:pt-[52px] lg:pb-[28px] box-border lg:h-[380px]"
    >
      {/* Top row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full">
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
      <div className="mt-12 lg:mt-0 pt-5 border-t border-[var(--adx-sage-a12)] flex flex-col md:flex-row justify-between items-start md:items-center flex-wrap gap-3 font-mono text-[11px] text-[var(--fg-faint)]">
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
