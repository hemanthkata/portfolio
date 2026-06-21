"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function CountUp({ value, className }) {
  const m = String(value).match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const pre = m ? m[1] : "";
  const num = m ? parseFloat(m[2]) : 0;
  const suf = m ? m[3] : String(value);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const dur = 1300;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(num * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num]);

  const display = Number.isInteger(num) ? Math.round(n) : n.toFixed(1);

  return (
    <span ref={ref} className={className}>
      {pre}
      {display}
      {suf}
    </span>
  );
}
