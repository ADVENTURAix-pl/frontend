"use client";

import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { StarMark } from "./AdventuraLogo";

const BRAND = "#565F59";
const BG = "#F3F4F2";
const NAVBAR_H = 72;

// Timeline at 60fps
const HOLD_END = 8;       // 0.13s — one clean hold
const SHRINK_END = 108;   // 100 frames = 1.67s shrink
const TEXT_END = 168;     // 60 frames = 1.0s text reveal
const NAV_START = 188;    // 20 frame pause
const NAV_END = 248;      // 1.0s nav fly
const EXPAND_START = 248; // starts as nav finishes
const EXPAND_END = 318;   // 70 frames = 1.17s expand from 0 to full
export const TOTAL_FRAMES = 318;

// Quartic ease-out
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
// Cubic ease-in-out
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function logLerp(from: number, to: number, t: number) {
  return Math.exp(Math.log(from) + t * (Math.log(to) - Math.log(from)));
}

export function starTransform(cx: number, cy: number, S: number) {
  return `translate(${cx},${cy}) scale(${S / 100}) rotate(-12) translate(-50,-50)`;
}

export const STAR_PATH =
  "M 50,2 C 53,28 72,47 98,50 C 72,53 53,72 50,98 C 47,72 28,53 2,50 C 28,47 47,28 50,2 Z";

interface Props {
  vpWidth: number;
  vpHeight: number;
}

export function LogoAnimationComposition({ vpWidth, vpHeight }: Props) {
  const frame = useCurrentFrame();

  const logoStarSize = 96;
  const navStarSize = 32;
  const cx = vpWidth / 2;
  const cy = vpHeight / 2;

  const diagonal = Math.sqrt(vpWidth ** 2 + vpHeight ** 2);
  const fullStarSize = diagonal * 2.8;

  // ── Phase 2: shrink ──────────────────────────────────────────────────────
  const shrinkT = (() => {
    if (frame <= HOLD_END) return 0;
    if (frame >= SHRINK_END) return 1;
    return easeOutQuart((frame - HOLD_END) / (SHRINK_END - HOLD_END));
  })();
  const starSize = logLerp(fullStarSize, logoStarSize, shrinkT);

  const isShrinking = frame < SHRINK_END;
  const isLogoPhase = frame >= SHRINK_END;
  const isNavPhase = frame >= NAV_START;
  const isExpandPhase = frame >= EXPAND_START;

  // ── Phase 3: text ────────────────────────────────────────────────────────
  const textT = (() => {
    if (frame <= SHRINK_END) return 0;
    if (frame >= TEXT_END) return 1;
    return easeOutQuart((frame - SHRINK_END) / (TEXT_END - SHRINK_END));
  })();

  // ── Phase 4: nav fly ─────────────────────────────────────────────────────
  const navT = (() => {
    if (frame <= NAV_START) return 0;
    if (frame >= NAV_END) return 1;
    return 1 - Math.pow(1 - (frame - NAV_START) / (NAV_END - NAV_START), 3);
  })();

  // ── Phase 5: expand colored panel ────────────────────────────────────────
  const expandT = (() => {
    if (frame <= EXPAND_START) return 0;
    if (frame >= EXPAND_END) return 1;
    return easeInOutCubic((frame - EXPAND_START) / (EXPAND_END - EXPAND_START));
  })();

  // Panel grows from 0×0 at the center of the below-navbar area → full
  const panelH = vpHeight - NAVBAR_H;
  const panelW = interpolate(expandT, [0, 1], [0, vpWidth]);
  const panelHeight = interpolate(expandT, [0, 1], [0, panelH]);

  const navCX = 24 + navStarSize / 2;
  const navCY = (NAVBAR_H - navStarSize) / 2 + navStarSize / 2;

  const curStarSize = isNavPhase
    ? interpolate(navT, [0, 1], [logoStarSize, navStarSize])
    : logoStarSize;
  const textFontSize = isNavPhase ? interpolate(navT, [0, 1], [38, 16]) : 38;
  const textGap = isNavPhase ? interpolate(navT, [0, 1], [18, 8]) : 18;

  const estTextWidth = 230;

  const textShift = interpolate(textT, [0, 1], [0, (textGap + estTextWidth) / 2]);

  const logoLeft = isNavPhase
    ? interpolate(navT, [0, 1], [cx - (textGap + estTextWidth) / 2 - logoStarSize / 2, navCX - navStarSize / 2])
    : cx - textShift - logoStarSize / 2;

  const logoTop = isNavPhase
    ? interpolate(navT, [0, 1], [cy - logoStarSize / 2, navCY - navStarSize / 2])
    : cy - logoStarSize / 2;

  return (
    <AbsoluteFill style={{ background: BG }}>

      {/* ── Phase 4 bg: solid colored area below navbar so page shows through above ─ */}
      {isNavPhase && (
        <div style={{
          position: "absolute",
          top: NAVBAR_H,
          left: 0,
          right: 0,
          bottom: 0,
          background: BG,
        }} />
      )}

      {/* ── Phase 5: brand-colored rounded card expanding from center ── */}
      {isExpandPhase && (
        <div style={{
          position: "absolute",
          // Anchor at the vertical & horizontal center of the below-navbar area
          left: cx,
          top: NAVBAR_H + panelH / 2,
          width: panelW,
          height: panelHeight,
          // Grow outward from the anchor point (toast-bread style — 4 rounded corners)
          transform: "translate(-50%, -50%)",
          background: BRAND,
          borderRadius: 24,
          boxShadow: "0 12px 60px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12)",
          zIndex: 1,
          overflow: "hidden",
        }} />
      )}

      {/* SVG clip-path: star shrink phase */}
      {isShrinking && (
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
          viewBox={`0 0 ${vpWidth} ${vpHeight}`}
        >
          <defs>
            <clipPath id="star-clip" clipPathUnits="userSpaceOnUse">
              <path d={STAR_PATH} transform={starTransform(cx, cy, starSize)} />
            </clipPath>
          </defs>
          <rect
            x={-vpWidth} y={-vpHeight}
            width={vpWidth * 3} height={vpHeight * 3}
            fill={BRAND}
            clipPath="url(#star-clip)"
          />
        </svg>
      )}

      {/* Logo mark + wordmark */}
      {isLogoPhase && (
        <div style={{
          position: "absolute", display: "flex", alignItems: "center",
          gap: textGap, left: logoLeft, top: logoTop,
          zIndex: 2,
        }}>
          <StarMark color={BRAND} size={curStarSize} />
          <div style={{
            display: "flex",
            fontSize: textFontSize, fontWeight: 400, color: BRAND,
            letterSpacing: "-0.02em", fontFamily: "system-ui, sans-serif",
            lineHeight: 1, whiteSpace: "nowrap",
          }}>
            {"ADVENTURAix".split("").map((char, i) => {
              const start = (i / 11) * 0.5;
              const end = start + 0.5;
              const charT = interpolate(textT, [start, end], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    opacity: isNavPhase ? 1 : charT,
                    transform: isNavPhase
                      ? undefined
                      : `translateY(${interpolate(charT, [0, 1], [20, 0])}px)`,
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>
      )}

    </AbsoluteFill>
  );
}
