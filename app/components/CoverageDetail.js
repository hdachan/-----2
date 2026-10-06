"use client";

import { useState } from "react";

// 보장내용 섹션 하단: 보상 예시(표 2개) + 보상하는 손해 / 보상하지 않는 손해
// 보험 안내 문구라 원문(상품 안내 이미지)을 그대로 옮김

const EXAMPLES = [
  {
    label: "사례 1",
    desc: "반려동물이 하나의 질병(또는 상해)으로 인해 동물병원에서 치료를 받아 총 103만원의 치료비를 부담한 경우",
    cost: "1,030,000원",
    calc: ["(1,030,000 - 30,000) × 70% =", "700,000원"],
    applied: "700,000원",
    paid: "700,000원",
    rows: ["통원 (1일)", "입원 (3일)", "수술 (1회)"],
  },
  {
    label: "사례 2",
    desc: "반려동물이 하나의 질병(또는 상해)으로 인해 동물병원에서 치료를 받아 총 1,500만원의 치료비를 부담한 경우",
    cost: "15,000,000원",
    calc: ["(15,000,000 - 30,000) × 70% =", "10,479,000원 > 7,000,000원", "∴ 최종 지급 보험금 : 7,000,000원"],
    applied: "7,000,000원",
    paid: "7,000,000원",
    rows: ["통원 (2일)", "입원 (5일)", "수술 (1회)"],
  },
];

const COVERED = [
  {
    name: ["상해 및", "질병치료비"],
    sub: "(피부병, 구강질환, 슬·고관절 탈구 확장)",
    items: [
      <>
        반려동물에게 상해 또는 질병이 발생하여 그 치료를 직접적인 목적으로 국내에서 수의사에게 치료를 받은 때에
        3천만원 한도 내 아래와 같이 보상합니다. (자기부담금: 1사고당 3만원)
        <span className="cv-sub">- 1 사고당 치료비 : 7백만원 한도</span>
        <span className="cv-sub">- 총 보상한도 : 3천만원</span>
      </>,
      <>보상방법[(피보험자가 부담한 치료비 - 적용 자기부담금) X 70%]과 &apos;적용 지급액 한도액&apos; 중 적은 금액</>,
      <>
        <strong className="cv-strong">자기부담금의 경우</strong>
        입원, 통원 및 수술치료 포함 1 사고당 3만원을 1 사고당 치료비에서 차감합니다.
      </>,
      <>
        치료를 받던 중 보험기간이 만료된 경우에도 만료일로부터 180일 이내의 치료비는 보상합니다. 단, 사고일 또는
        발병일부터 365일 이내의 치료인 경우에 한합니다.
      </>,
    ],
  },
  {
    name: ["반려동물 배상", "책임(대인·대동물)"],
    items: [
      <>
        반려동물의 행위에 기인하는 우연한 사고로 인하여 타인의 신체장해(상해, 질병 및 그로 인한 사망) 및 타인 소유의
        반려동물에 손해를 입혀 법률상 배상책임을 부담함으로써 입은 손해를 3천만원 한도 내에서 보상합니다.
        (자기부담금 3만원)
      </>,
    ],
  },
  {
    name: ["반려동물", "사망시 위로금"],
    items: [
      <>
        반려동물이 보험기간 내에 사망한 경우 30만원을 보험금으로 지급하여 드립니다. 단, 보험개시일로부터 그날을
        포함하여 30일 이내에 사망한 경우에는 보상하여 드리지 않습니다.
      </>,
    ],
  },
];

const NOT_COVERED = [
  "대한민국 이외의 지역에서 발생한 사고 및 손해",
  "반려동물을 범죄행위, 경주, 수색, 폭약 탐지, 구조, 투견, 실험 및 이와 유사한 목적으로 이용함으로써 발생한 손해",
  "상병명을 알 수 없는 상해 또는 질병에 대한 치료 및 최초 계약의 보험 개시일 이전에 이미 감염 또는 발병한 질병 및 상해에 대한 치료",
  "대상 반려동물의 정상적인 임신·출산, 제왕절개, 인공유산과 관련된 비용 및 출산 후 증상 치료 비용",
  "중성화, 불임 및 피임을 목적으로 한 수술 및 처치에 따른 비용",
  "손톱 절제(며느리발톱 제거 포함), 유치 잔존, 잠복고환, 제대헤르니아(배꼽부위 탈장), 항문낭 제거 등 건강 동물에 실시하는 외과수술 및 기타 검사 또는 점안, 귀 청소 등의 관리 비용",
  "한의학(단, 침구는 제외합니다), 인도의학, 허브 요법, 아로마테라피 등의 대체의료",
  "귀 성형, 꼬리 성형, 성대 제거 등 미용성형을 위한 수술 및 처치에 따른 비용",
  "안락사 비용, 시체 처치 및 해부검사, 장례비, 이장비 등 사후에 필요한 비용",
  "최초 계약의 보험 개시일 이전에 이미 감염 또는 발병한 질병 및 상해",
  "보험 개시일로부터 그날을 포함하여 30일 이내에 발생한 질병. 단, 이 계약이 갱신계약인 경우에는 적용하지 않습니다. (단, 슬관절 탈구, 고관절 탈구, 슬관절 형성부전, 고관절 형성부전 또는 기타 이들과 유사한 질병 또는 상해의 경우 보험 개시일로부터 그날을 포함하여 90일 이내에 발생한 상해 또는 질병에 대해 보상하여 드리지 않습니다.)",
];

