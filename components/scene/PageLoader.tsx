// components/scene/PageLoader.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";

type Props = {
  canvasReady: boolean;
  hideDelayMs?: number;
  antiFreezeMs?: number;
};

// Local constants
const LOADER = {
  hideDelayMs: 400,
  antiFreezeMs: 6000,
};

export default function PageLoader({
  canvasReady,
  hideDelayMs = LOADER.hideDelayMs,
  antiFreezeMs = LOADER.antiFreezeMs,
}: Props) {
  const { active, progress } = useProgress();
  const [visible, setVisible] = useState(true);
  const [pct, setPct] = useState(0);
  const lastPctRef = useRef(0);
  const lastChangeAtRef = useRef<number>(Date.now());

  useEffect(() => {
    const val = Math.max(0, Math.min(100, Math.round(progress)));
    setPct(val);
    if (val !== lastPctRef.current) {
      lastPctRef.current = val;
      lastChangeAtRef.current = Date.now();
    }
  }, [progress]);

  useEffect(() => {
    if (!canvasReady) return;
    if (!active || pct >= 99) {
      const t = setTimeout(() => setVisible(false), hideDelayMs);
      return () => clearTimeout(t);
    }
  }, [canvasReady, active, pct, hideDelayMs]);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      const idle = Date.now() - lastChangeAtRef.current;
      if (canvasReady && pct >= 70 && idle > antiFreezeMs) {
        setVisible(false);
      }
    }, 500);
    return () => clearInterval(id);
  }, [visible, canvasReady, pct, antiFreezeMs]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 backdrop-blur-sm">
      <div className="w-[280px] max-w-[80%]">
        <div className="h-1.5 bg-white/15 rounded overflow-hidden">
          <div
            className="h-1.5 bg-white/90 rounded transition-[width] duration-200"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-3 text-center text-sm text-white/85">{pct}%</p>
      </div>
    </div>
  );
}