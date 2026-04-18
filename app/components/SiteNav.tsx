"use client";

import React from "react";
import { Logo, Button } from "./shared";
import { useLocale, type Locale } from "../providers/LocaleProvider";

type Tab = "discover" | "education" | "club" | "about";

const TAB_KEYS: { id: Tab; key: keyof ReturnType<typeof useLocale>["t"]["nav"] }[] = [
  { id: "discover",  key: "discover" },
  { id: "education", key: "education" },
  { id: "club",      key: "club" },
  { id: "about",     key: "about" },
];

const LOCALES: Locale[] = ["pl", "en"];

export function SiteNav({
  activeTab,
  onTab,
  visible = true,
}: {
  activeTab: Tab;
  onTab: (tab: Tab) => void;
  visible?: boolean;
}) {
  const { locale, setLocale, t } = useLocale();

  return (
    <nav style={{
      position: "fixed",
      top: 16,
      left: 0,
      right: 0,
      zIndex: 100,
      margin: "0 24px",
      display: "flex",
      alignItems: "center",
      gap: 24,
      padding: "12px 20px",
      background: "rgba(243,244,242,0.88)",
      backdropFilter: "blur(12px)",
      border: "1px solid var(--adx-sage-a12)",
      borderRadius: 999,
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? "auto" : "none",
      transition: "opacity 0.5s var(--ease-out)",
    }}>
      <button onClick={() => onTab("discover")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
        <Logo size={22} />
      </button>

      <div style={{ display: "flex", gap: 4, marginLeft: 12 }}>
        {TAB_KEYS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTab(tab.id)}
            style={{
              background: activeTab === tab.id ? "var(--adx-sage-a06)" : "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 12px",
              borderRadius: 999,
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              color: activeTab === tab.id ? "var(--fg)" : "var(--fg-muted)",
              fontWeight: activeTab === tab.id ? 500 : 400,
              transition: "all 180ms var(--ease-out)",
            }}
          >{t.nav[tab.key]}</button>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Language toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        {LOCALES.map((l, i) => (
          <React.Fragment key={l}>
            {i > 0 && (
              <span style={{ color: "var(--fg-faint)", fontSize: 11, padding: "0 2px" }}>/</span>
            )}
            <button
              onClick={() => setLocale(l)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                color: locale === l ? "var(--fg)" : "var(--fg-faint)",
                fontWeight: locale === l ? 600 : 400,
                padding: "3px 5px",
                borderRadius: 4,
                textTransform: "uppercase",
                transition: "color 200ms var(--ease-out), background 200ms var(--ease-out)",
                textDecoration: locale === l ? "underline" : "none",
                textUnderlineOffset: 3,
              }}
            >
              {l}
            </button>
          </React.Fragment>
        ))}
      </div>

      <Button size="sm" variant="primary" onClick={() => onTab("discover")}>{t.nav.plan}</Button>
    </nav>
  );
}
