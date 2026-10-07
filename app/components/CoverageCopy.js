"use client";

import { useEffect, useRef, useState } from "react";

// 보장내용 감성 카피 (Soft Focus Reveal)
// 화면에 들어오면 한 줄씩 흐릿하게 → 선명하게 떠오르고, 마지막에 "단 하나의 마음으로" 아래 밑줄이 그어짐 (1회)
const LINES = ["함께 걷고", "함께 숨쉬는 모든 계절", "우리의 매일이 다정하도록"];

export default function CoverageCopy() {
  const ref = useRef(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setPlay(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`coverage-copy${play ? " is-play" : ""}`}>
      {LINES.map((line, i) => (
        <p key={line} style={{ "--i": i }}>
          {line}
        </p>
      ))}
      <p className="last" style={{ "--i": LINES.length }}>
        복잡한 조건을 뛰어넘어 <span className="em">단 하나의 마음으로</span>
      </p>
    </div>
  );
}
