import React from "react";

interface AdventuraLogoProps {
  color?: string;
  starSize?: number;
  showText?: boolean;
  textSize?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function StarMark({
  color = "#565F59",
  size = 60,
  style,
}: {
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      {/* rotate -12° around center to match brand logo orientation */}
      <g transform="rotate(-12, 50, 50)">
        <path
          d="M 50,2 C 53,28 72,47 98,50 C 72,53 53,72 50,98 C 47,72 28,53 2,50 C 28,47 47,28 50,2 Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

export function AdventuraLogo({
  color = "#565F59",
  starSize = 60,
  showText = true,
  textSize = 36,
  className,
  style,
}: AdventuraLogoProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: starSize * 0.25,
        ...style,
      }}
    >
      <StarMark color={color} size={starSize} />
      {showText && (
        <span
          style={{
            fontSize: textSize,
            fontWeight: 400,
            color,
            letterSpacing: "-0.02em",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            lineHeight: 1,
          }}
        >
          ADVENTURAix
        </span>
      )}
    </div>
  );
}
