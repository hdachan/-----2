"use client";

import { useState } from "react";

const STEPS = ["청구신청", "구비서류제출", "보상담당자지정", "지급심사", "보험금 결정 및 지급"];

const DOCUMENTS = [
  {
    group: "공통서류",
    items: [
      "보호자 신분증 사본",
      "반려동물 동물등록증 사본",
      "정부미등록견의 경우, 반려견의 전면 및 측면 사진 2장",
      "보호자 통장 사본",
      "펫보험 전용보험금 청구서",
      "보험금 청구서",
    ],
  },
  {
    group: "치료비담보(입원/통원/수술)",
    items: [
      "진단서(입·통원기간 및 진단명 포함) 등 상해/질병명을 확인할 수 있는 서류 (단, 수술 시에는 진단서 필수)",
      "동물병원 진료비 영수증(치료비 세부내역 포함)",
      "동물병원 진료기록부(수의사가 작성한 진료차트)",
      "X-Ray 등 방사선 사진을 찍은 경우 해당 사진 (촬영 날짜 및 시간 필수)",
    ],
  },
  {
    group: "배상책임",
    items: ["사고경위서"],
  },
  {
    group: "장례비",
    items: [
      "사망 사실 확인 서류(동물폐사확인서 또는 동물화장증명서, 안락사의 경우 수의사 발급 소견서 첨부)",
      "장례비용 영수증",
    ],
    note: "※ 청구서 상병명에 “사망”이라고 기재해 주세요.",
  },
];

// 청구서 공통양식 파일: public 폴더에 이 이름으로 넣으면 다운로드됨
const CLAIM_FORM_FILE = "/claim_form.pdf";

function Toggle({ id, title, open, onToggle, children }) {
  return (
    <li className={`faq-item${open ? " is-open" : ""}`}>
      <button type="button" className="faq-q" aria-expanded={open} aria-controls={id} onClick={onToggle}>
        <span className="faq-q-text">{title}</span>
        <svg className="faq-chevron" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path d="M4 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </button>
      <div className="faq-a" id={id} role="region">
        <div className="faq-a-inner">
          <div className="faq-a-body">{children}</div>
        </div>
      </div>
    </li>
  );
}

export default function ClaimInfo() {
  const [open, setOpen] = useState(null);
  const toggle = (key) => setOpen(open === key ? null : key);

  return (
    <>
      {/* 청구 절차 */}
      <ol className="claim-steps">
        {STEPS.map((s, i) => (
          <li key={s}>
            <span className="claim-step-no">{i + 1}</span>
            <span className="claim-step-label">{s}</span>
          </li>
        ))}
      </ol>

      <ul className="claim-toggles">
        <Toggle id="claim-docs" title="청구를 위한 제출서류" open={open === "docs"} onToggle={() => toggle("docs")}>
          {DOCUMENTS.map((d) => (
            <div key={d.group} className="claim-doc-group">
              <h3>[{d.group}]</h3>
              <ul>
                {d.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {d.note && <p className="claim-note">{d.note}</p>}
            </div>
          ))}
          <a className="claim-download" href={CLAIM_FORM_FILE} download>
            청구서 공통양식 다운로드
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 2v8M4.5 6.5L8 10l3.5-3.5M3 13h10" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </a>
        </Toggle>

        <Toggle id="claim-where" title="청구 접수처" open={open === "where"} onToggle={() => toggle("where")}>
          <dl className="claim-where">
            <div>
              <dt>대표 팩스 접수</dt>
              <dd>0505-181-4862</dd>
            </div>
            <div>
              <dt>메일 접수</dt>
              <dd>
                <a href="mailto:DB2017@dbins.co.kr">DB2017@dbins.co.kr</a>
              </dd>
            </div>
            <div>
              <dt>우편 접수</dt>
              <dd>
                (54966) 전라북도 전주시 완산구 서원로 99
                <br />
                전주 우체국 사서함 15호 DB손해보험 사고 접수 팀
              </dd>
            </div>
            <div>
              <dt>전화</dt>
              <dd>
                <a href="tel:1588-0100">1588-0100</a>
              </dd>
            </div>
          </dl>
          <p className="claim-note">* 진료일로부터 3년 이내 청구 가능합니다.</p>
        </Toggle>
      </ul>
    </>
  );
}