function ExampleTable({ ex }) {
  return (
    <div className="cv-example">
      <p className="cv-case">
{ex.desc}
      </p>
      <div className="cv-table-wrap">
        <table className="cv-table">
          <thead>
            <tr>
              <th>구분</th>
              <th>1사고당 보상한도</th>
              <th>실제치료비</th>
              <th>1사고당 공제금액</th>
              <th>보상비율</th>
              <th>
                적용후 <small>(공제금액 및 보상비율)</small>
              </th>
              <th className="cv-final">최종 지급 보험금</th>
            </tr>
          </thead>
          <tbody>
            {ex.rows.map((r, i) => (
              <tr key={r}>
                <td>{r}</td>
                {i === 0 && (
                  <>
                    <td rowSpan={3}>7,000,000원</td>
                    <td rowSpan={3}>{ex.cost}</td>
                    <td rowSpan={3}>3만원</td>
                    <td rowSpan={3}>70%</td>
                    <td rowSpan={3}>
                      {ex.calc.map((c) => (
                        <span key={c} className="cv-line">
                          {c}
                        </span>
                      ))}
                    </td>
                    <td rowSpan={3} className="cv-final">
                      {ex.paid}
                    </td>
                  </>
                )}
              </tr>
            ))}
            <tr className="cv-total">
              <td>계</td>
              <td>7,000,000원</td>
              <td>{ex.cost}</td>
              <td>3만원</td>
              <td>70%</td>
              <td>{ex.applied}</td>
              <td className="cv-final">{ex.paid}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 펼침 목록 한 줄: 제목 + 오른쪽 +/− 버튼
function Dropdown({ id, title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`cv-drop${open ? " is-open" : ""}`}>
      <button type="button" className="cv-drop-head" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        <span className="cv-drop-title">{title}</span>
        <span className="cv-drop-toggle" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path className="cv-drop-vert" d="M7 2v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div className="cv-drop-body" id={id} role="region">
        <div className="cv-drop-inner">
          <div className="cv-drop-content">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function CoverageDetail() {
  const [tab, setTab] = useState(0);
  return (
    <div className="cv">
      {/* 보상 예시 / 보상하는 손해 / 보상하지 않는 손해: 누르면 펼쳐지는 드롭다운 (분홍 톤) */}
      <div className="cv-drops">
        <Dropdown id="cv-example" title="보상 예시">
          {/* 사례 1·2 를 탭으로 전환 → 표를 하나만 보여 섹션 길이를 줄임 */}
          <div className="cv-tabs" role="tablist" aria-label="보상 예시">
            {EXAMPLES.map((ex, i) => (
              <button
                key={ex.label}
                type="button"
                role="tab"
                aria-selected={tab === i}
                className={tab === i ? "is-active" : undefined}
                onClick={() => setTab(i)}
              >
                {ex.label}
              </button>
            ))}
          </div>
          <ExampleTable ex={EXAMPLES[tab]} />
        </Dropdown>

        <Dropdown id="cv-covered" title="보상하는 손해">
          <table className="cv-covered">
            <thead>
              <tr>
                <th>보장담보(특약)</th>
                <th>보상하는 손해</th>
              </tr>
            </thead>
            <tbody>
              {COVERED.map((c) => (
                <tr key={c.name.join("")}>
                  <th scope="row">
                    {c.name.map((n) => (
                      <span key={n} className="cv-line">
                        {n}
                      </span>
                    ))}
                    {c.sub && <small>{c.sub}</small>}
                  </th>
                  <td>
                    <ul>
                      {c.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="cv-foot">※ 자세한 내용은 약관을 참고하시기 바랍니다.</p>
        </Dropdown>

        <Dropdown id="cv-not" title="보상하지 않는 손해">
          <ol className="cv-not">
            {NOT_COVERED.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
          <p className="cv-foot">※ 자세한 내용은 약관을 참고하시기 바랍니다.</p>
        </Dropdown>
      </div>
    </div>
  );
}
