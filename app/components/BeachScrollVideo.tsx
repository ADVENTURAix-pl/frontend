"use client";

import React, { useEffect, useRef } from "react";
import { useLenis } from "../providers/LenisProvider";
import { useLocale } from "../providers/LocaleProvider";

const FRAME_COUNT = 150;
const PX_PER_FRAME = 14;

function frameSrc(n: number) {
  return `/Beach-frames/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;
}

export function BeachScrollVideo() {
  const lenis = useLenis();
  const { t } = useLocale();

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const currentIdxRef = useRef(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>(
    Array.from({ length: FRAME_COUNT }, () => false)
  );

  // Swipe / drag-to-scrub state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startProgressRef = useRef(0);
  const swipeDistanceRef = useRef(300);

  // Preload all frames
  useEffect(() => {
    imagesRef.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = frameSrc(i + 1);
      img.onload = () => { loadedRef.current[i] = true; };
      return img;
    });
  }, []);

  // Update the displayed frame (pure DOM, no re-render)
  function showFrame(idx: number) {
    const img = imgRef.current;
    if (!img) return;
    const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, idx));

    let target = clamped;
    if (!loadedRef.current[target]) {
      for (let d = 1; d < 25; d++) {
        const prev = clamped - d;
        if (prev >= 0 && loadedRef.current[prev]) { target = prev; break; }
      }
    }
    if (loadedRef.current[target] && target !== currentIdxRef.current) {
      currentIdxRef.current = target;
      img.src = imagesRef.current[target].src;
    }

    // Progress UI
    const pct = (clamped / (FRAME_COUNT - 1)) * 100;
    if (progressBarRef.current) progressBarRef.current.style.width = `${pct}%`;
  }

  // Scroll-driven frame updates — listen to both native scroll AND lenis for reliability
  useEffect(() => {
    const updateFrame = (scrollY: number) => {
      const container = containerRef.current;
      if (!container) return;
      // Stable absolute top: bbox.top shifts as we scroll, adding scrollY keeps it constant
      const absTop = container.getBoundingClientRect().top + scrollY;
      const scrollable = container.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      // Calculate progress based on scroll position relative to container
      const progress = Math.max(0, Math.min(1, (scrollY - absTop) / scrollable));
      showFrame(Math.round(progress * (FRAME_COUNT - 1)));
    };

    // Native scroll always active (covers pre-lenis init and fallback)
    const nativeHandler = () => updateFrame(window.scrollY);
    window.addEventListener("scroll", nativeHandler, { passive: true });

    // Lenis scroll for pixel-perfect smooth tracking when lenis is ready
    let lenisOff: (() => void) | undefined;
    if (lenis) {
      const lenisHandler = ({ scroll }: { scroll: number }) => updateFrame(scroll);
      lenis.on("scroll", lenisHandler);
      lenisOff = () => lenis.off("scroll", lenisHandler);
    }
    
    // Initial call
    updateFrame(window.scrollY);

    return () => {
      window.removeEventListener("scroll", nativeHandler);
      lenisOff?.();
    };
  }, [lenis]); // eslint-disable-line react-hooks/exhaustive-deps

  const sectionH = `calc(100dvh + ${FRAME_COUNT * PX_PER_FRAME}px)`;

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startProgressRef.current = currentIdxRef.current / (FRAME_COUNT - 1);
    swipeDistanceRef.current = Math.max(200, window.innerWidth * 0.5);
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    if (cardRef.current) cardRef.current.style.cursor = "grabbing";
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    let p = startProgressRef.current + dx / swipeDistanceRef.current;
    p = Math.max(0, Math.min(1, p));
    showFrame(Math.round(p * (FRAME_COUNT - 1)));
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    (e.currentTarget as HTMLDivElement).releasePointerCapture?.(e.pointerId);
    if (cardRef.current) cardRef.current.style.cursor = "grab";
  }

  return (
    <div
      ref={containerRef}
      className="beach-section"
      style={{
        height: sectionH,
        position: "relative",
        background: "#F3F4F2",
        boxSizing: "border-box",
        marginTop: 64,
        marginBottom: 64,
      }}
    >
      {/* Sticky toast-bread card */}
      <div
        ref={cardRef}
        className="beach-card"
        style={{
          position: "sticky",
          top: 0,
          height: "100dvh",
          overflow: "hidden",
          boxShadow: "0 12px 60px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12)",
          willChange: "transform",
          touchAction: "none",
          userSelect: "none",
          cursor: "grab",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Beach frame */}
        <img
          ref={imgRef}
          src={frameSrc(1)}
          alt=""
          aria-hidden
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            userSelect: "none",
            imageRendering: "high-quality" as React.CSSProperties["imageRendering"],
          }}
        />

        {/* Gradient + headline */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 30%, transparent 52%, rgba(0,0,0,0.6) 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0 clamp(28px, 5vw, 64px) clamp(48px, 7vh, 64px)",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              display: "block",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.6875rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 12,
              fontWeight: 400,
            }}
          >
            {t.beach.scroll}
          </span>
          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 200,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              margin: 0,
              whiteSpace: "pre-line",
            }}
          >
            {t.beach.heading}
          </h2>
        </div>

        {/* Progress bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "rgba(255,255,255,0.12)",
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              height: "100%",
              width: "0%",
              background: "rgba(255,255,255,0.7)",
              transition: "width 0.06s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
