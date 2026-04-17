"use client";

import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { StarMark } from "./AdventuraLogo";

const BRAND = "#565F59";
const BG = "#F3F4F2";

// Timeline at 60fps
const HOLD_END = 8;       // 0.13s — one clean hold
const SHRINK_END = 108;   // 100 frames = 1.67s shrink
const TEXT_END = 168;     // 60 frames = 1.0s text reveal (Middle ground)
const NAV_START = 188;    // 20 frame pause
const NAV_END = 248;      // 1.0s nav fly
export const TOTAL_FRAMES = 258;

// Quartic ease-out: maximum initial velocity, decelerates immediately to zero
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

// Log-scale interpolation so perceptual speed is consistent regardless of size.
// A 5000→2500px change looks the same speed as a 200→100px change.
function logLerp(from: number, to: number, t: number) {
  return Math.exp(Math.log(from) + t * (Math.log(to) - Math.log(from)));
}

// Star SVG transform: viewBox (0-100) → centered at (cx,cy) at size S, rotated -12°
export function starTransform(cx: number, cy: number, S: number) {
  return `translate(${cx},${cy}) scale(${S / 100}) rotate(-12) translate(-50,-50)`;
}

// The star path (viewBox 0 0 100 100)
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

  // diagonal × 2.8 → concave side at 45° reaches 0.63 × half-diagonal > 0.5 ✓
  const diagonal = Math.sqrt(vpWidth ** 2 + vpHeight ** 2);
  const fullStarSize = diagonal * 2.8;

  // ── Phase 2: shrink ──────────────────────────────────────────────────────
  // Log-scale lerp + quartic ease-out = visible deceleration from frame 1.
  // 5000→2500 LOOKS the same as 200→100 (both = halving), so the perceptual
  // speed curve matches what easeOutQuart describes.
  const shrinkT = (() => {
    if (frame <= HOLD_END) return 0;
    if (frame >= SHRINK_END) return 1;
    return easeOutQuart((frame - HOLD_END) / (SHRINK_END - HOLD_END));
  })();
  const starSize = logLerp(fullStarSize, logoStarSize, shrinkT);

  const isShrinking = frame < SHRINK_END;
  const isLogoPhase = frame >= SHRINK_END;
  const isNavPhase = frame >= NAV_START;

  // ── Phase 3: text ────────────────────────────────────────────────────────
  const textT = (() => {
    if (frame <= SHRINK_END) return 0;
    if (frame >= TEXT_END) return 1;
    return easeOutQuart((frame - SHRINK_END) / (TEXT_END - SHRINK_END));
  })();

  // ── Phase 4: nav ─────────────────────────────────────────────────────────
  const navT = (() => {
    if (frame <= NAV_START) return 0;
    if (frame >= NAV_END) return 1;
    return 1 - Math.pow(1 - (frame - NAV_START) / (NAV_END - NAV_START), 3);
  })();

  const navCX = 24 + navStarSize / 2;
  const navCY = (72 - navStarSize) / 2 + navStarSize / 2;

  const curStarSize = isNavPhase ? interpolate(navT, [0, 1], [logoStarSize, navStarSize]) : logoStarSize;
  const textFontSize = isNavPhase ? interpolate(navT, [0, 1], [38, 16]) : 38;
  const textGap = isNavPhase ? interpolate(navT, [0, 1], [18, 8]) : 18;
  const pageOpacity = isNavPhase ? interpolate(navT, [0.5, 1], [0, 1]) : 0;

  // ── Centering Logic ──────────────────────────────────────────────────────
  // We estimate the text width to calculate the group's offset from center.
  // "ADVENTURA" (9 chars) + "ix" (2 chars) at 38px font.
  const estTextWidth = 230; 
  const totalGroupWidth = logoStarSize + textGap + estTextWidth;
  
  // During text reveal, the "target center" of the logo shifts left.
  // At textT=0, shift=0 (logo is centered). At textT=1, shift is half the text+gap.
  const textShift = interpolate(textT, [0, 1], [0, (textGap + estTextWidth) / 2]);
  
  const logoLeft = isNavPhase
    ? interpolate(navT, [0, 1], [cx - (textGap + estTextWidth) / 2 - logoStarSize / 2, navCX - navStarSize / 2])
    : cx - textShift - logoStarSize / 2;

  const logoTop = isNavPhase
    ? interpolate(navT, [0, 1], [cy - logoStarSize / 2, navCY - navStarSize / 2])
    : cy - logoStarSize / 2;

  // Sequential reveal of "ADVENTURA" and "ix"
  const word1T = interpolate(textT, [0, 0.7], [0, 1], { extrapolateRight: "clamp" });
  const word2T = interpolate(textT, [0.5, 1], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: BG }}>

      {isNavPhase && (
        <>
          <div style={{ position: "absolute", inset: 0, opacity: pageOpacity }}>
            <div style={{ height: 72, background: BG, borderBottom: "1px solid rgba(86,95,89,0.12)" }} />
          </div>
          <div style={{
            position: "absolute", inset: 0, paddingTop: 72,
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: pageOpacity, pointerEvents: "none",
          }}>
            <p style={{ fontSize: 56, fontWeight: 300, letterSpacing: "-0.03em", color: BRAND, fontFamily: "system-ui, sans-serif", margin: 0 }}>
              Adventure, reimagined.
            </p>
          </div>
        </>
      )}

      {/* SVG clip-path: brand rect clipped to the animated star shape.
          rect is 3× viewport so no edges are ever visible. */}
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

      {isLogoPhase && (
        <div style={{
          position: "absolute", display: "flex", alignItems: "center",
          gap: textGap, left: logoLeft, top: logoTop,
        }}>
          <StarMark color={BRAND} size={curStarSize} />
          <div style={{
            display: "flex",
            fontSize: textFontSize, fontWeight: 400, color: BRAND,
            letterSpacing: "-0.02em", fontFamily: "system-ui, sans-serif",
            lineHeight: 1, whiteSpace: "nowrap",
          }}>
            {"ADVENTURAix".split("").map((char, i) => {
              // Stagger the 11 characters across the textT phase.
              // Slower stagger: each letter takes 50% of the total reveal time
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
