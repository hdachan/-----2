"use client";
// @refresh reset  (코드 수정 시 조정기 상태를 유지하지 않고 새로 시작 → 이전 값이 남지 않음)

import { useCallback, useEffect, useState } from "react";

// 개발용 위치 조정기 (npm run dev 에서만 보임, 빌드 결과물에는 포함되지 않음)
// 가로/세로 = 원래 자리에서 옮길 거리(px), 너비/높이/글자 크기 = px (비우면 원래 크기)

const TARGETS = [
  { key: "eyebrow", label: "이마트 몰리스 × DB손해보험", selector: ".hero-eyebrow" },
  { key: "logo", label: "올라!펫보험 (로고)", selector: ".hero-card-logo img", image: true }, // 그림(svg)이라 "글자 크기" = 로고 높이
  { key: "tagline", label: "O Lovely Animal!", selector: ".hero-tagline" },
  { key: "headline", label: "새로운 반려생활에 타세요.", selector: ".hero-headline" },
  { key: "sub", label: "특약포함 설계가 필요없는 원플랜", selector: ".hero-sub" },
  { key: "btn", label: "보험료 조회 및 가입 (버튼)", selector: ".btn-wrap .btn" },
];

const FIELDS = [
  { key: "x", label: "가로 이동" },
  { key: "y", label: "세로 이동" },
  { key: "w", label: "너비" },
  { key: "h", label: "높이" },
  { key: "fs", label: "글자 크기" },
];

// 화면 구분: 값은 화면마다 따로 저장되고, 지금 화면 폭에 해당하는 값만 적용됨
const DEVICES = [
  { key: "pc", label: "PC", note: "1025px 이상" },
  { key: "tablet", label: "태블릿", note: "769~1024px" },
  { key: "mobile", label: "모바일", note: "768px 이하" },
];
const deviceOf = (w) => (w <= 768 ? "mobile" : w <= 1024 ? "tablet" : "pc");
const labelOf = (key) => DEVICES.find((d) => d.key === key).label;

// 값을 기본값으로 코드에 반영할 때마다 버전을 올려서 조정기를 0으로 되돌림
const STORAGE_KEY = "ola-dev-tuner-v8";
const EMPTY = { x: "", y: "", w: "", h: "", fs: "" };

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
    el.style.minWidth = v.w !== "" ? "0" : ""; // 버튼처럼 최소 너비가 있는 요소도 줄어들게
    el.style.marginInline = v.w !== "" ? "auto" : ""; // 너비를 줄여도 가운데 정렬 유지
    if (t.image) {
      // 로고(svg 그림): 글자 크기 칸 = 로고 높이 (가로는 비율대로 자동) → 글자가 함께 커지고 작아짐
      const hh = v.fs !== "" ? v.fs : v.h;
      el.style.height = hh !== "" ? `${hh}px` : "";
      if (v.fs !== "" && v.w === "") el.style.width = "auto";
    } else {
      el.style.height = v.h !== "" ? `${v.h}px` : "";
      el.style.fontSize = v.fs !== "" ? `${v.fs}px` : "";
    }
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
    fs: el.tagName === "IMG" ? Math.round(r.height) : Math.round(parseFloat(getComputedStyle(el).fontSize)),
    vw: window.innerWidth,
  };
}

export default function DevTuner() {
  const [open, setOpen] = useState(true);
  const [target, setTarget] = useState(TARGETS[0].key);
  const [all, setAll] = useState({}); // { pc: {...}, tablet: {...}, mobile: {...} }
  const [screenDevice, setScreenDevice] = useState("pc"); // 지금 화면 폭으로 정해지는 구분
  const [device, setDevice] = useState("pc"); // 편집 중인 구분 (화면 폭이 바뀌면 자동으로 따라감)
  const [rect, setRect] = useState(null);
  const [copied, setCopied] = useState(false);

  const values = all[device] || {};
  const setValues = (fn) => setAll((prev) => ({ ...prev, [device]: fn(prev[device] || {}) }));

  const current = TARGETS.find((t) => t.key === target);
  const v = { ...EMPTY, ...values[target] };

  // 저장된 값 불러오기 + 화면 폭으로 구분 정하기
  useEffect(() => {
    setAll(loadSaved());
    const onResize = () => {
      const d = deviceOf(window.innerWidth);
      setScreenDevice(d);
      setDevice(d);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 지금 화면 구분의 값만 화면에 적용 + 전체 저장
  useEffect(() => {
    apply(all[screenDevice] || {});
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch {}
  }, [all, screenDevice]);

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
  }, [refresh, all]);

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
  const resetAll = () => setValues(() => ({}));

  // 바뀐 값만 정리해서 복사 (그대로 채팅에 붙여넣으면 됨) — 어느 화면용인지 맨 위에 표시
  const lines = TARGETS.map((t) => {
    const tv = { ...EMPTY, ...values[t.key] };
    const parts = FIELDS.filter((f) => tv[f.key] !== "" && tv[f.key] !== "-").map((f) => `${f.label} ${tv[f.key]}px`);
    return parts.length ? `${t.label}: ${parts.join(", ")}` : null;
  }).filter(Boolean);
  const summary = lines.length ? [`[${labelOf(device)} 버전]`, ...lines].join("\n") : "";

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

      {/* 화면 구분: PC / 태블릿 / 모바일 값이 따로 저장됨 */}
      <div className="tuner-devices" role="tablist" aria-label="화면 구분">
        {DEVICES.map((d) => (
          <button
            key={d.key}
            type="button"
            role="tab"
            aria-selected={device === d.key}
            className={device === d.key ? "is-on" : undefined}
            onClick={() => setDevice(d.key)}
          >
            {d.label}
            <small>{d.note}</small>
          </button>
        ))}
      </div>
      {device !== screenDevice && (
        <p className="tuner-warn">
          지금 화면은 {labelOf(screenDevice)} 크기라서 {labelOf(device)} 값은 화면에 보이지 않아요. 화면 폭을 바꿔서 확인하세요.
        </p>
      )}

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
            <span>{f.key === "fs" && current.image ? "로고 크기(높이)" : f.label}</span>
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
          <div><dt>글자</dt><dd>{rect.fs}px</dd></div>
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
