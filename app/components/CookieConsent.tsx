"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "../providers/LocaleProvider";

const STORAGE_KEY = "adx-cookie-consent";

export type CookieChoice = { technical: true; profiling: boolean };

function getStored(): CookieChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieChoice;
  } catch {
    return null;
  }
}

function setStored(choice: CookieChoice) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
}

export function CookieConsent() {
  const { locale } = useLocale();
  const [visible, setVisible] = useState(false);
  const [profiling, setProfiling] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const stored = getStored();
    if (stored) {
      setProfiling(stored.profiling);
    } else {
      setVisible(true);
    }
  }, []);

  function handleConfirm() {
    const choice: CookieChoice = { technical: true, profiling };
    setStored(choice);
    setVisible(false);
  }

  function handleReject() {
    const choice: CookieChoice = { technical: true, profiling: false };
    setStored(choice);
    setProfiling(false);
    setVisible(false);
  }

  if (!visible) return null;

  const isPl = locale === "pl";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        background: "rgba(31,36,33,0.45)",
        backdropFilter: "blur(4px)",
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setExpanded(false);
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          width: "100%",
          maxWidth: 520,
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 20px 60px rgba(31,36,33,0.18)",
          fontFamily: "var(--font-sans)",
          color: "var(--adx-ink)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px 0",
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--adx-ink)",
            }}
          >
            ADVENTURAix
          </span>
          <button
            aria-label="Close"
            onClick={handleReject}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              color: "var(--adx-sage)",
            }}
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div style={{ padding: "16px 24px 24px" }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 400,
              letterSpacing: "-0.02em",
              margin: "0 0 12px",
              color: "var(--adx-ink)",
            }}
          >
            {isPl ? "Twoje preferencje dotyczące ciasteczek" : "Your cookie preferences"}
          </h2>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--adx-sage-soft)",
              margin: "0 0 16px",
            }}
          >
            {isPl
              ? "Używamy ciasteczek, aby zapewnić bezpieczeństwo i wygodę naszej strony oraz realizować działania opisane poniżej."
              : "We use cookies to keep our site secure and user-friendly, and to carry out the activities stated below."}
          </p>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--adx-sage-soft)",
              margin: "0 0 20px",
            }}
          >
            {isPl
              ? "Możesz dostosować preferencje w dowolnym momencie, przełączając opcje."
              : "You can customize your cookie preferences at any time by toggling the options on or off."}
          </p>

          <button
            onClick={() => setExpanded((v) => !v)}
            style={{
              display: "inline-block",
              fontSize: 13,
              color: "var(--adx-ink)",
              textDecoration: "underline",
              textUnderlineOffset: 3,
              background: "none",
              border: "1px solid var(--adx-ink-a12)",
              borderRadius: 6,
              padding: "8px 12px",
              cursor: "pointer",
              marginBottom: 20,
            }}
          >
            {isPl
              ? "Więcej informacji znajdziesz w naszej polityce prywatności i ciasteczek."
              : "For more information, have a look at our privacy and cookie policy."}
          </button>

          {/* Preferences */}
          {expanded && (
            <>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  margin: "0 0 14px",
                  color: "var(--adx-ink)",
                }}
              >
                {isPl ? "Zarządzaj preferencjami zgody" : "Manage consent preferences"}
              </h3>

              {/* Technical cookies */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  borderBottom: "1px solid var(--adx-ink-a08)",
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--adx-ink)" }}>
                  {isPl ? "Ciasteczka techniczne" : "Technical cookies"}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--adx-info)",
                  }}
                >
                  {isPl ? "Zawsze aktywne" : "Always active"}
                </span>
              </div>

              {/* Profiling cookies */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  borderBottom: "1px solid var(--adx-ink-a08)",
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--adx-ink)" }}>
                  {isPl ? "Ciasteczka profilujące" : "Profiling cookies"}
                </span>
                <button
                  onClick={() => setProfiling((v) => !v)}
                  aria-pressed={profiling}
                  style={{
                    width: 48,
                    height: 28,
                    borderRadius: 999,
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    background: profiling ? "var(--adx-ok)" : "var(--adx-sage-a24)",
                    transition: "background 200ms ease",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      background: "#fff",
                      position: "absolute",
                      top: 3,
                      left: profiling ? 23 : 3,
                      transition: "left 200ms ease",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                    }}
                  />
                </button>
              </div>
            </>
          )}

          {/* Actions */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 24,
            }}
          >
            <button
              onClick={handleReject}
              style={{
                width: "100%",
                padding: "14px 0",
                borderRadius: 8,
                border: "none",
                background: "var(--adx-ink)",
                color: "#fff",
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              {isPl ? "Odrzuć wszystkie" : "Reject all"}
            </button>
            <button
              onClick={handleConfirm}
              style={{
                width: "100%",
                padding: "14px 0",
                borderRadius: 8,
                border: "none",
                background: "var(--adx-ink)",
                color: "#fff",
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              {isPl ? "Potwierdź mój wybór" : "Confirm my choices"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
