"use client";

import React, { useEffect, useRef, useState } from "react";
import { Player, PlayerRef } from "@remotion/player";
import { LogoAnimationComposition, TOTAL_FRAMES } from "./LogoAnimation";

const FPS = 60;
const BRAND = "#565F59";

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

    // Ensure element is painted at the "fully visible" start state
    el.style.transition = "none";
    el.style.clipPath = "inset(0 100% 0 0%)";

    // Double-RAF: guarantees two browser paint cycles before animating
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition =
          "clip-path 0.85s cubic-bezier(0.87, 0, 0.13, 1)";
        el.style.clipPath = "inset(0 0% 0 100%)";
      });
    });

    // Unmount after animation completes
    const timer = setTimeout(() => setDone(true), 1050);

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(timer);
    };
  }, [wiping]);

  // Frame listener + 7s fallback
  useEffect(() => {
    const player = playerRef.current;
    if (!player || !vp) return;

    const complete = () => {
      if (wiping) return;
      onComplete?.();   // reveal page + navbar immediately
      setWiping(true);  // kick off the wipe
    };

    const handleFrame = (e: { detail: { frame: number } }) => {
      if (e.detail.frame >= 248) complete();
    };

    const fallback = setTimeout(complete, 7000);
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

      {/* ── Phase 2: Wipe panel — sits UNDER the navbar (z-index 50 < navbar 100) ── *
       *  clip-path animates from fully visible → fully clipped left-to-right,         *
       *  so the real page is unveiled pixel-by-pixel behind it.                       */}
      {wiping && (
        <div
          ref={wipePanelRef}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: BRAND,
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
}
