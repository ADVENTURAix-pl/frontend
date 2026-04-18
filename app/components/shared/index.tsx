"use client";

import React, { useState } from "react";

// ── StarMark ────────────────────────────────────────────────────────────────
export const StarMark = ({
  size = 24,
  color = "currentColor",
  style,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill={color} style={style}>
    <g transform="rotate(-12, 50, 50)">
      <path d="M 50,2 C 53,28 72,47 98,50 C 72,53 53,72 50,98 C 47,72 28,53 2,50 C 28,47 47,28 50,2 Z" />
    </g>
  </svg>
);

// ── Logo ────────────────────────────────────────────────────────────────────
export const Logo = ({
  size = 22,
  showWord = true,
  color = "var(--adx-sage)",
}: {
  size?: number;
  showWord?: boolean;
  color?: string;
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: size * 0.35, color }}>
    <StarMark size={size} />
    {showWord && (
      <span style={{
        fontFamily: "var(--font-sans)",
        fontSize: size * 0.72,
        fontWeight: 400,
        letterSpacing: "-0.02em",
        color,
        lineHeight: 1,
      }}>ADVENTURAix</span>
    )}
  </div>
);

// ── Eyebrow ─────────────────────────────────────────────────────────────────
export const Eyebrow = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <span className="adx-eyebrow" style={style}>{children}</span>
);

// ── Button ──────────────────────────────────────────────────────────────────
type ButtonVariant = "primary" | "secondary" | "ghost" | "accent" | "inverse";
type ButtonSize = "sm" | "md" | "lg";

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  onClick,
  style,
  disabled,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
}) => {
  const [hover, setHover] = useState(false);
  const sizes: Record<ButtonSize, React.CSSProperties> = {
    sm: { padding: "8px 16px", fontSize: 13 },
    md: { padding: "12px 22px", fontSize: 14 },
    lg: { padding: "16px 30px", fontSize: 15 },
  };
  const variants: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      background: hover ? "var(--adx-sage-deep)" : "var(--adx-sage)",
      color: "var(--adx-paper)",
      border: "1px solid transparent",
    },
    secondary: {
      background: hover ? "var(--adx-sage-a06)" : "transparent",
      color: "var(--adx-sage)",
      border: "1px solid var(--adx-sage-a24)",
    },
    ghost: {
      background: hover ? "var(--adx-sage-a06)" : "transparent",
      color: "var(--adx-sage)",
      border: "1px solid transparent",
    },
    accent: {
      background: hover ? "var(--adx-clay-deep)" : "var(--adx-clay)",
      color: "var(--adx-paper)",
      border: "1px solid transparent",
    },
    inverse: {
      background: hover ? "var(--adx-paper-warm)" : "var(--adx-paper)",
      color: "var(--adx-sage)",
      border: "1px solid transparent",
    },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        letterSpacing: "-0.005em",
        borderRadius: 999,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 180ms var(--ease-out)",
        opacity: disabled ? 0.5 : 1,
        ...sizes[size],
        ...variants[variant],
        ...style,
      }}
    >{children}</button>
  );
};

// ── Badge ───────────────────────────────────────────────────────────────────
type BadgeVariant = "outline" | "filled" | "moss" | "clay" | "ok" | "glass";

export const Badge = ({
  variant = "outline",
  children,
  style,
}: {
  variant?: BadgeVariant;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  const variants: Record<BadgeVariant, React.CSSProperties> = {
    outline: { background: "transparent", color: "var(--fg)", border: "1px solid var(--adx-sage-a24)" },
    filled:  { background: "var(--adx-sage)", color: "var(--adx-paper)", border: "none" },
    moss:    { background: "rgba(74,90,72,0.12)", color: "var(--adx-moss)", border: "none" },
    clay:    { background: "rgba(184,137,106,0.16)", color: "var(--adx-clay-deep)", border: "none" },
    ok:      { background: "rgba(95,122,90,0.14)", color: "var(--adx-ok)", border: "none" },
    glass:   { background: "rgba(243,244,242,0.88)", color: "var(--fg)", border: "none", backdropFilter: "blur(8px)" },
  };
  return (
    <span style={{
      fontFamily: "var(--font-sans)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      padding: "5px 10px",
      borderRadius: 999,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      whiteSpace: "nowrap",
      ...variants[variant],
      ...style,
    }}>{children}</span>
  );
};

// ── Card ────────────────────────────────────────────────────────────────────
export const Card = ({
  children,
  style,
  onClick,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onClick ? setHover(true) : undefined}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--adx-chalk)",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: hover && onClick ? "var(--shadow-3)" : "var(--shadow-2)",
        cursor: onClick ? "pointer" : "default",
        transform: hover && onClick ? "translateY(-2px)" : "none",
        transition: "transform 420ms var(--ease-out), box-shadow 420ms var(--ease-out)",
        ...style,
      }}
    >{children}</div>
  );
};

// ── Icon ────────────────────────────────────────────────────────────────────
const ICON_PATHS: Record<string, string> = {
  search:      "M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z",
  calendar:    "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  arrowRight:  "M5 12h14M12 5l7 7-7 7",
  mapPin:      "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 13a3 3 0 100-6 3 3 0 000 6z",
  heart:       "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  clock:       "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
  users:       "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  globe:       "M12 22a10 10 0 100-20 10 10 0 000 20z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  sparkles:    "M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z M19 15l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z",
  check:       "M20 6L9 17l-5-5",
  play:        "M5 3l14 9-14 9V3z",
  bookOpen:    "M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z",
  award:       "M12 15a7 7 0 100-14 7 7 0 000 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  menu:        "M3 12h18M3 6h18M3 18h18",
  x:           "M18 6L6 18M6 6l12 12",
  plus:        "M12 5v14M5 12h14",
  chevronDown: "M6 9l6 6 6-6",
  chevronRight:"M9 18l6-6-6-6",
  filter:      "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  bookmark:    "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z",
  send:        "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  bot:         "M12 8V4H8M12 8h4a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8a2 2 0 012-2h4 M9 12h.01M15 12h.01M9 16h6",
  messageCircle: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
};

export const Icon = ({
  name,
  size = 18,
  color = "currentColor",
  strokeWidth = 1.5,
}: {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) => {
  const d = ICON_PATHS[name] || "";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {d.split(" M").map((p, i) => (
        <path key={i} d={i === 0 ? p : `M${p}`} />
      ))}
    </svg>
  );
};

// ── Field ───────────────────────────────────────────────────────────────────
export const Field = ({
  label,
  hint,
  children,
}: {
  label?: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {label && (
      <label style={{
        fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 500,
        letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-faint)",
      }}>{label}</label>
    )}
    {children}
    {hint && (
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)" }}>{hint}</span>
    )}
  </div>
);

// ── Input ───────────────────────────────────────────────────────────────────
export const Input = ({
  placeholder,
  value,
  onChange,
  style,
  type = "text",
}: {
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  style?: React.CSSProperties;
  type?: string;
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: 15,
        border: `1px solid ${focus ? "var(--adx-sage)" : "var(--adx-sage-a24)"}`,
        background: "var(--adx-chalk)",
        color: "var(--fg)",
        padding: "12px 14px",
        borderRadius: 10,
        outline: "none",
        transition: "border-color 180ms var(--ease-out)",
        width: "100%",
        ...style,
      }}
    />
  );
};
