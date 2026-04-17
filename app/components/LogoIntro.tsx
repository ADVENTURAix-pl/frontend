"use client";

import React, { useEffect, useRef, useState } from "react";
import { Player, PlayerRef } from "@remotion/player";
import { LogoAnimationComposition, TOTAL_FRAMES } from "./LogoAnimation";

const FPS = 60;
const BRAND = "#565F59";

// Universal fallback to prevent any flash before the Player mounts or during loading.
const solidBrand = (
  <div style={{ width: "100%", height: "100%", background: BRAND }} />
);

export function LogoIntro({ onComplete }: { onComplete?: () => void }) {
  const playerRef = useRef<PlayerRef>(null);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);
  const [vp, setVp] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    setVp({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !vp) return;

    // Start reveal sequence: when the video hits its final frame (or near it),
    // we start fading out the video overlay to reveal the real site behind it.
    const handleFrame = (e: { detail: { frame: number } }) => {
      // NAV_END is 248. We start the fade slightly earlier or exactly at the end
      // to overlap with the static site's appearance.
      if (e.detail.frame >= 248 && !fading) {
        setFading(true);
        // Inform parent immediately that we are done, so the website is visible 
        // behind the fading overlay.
        onComplete?.();
        // Finally unmount the intro once it's fully transparent.
        setTimeout(() => setDone(true), 500);
      }
    };

    player.addEventListener("frameupdate", handleFrame as any);
    return () => player.removeEventListener("frameupdate", handleFrame as any);
  }, [onComplete, vp, fading]);

  if (done) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      width: "100dvw",
      height: "100dvh",
      background: BRAND,
      opacity: fading ? 0 : 1,
      transition: "opacity 0.5s ease-out",
      pointerEvents: fading ? "none" : "auto",
    }}>
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
          renderLoading={() => solidBrand}
        />
      )}
    </div>
  );
}

