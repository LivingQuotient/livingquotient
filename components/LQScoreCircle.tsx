"use client";
import { useState, useEffect, useRef } from "react";

export function LQScoreCircle({ score }: { score: number }) {
  const [displayScore, setDisplayScore] = useState(0);
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(score, 100));

  // Animate the number
  useEffect(() => {
    const duration = 1000;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayScore(Math.round(progress * pct));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }, [pct]);

  // Animate the circle
  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.strokeDasharray = `${circumference}`;
      circleRef.current.style.strokeDashoffset = `${circumference}`;
      setTimeout(() => {
        circleRef.current!.style.transition = "stroke-dashoffset 1s ease";
        circleRef.current!.style.strokeDashoffset = `${circumference * (1 - pct / 100)}`;
      }, 100);
    }
  }, [circumference, pct]);

  return (
    <svg width={200} height={200} className="block">
      <defs>
        <linearGradient id="lq-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>
      </defs>
      <circle
        cx={100}
        cy={100}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={16}
      />
      <circle
        ref={circleRef}
        cx={100}
        cy={100}
        r={radius}
        fill="none"
        stroke="url(#lq-gradient)"
        strokeWidth={16}
        strokeLinecap="round"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
          transition: "stroke-dashoffset 1s ease"
        }}
      />
      <text
        x={100}
        y={120}
        textAnchor="middle"
        fontSize={56}
        fontWeight={700}
        fill="#334155"
      >
        {displayScore}
      </text>
    </svg>
  );
} 