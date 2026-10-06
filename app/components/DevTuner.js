"use client";
// @refresh reset  (코드 수정 시 조정기 상태를 유지하지 않고 새로 시작 → 이전 값이 남지 않음)

import { useCallback, useEffect, useState } from "react";

// 개발용 위치 조정기 (npm run dev 에서만 보임, 빌드 결과물에는 포함되지 않음)
// 가로/세로 = 원래 자리에서 옮길 거리(px), 너비/높이 = 요소 크기(px, 비우면 원래 크기)

const TARGETS = [
  { key: "eyebrow", label: "이마트 몰리스 × DB손해보험", selector: ".hero-eyebrow" },
  { key: "logo", label: "올라!펫보험 (로고)", selector: ".hero-card-logo img" },
  { key: "tagline", label: "O Lovely Animal!", selector: ".hero-tagline" },
  { key: "headline", label: "새로운 반려생활에 타세요.", selector: ".hero-headline" },
  { key: "sub", label: "특약포함 설계가 필요없는 원플랜", selector: ".hero-sub" },
];

const FIELDS = [
  { key: "x", label: "가로 이동" },
  { key: "y", label: "세로 이동" },
  { key: "w", label: "너비" },
  { key: "h", label: "높이" },
];

// 값을 기본값으로 코드에 반영할 때마다 버전을 올려서 조정기를 0으로 되돌림
const STORAGE_KEY = "ola-dev-tuner-v5";
const EMPTY = { x: "", y: "", w: "", h: "" };

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function apply(values) {
  for (const t of TARGETS) {
    const el = document.querySelector(t.selector);
    if (!el) continue;
    const v = { ...EMPTY, ...values[t.key] };
    // translate 속성을 써서 기존 transform 애니메이션과 겹치지 않게 함
    el.style.translate = v.x !== "" || v.y !== "" ? `${Number(v.x) || 0}px ${Number(v.y) || 0}px` : "";
    el.style.width = v.w !== "" ? `${v.w}px` : "";
    el.style.marginInline = v.w !== "" ? "auto" : ""; // 너비를 줄여도 가운데 정렬 유지
    el.style.height = v.h !== "" ? `${v.h}px` : "";
  }
}

function measure(selector) {
  const el = document.querySelector(selector);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return {
    left: Math.round(r.left + window.scrollX),
    top: Math.round(r.top + window.scrollY),
    width: Math.round(r.width),
    height: Math.round(r.height),
    vw: window.innerWidth,
  };
}

export default function DevTuner() {
  const [open, setOpen] = useState(true);
  const [target, setTarget] = useState(TARGETS[0].key);
  const [values, setValues] = useState({});
  const [rect, setRect] = useState(null);
  const [copied, setCopied] = useState(false);

  const current = TARGETS.find((t) => t.key === target);
  const v = { ...EMPTY, ...values[target] };

  // 저장된 값 불러와 적용
  useEffect(() => {
    const saved = loadSaved();
    setValues(saved);
    apply(saved);
  }, []);

  // 값이 바뀌면 화면에 적용 + 저장
  useEffect(() => {
    apply(values);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {}
  }, [values]);

  // 선택한 요소의 실제 위치·크기(px)를 계속 표시
  const refresh = useCallback(() => setRect(measure(current.selector)), [current.selector]);
  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 300);
    window.addEventListener("scroll", refresh, { passive: true });
    window.addEventListener("resize", refresh);
    return () => {
      clearInterval(id);
      window.removeEventListener("scroll", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, [refresh, values]);

  // 선택한 요소에 점선 테두리 표시 (조정기를 닫으면 숨김)
  useEffect(() => {
    const el = document.querySelector(current.selector);
    if (!el || !open) return;
    el.style.outline = "2px dashed #ec6c1f";
    el.style.outlineOffset = "2px";
    return () => {
      el.style.outline = "";
      el.style.outlineOffset = "";
    };
  }, [current.selector, open]);

  const setField = (key, raw) => {
    const val = raw === "" || raw === "-" ? raw : String(Number(raw));
    setValues((prev) => ({ ...prev, [target]: { ...EMPTY, ...prev[target], [key]: val } }));
  };

  const resetTarget = () => setValues((prev) => ({ ...prev, [target]: { ...EMPTY } }));
  const resetAll = () => setValues({});

  // 바뀐 값만 정리해서 복사 (그대로 채팅에 붙여넣으면 됨)
  const summary = TARGETS.map((t) => {
    const tv = { ...EMPTY, ...values[t.key] };
    const parts = FIELDS.filter((f) => tv[f.key] !== "" && tv[f.key] !== "-").map((f) => `${f.label} ${tv[f.key]}px`);
    return parts.length ? `${t.label}: ${parts.join(", ")}` : null;
  })
    .filter(Boolean)
    .join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary || "변경 없음");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  if (!open) {
    return (
      <button type="button" className="tuner-fab" onClick={() => setOpen(true)}>
        위치 조정
      </button>
    );
  }

  return (
    <div className="tuner" role="dialog" aria-label="위치 조정기">
      <div className="tuner-head">
        <strong>위치 조정기</strong>
        <button type="button" onClick={() => setOpen(false)} aria-label="닫기">
          ✕
        </button>
      </div>

      <label className="tuner-row">
        <span>대상</span>
        <select value={target} onChange={(e) => setTarget(e.target.value)}>
          {TARGETS.map((t) => (
            <option key={t.key} value={t.key}>
              {t.label}
            </option>
          ))}
        </select>
      </label>

      <div className="tuner-grid">
        {FIELDS.map((f) => (
          <label key={f.key} className="tuner-field">
            <span>{f.label}</span>
            <div className="tuner-input">
              <input
                type="number"
                step="1"
                value={v[f.key]}
                placeholder={f.key === "x" || f.key === "y" ? "0" : "자동"}
                onChange={(e) => setField(f.key, e.target.value)}
              />
              <em>px</em>
            </div>
          </label>
        ))}
      </div>

      {rect && (
        <dl className="tuner-readout">
          <div><dt>왼쪽</dt><dd>{rect.left}px</dd></div>
          <div><dt>위쪽</dt><dd>{rect.top}px</dd></div>
          <div><dt>너비</dt><dd>{rect.width}px</dd></div>
          <div><dt>높이</dt><dd>{rect.height}px</dd></div>
        </dl>
      )}
      <p className="tuner-note">현재 위치는 페이지 맨 위·왼쪽 기준이에요. {rect && `화면 폭: ${rect.vw}px`}</p>

      <div className="tuner-actions">
        <button type="button" onClick={resetTarget}>이 요소 초기화</button>
        <button type="button" onClick={resetAll}>전체 초기화</button>
        <button type="button" className="primary" onClick={copy}>{copied ? "복사됨!" : "값 복사"}</button>
      </div>
    </div>
  );
}
