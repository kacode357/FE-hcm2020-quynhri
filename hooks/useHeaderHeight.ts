// hooks/useHeaderHeight.ts
// Custom hook to measure header height at runtime
import { useLayoutEffect, useState } from "react";

export function useHeaderHeight(fallback = 96) {
  const [height, setHeight] = useState(fallback);

  useLayoutEffect(() => {
    const el = (document.getElementById("site-header") || document.querySelector("header")) as HTMLElement | null;

    const measure = () => {
      if (!el) {
        setHeight(fallback);
        return;
      }
      const rect = el.getBoundingClientRect();
      setHeight(Math.max(0, Math.ceil(rect.height)));
    };

    measure();
    const ro = el ? new ResizeObserver(measure) : null;
    ro?.observe(el as Element);
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, [fallback]);

  return height;
}