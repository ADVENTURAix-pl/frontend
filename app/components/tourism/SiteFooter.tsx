"use client";

import React from "react";
import { Eyebrow, Logo } from "../shared";

export function SiteFooter() {
  return (
    <footer style={{
      margin: "0 24px 24px",
      padding: "64px 72px",
      background: "var(--adx-paper-warm)",
      borderRadius: 24,
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }}>
        <div>
          <Logo size={26} />
          <p style={{
            marginTop: 20, fontSize: 14, color: "var(--fg-muted)",
            maxWidth: 340, lineHeight: 1.65,
          }}>
            Most pomiędzy europejską innowacją a globalnym podróżnikiem. Poznań, Polska.
          </p>
        </div>
        {[
          { h: "Podróże", l: ["Bałkany", "Maroko", "Jordania", "Gruzja"] },
          { h: "Firma",   l: ["O nas", "Zespół", "Partnerzy", "Kontakt"] },
          { h: "Prawo",   l: ["Regulamin", "Prywatność", "Cookies", "Reklamacje"] },
        ].map((c) => (
          <div key={c.h}>
            <Eyebrow>{c.h}</Eyebrow>
            <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
              {c.l.map((item) => (
                <li key={item} style={{ fontSize: 14, color: "var(--fg-muted)", cursor: "pointer" }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 48, paddingTop: 24,
        borderTop: "1px solid var(--adx-sage-a12)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
        fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)",
      }}>
        <span>© 2026 ADVENTURAix. All rights reserved. · Adventuraix Sp. z o.o. · NIP: 123-456-78-90</span>
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span>Adventure, reimagined.</span>
          <Logo size={14} />
          <span style={{ marginLeft: 8 }}>Apple Pay · Visa · Mastercard</span>
        </span>
      </div>
    </footer>
  );
}
