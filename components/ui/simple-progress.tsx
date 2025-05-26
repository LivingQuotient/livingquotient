"use client";

import React from "react";

export function SimpleProgress({
  value = 0,
  className = "",
}: {
  value?: number;
  className?: string;
}) {
  return (
    <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-primary transition-all"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
} 