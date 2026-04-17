"use client";

import React, { useEffect, useRef, useState } from "react";
import { Player, PlayerRef } from "@remotion/player";
import { LogoAnimationComposition, TOTAL_FRAMES } from "./LogoAnimation";

const FPS = 60;
const BRAND = "#565F59";
const NAVBAR_H = 72;

export function LogoIntro({ onComplete }: { onComplete?: () => void }) {
  const playerRef = useRef<PlayerRef>(null);
  const wipePanelRef = useRef<HTMLDivElement>(null);
  const [wiping, setWiping] = useState(false);
  const [done, setDone] = useState(false);
  const [vp, setVp] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    setVp({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Run the left-to-right clip-path wipe once we enter wipe mode
  useEffect(() => {
    if (!wiping) return;
    const el = wipePanelRef.current;
    if (!el) return;

    // Start fully covering (clipped from right = fully visible)
    el.style.transition = "none";
    el.style.clipPath = "inset(0 0% 0 0%)";

    // Double-RAF: guarantees two browser paint cycles before animating
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Wipe left-to-right: expand the left inset until the panel vanishes
        el.style.transition = "clip-path 0.9s cubic-bezier(0.87, 0, 0.13, 1)";
        el.style.clipPath = "inset(0 0% 0 100%)";
      });
    });

    // Unmount after animation completes
    const timer = setTimeout(() => setDone(true), 1100);

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(timer);
    };
  }, [wiping]);

  // Frame listener + fallback
  useEffect(() => {
    const player = playerRef.current;
    if (!player || !vp) return;

    const complete = () => {
      if (wiping) return;
      onComplete?.();   // reveal page + navbar immediately
      setWiping(true);  // kick off the wipe
    };

    // Fire when the Remotion expand animation is done (frame >= TOTAL_FRAMES - 2)
    const handleFrame = (e: { detail: { frame: number } }) => {
      if (e.detail.frame >= TOTAL_FRAMES - 2) complete();
    };

    const fallback = setTimeout(complete, (TOTAL_FRAMES / FPS) * 1000 + 500);
    player.addEventListener("frameupdate", handleFrame as any);

    return () => {
      player.removeEventListener("frameupdate", handleFrame as any);
      clearTimeout(fallback);
    };
  }, [onComplete, vp, wiping]);

  if (done) return null;

  return (
    <>
      {/* ── Phase 1: Remotion player (full-screen, highest z-index) ── */}
      {!wiping && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: BRAND,
          }}
        >
          {vp && (
            <Player
              ref={playerRef}
              component={LogoAnimationComposition}
              inputProps={{ vpWidth: vp.width, vpHeight: vp.height }}
              durationInFrames={TOTAL_FRAMES}
              fps={FPS}
              compositionWidth={vp.width}
              compositionHeight={vp.height}
              style={{ width: "100%", height: "100%", display: "block" }}
              controls={false}
              loop={false}
              autoPlay={true}
              clickToPlay={false}
              spaceKeyToPlayOrPause={false}
              moveToBeginningWhenEnded={false}
              renderLoading={() => (
                <div
                  style={{ width: "100%", height: "100%", background: BRAND }}
                />
              )}
            />
          )}
        </div>
      )}

      {/* ── Phase 2: Wipe panel — BELOW the navbar (z-index 50 < navbar 100) ──
       *  Covers only the content area beneath the navbar.
       *  clip-path animates from fully visible → fully clipped left-to-right,
       *  so the real page content is unveiled pixel-by-pixel behind it.        */}
      {wiping && (
        <div
          ref={wipePanelRef}
          style={{
            position: "fixed",
            top: NAVBAR_H,    // ← sits BELOW the navbar
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 50,       // ← behind navbar (navbar is z-index 100)
            background: BRAND,
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
}
