"use client";

import { useEffect, useRef, useState, Fragment } from "react";

const FEATURES = [
  {
    title: "12세까지 가입, 갱신 시 20세까지",
    points: ["생애주기 맞춤형으로 평생보장 가능해요."],
  },
  {
    // 제목 안 \n 은 줄바꿈으로 표시됨
    title: "입원·수술·통원 상관없이\n1사고당 7백만원 한도 내|횟수제한이 없어요.(연간 3천만원)",
    points: [
      "자부담금 3만원, 보상비율 70%",
      "가입기간 내 발생한 만성질환에 도움돼요.",
      "일한도 개념이 아닌 1사고당 7백만원 한도라 든든해요.",
    ],
  },
  {
    title: "기다림은 짧게! 상해는 가입 즉시,\n질병은 30일, 슬·고관절 관련은|90일부터 보장",
    points: ["슬개골·고관절 대기기간이 짧아 일찍 보장해 안심이 돼요."],
  },
  {
    title: "배상책임 3천만원",
    points: ["자부담금 3만원, 보상비율 100%", "혹시 모를 사고(대인·대동물)에 든든하게 보장해요."],
  },
  {
    title: "설계가 필요없는 주요특약 포함 원플랜",
    points: ["피부·구강질환 등 주요특약을 포함한 균형잡힌 보험이에요."],
  },
];

const STEP_VH = 60; // 카드 하나당 스크롤 거리 (화면 높이의 %)

// 카카오 '문화' 페이지 방식: 하나만 열림. 카드가 아래로 펼쳐진 뒤 글씨가 천천히 떠오름
// 섹션이 화면에 고정(sticky)된 동안 스크롤하면 카드가 하나씩 차례로 열림
export default function Features() {
  const [open, setOpen] = useState(0);
  const [steps, setSteps] = useState(0); // 찍힌 발자국 수
  const scrollRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      const step = (window.innerHeight * STEP_VH) / 100;
      const passed = 64 - el.getBoundingClientRect().top; // 상단바(64px) 아래에 붙은 시점부터 계산
      const idx = Math.min(FEATURES.length - 1, Math.max(0, Math.floor(passed / step)));
      setOpen(idx);
      const progress = passed / (step * FEATURES.length);
      setSteps(Math.max(0, Math.min(PAW_COUNT, Math.ceil(progress * PAW_COUNT))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // 카드를 누르면 해당 카드가 열리는 스크롤 위치로 이동
  const goTo = (i) => {
    const el = scrollRef.current;
    const step = (window.innerHeight * STEP_VH) / 100;
    const top = el.getBoundingClientRect().top + window.scrollY - 64 + i * step + 1;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      ref={scrollRef}
      className="features-scroll"
      // 마지막 카드도 한 칸만큼 머무르도록 카드 수만큼 스크롤 거리 확보
      style={{ height: `calc(100vh + ${FEATURES.length * STEP_VH}vh)` }}
    >
      <div className="features-sticky">
        <div className="container">
          <h2 className="features-title">
            왜 <em>올라펫보험</em>이어야 할까요?
          </h2>
          <div className="features-stage">
            <FeatureList open={open} onSelect={goTo} />
            <PawTrail steps={steps} />
            {/* 왼쪽 아래: 책 읽는 고양이 (원본 book_cat.png 를 800px로 줄인 웹용 사본) */}
            <img className="features-cat" src="/book_cat_web.png" alt="" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

const PAW_COUNT = 10;

// 오른쪽 발자국: 스크롤한 만큼 위에서 아래로 하나씩 찍힘 (왼발·오른발 번갈아)
function PawTrail({ steps }) {
  return (
    <div className="paw-trail" aria-hidden="true">
      {Array.from({ length: PAW_COUNT }, (_, i) => (
        <svg
          key={i}
          className={`paw${i < steps ? " is-on" : ""}`}
          style={{ "--x": i % 2 ? "22px" : "-22px", "--r": i % 2 ? "12deg" : "-12deg" }}
          width="30"
          height="30"
          viewBox="0 0 30 30"
        >
          <ellipse cx="15" cy="20" rx="7" ry="6" />
          <ellipse cx="6.5" cy="12" rx="2.8" ry="3.6" />
          <ellipse cx="12" cy="7" rx="2.8" ry="3.6" />
          <ellipse cx="18" cy="7" rx="2.8" ry="3.6" />
          <ellipse cx="23.5" cy="12" rx="2.8" ry="3.6" />
        </svg>
      ))}
    </div>
  );
}

function FeatureList({ open, onSelect }) {
  return (
    <ul className="feature-list">
      {FEATURES.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.title} className={`feature-card${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className="feature-head"
              aria-expanded={isOpen}
              aria-controls={`feature-body-${i}`}
              onClick={() => onSelect(i)}
            >
              {/* "|" 자리는 모바일에서만 줄바꿈 (PC에서는 띄어쓰기) */}
              {f.title.split("|").map((part, j) => (
                <Fragment key={j}>
                  {j > 0 && <br className="m-br" />}
                  {j > 0 && <span className="pc-space"> </span>}
                  {part}
                </Fragment>
              ))}
            </button>
            <div className="feature-body" id={`feature-body-${i}`} role="region">
              <div className="feature-body-inner">
                <ul className="feature-points">
                  {/* 카드가 다 열린 뒤(0.3초)부터 한 줄씩 글씨 등장 */}
                  {f.points.map((p, j) => (
                    <li key={p} style={{ transitionDelay: isOpen ? `${0.3 + j * 0.08}s` : "0s" }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
