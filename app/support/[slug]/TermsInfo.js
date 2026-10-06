"use client";

import { useState } from "react";

// 약관 파일: public 폴더에 이 이름으로 넣으면 다운로드됨
const TERMS_FILE = encodeURI("/올라펫보험(인쇄폼) _약관.pdf"); // 한글·공백·괄호가 있어 주소용으로 변환

// 법적 고지 문구: 원문을 그대로 유지 (임의 수정 금지)
const REQUIRED = [
  "모집종사자는 해당 상품에 대해 충분히 설명할 의무가 있으며, 가입자는 가입에 앞서 이에 대한 충분한 설명을 받으시기 바랍니다.",
  "보험계약 체결 전 반드시 상품 성명서 및 약관을 확인하시기 바랍니다.",
  "보험 계약자가 기존 보험계약을 해지하고, 새로운 보험계약을 체결할 경우 인수거절, 보험료 인상, 보장 내용이 달라질 수 있습니다.",
  "이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기 시 보험금)에 기타지급금을 합한 금액이 1인당 “1억원까지” (본 보험회사의 여타 보호상품과 합산) 보호됩니다. 이와 별도로 본 보험회사 보호상품의 사고보험금을 합산한 금액이 1인당 “1억원까지”보호됩니다. 다만, 보험계약자 및 보험료납부자가 법인인 보험계약의 경우에는 보호되지 않습니다.",
  "보험계약자 또는 피보험자의 고의로 인한 사고는 보상하지 않으며,이외 자세한 지급한도, 면책사항, 감액지급 사항 등 보험금을 지급 제한조건으로 반드시 약관내용을 확인하시기 바랍니다.",
  "갱신 시 보험료가 인상될 수 있습니다.갱신주기는 1년이고 최대 20세 까지 보장 가능합니다",
  "상기 내용은 작성자 개인 의견이며, 계약체결에 따른 이익 또는 손실은 보험계약자 및 피보험자에게 귀속됩니다만, 보험계약자 및 보험료납부자가 법인인 보험계약의 경우에는 보호되지 않습니다.",
];

// 링크는 { text, href } 로 표시
const NOTICES = [
  {
    title: "1. 보험계약 가입 시 유의사항",
    body: [
      "보험계약을 청약할 때는 보험상품명, 보험기간, 보험료 납입기간, 피보험자, 반려동물 등을 반드시 확인하시고, 인터넷 등을 통해 상품설명서와 보험약관을 확인해 보거나 설계사, 상담원에게 수령 후 설명을 받으시기 바랍니다. 또한 보험계약자가 기존에 체결했던 보험계약을 해지하고 다른 보험 계약을 체결할 경우 보험인수가 거절되거나 보험료가 인상되거나 보장내용이 달라질 수 있습니다.",
    ],
  },
  {
    title: "2. 보험계약의 무효",
    body: [
      "계약 체결 시 계약에서 정한 및 반려동물의 나이에 미달되었거나 초과되었을 경우에는 계약을 무효로 하며, 이미 납입한 보험료를 보험계약자에게 돌려드립니다",
    ],
  },
  {
    title: "3. 가입자의 계약전, 후알릴 사항",
    body: [
      "- 가입자의 계약 전 알릴 사항: 계약자 또는 피보험자 등은 보험계약 청약 시 가입에 필요한 내용에 대하여 반드시 사실대로 알려야 하며, 그렇지 않은 경우 계약이 해지될 수 있고, 보장이 제한될 수 있습니다.",
      "- 가입자의 계약 후 알릴 사항: 계약자 또는 피보험자는 보험계약을 맺은 후 아래의 변경이 발생한 경우에는 지체 없이 회사에 알려야 합니다.",
      "① 청약서의 기재사항을 변경하고자 할 때 또는 변경이 생겼음을 알았을 때 이 계약에서 보장하는 위험과 동일한 위험을 보장하는 계약을 다른 보험자와 체결하고자 할 약이 있음을 알았을 때",
      "② 반려동물을 양도할 때",
      "※ 위 이외에 위험이 뚜렷이 변경되거나 변경되었음을 알았을 때",
    ],
  },
  {
    title: "4. 단체보험 계약",
    body: ["본 보험계약은 주식회사 이마트를 보험계약자, 보험가입을 신청한 고객을 피보험자로 하는 단체계약입니다"],
  },
  {
    title: "5. 해약환급금 및 만기환급금",
    body: [
      "본 계약은 해약환급금은 있으나 만기환급금이 없으며, 보험계약 대출제도 이용은 불가합니다. 해약환급금은 보험계약자에게 돌려드립니다.",
    ],
  },
  {
    title: "6. 비례보상에 관한 사항",
    body: [
      "계약에서 보장하는 치료비, 배상책임 담보는 실제 손해액에 기초하여 보상하는 보장로서, 같은 위험을 보장하는 다른 계약(공제계약포함)이 있을 때에는 다른 계약이 없는 것으로 하여 각각 산출한 보상책임액의 합계액이 손해액을 초과할 때, 이 계약에 의한 보상책임액의 상기 합계액에 대한 비율에 따라 보상합니다. 반드시 계약체결 이전에 반려동물에 대한 보험 가입 여부를 확인하시기 바랍니다.",
    ],
  },
  {
    title: "7. 모집질서 확립 및 신고센터 안내",
    body: [
      "보험계약과 관련한 특별이익 제공 행위 및 보험 모집질서 문란행위는 보험업법에 의해 처벌받을 수 있습니다.",
      ["금융감독원 보험모집질서 위반행위 신고센터: 국번 없이 1332 | ", { text: "www.fss.or.kr", href: "https://www.fss.or.kr" }],
    ],
  },
  {
    title: "8. 상담 및 보험분쟁조정 안내",
    body: [
      "가입한 보험에 관하여 상담이 필요하거나 불만사항이 있을 때에는 먼저 저희 회사로 연락 주시면 신속히 해결하겠습니다.",
      ["전화번호: 1588-0100 | ", { text: "www.idbins.com", href: "https://www.idbins.com" }, " (고객센터 - 전자민원 접수)"],
    ],
  },
  {
    title: "9. 금융감독원 보험범죄 안내",
    body: [
      "보험범죄는 보험사기방지법 특별법 제8조(보험사기)에 의거하여 10년 이하의 징역이나 5천만원 이하의 벌금에 처해지며 보험범죄를 교사한 경우에도 동일한 처벌을 받을 수 있습니다.",
      ["전화번호: 1588-3311 | ", { text: "www.fss.or.kr", href: "https://www.fss.or.kr" }, " (인터넷보험범죄신고)"],
    ],
  },
  {
    title: "10. 가입 시 알아두실 사항 및 금융소비자보호법 관련 안내",
    body: [
      "주식회사 이마트 대리점은 해당 상품에 대한 충분히 설명할 의무가 있으며, 가입자는 가입에 앞서 이에 대한 충분한 설명을 받으시기 바랍니다. 주식회사 이마트 대리점은 DB손해보험사와 전속계약을 체결한 보험대리점입니다.",
      "주식회사 이마트 대리점은 보험사로부터 보험계약체결권을 부여받지 아니한 금융상품판매 대리/중개업자임을 알려드립니다. 당사는 해당 상품에 대해 충분히 설명할 의무가 있으며, 가입자는 가입에 앞서 이에 대한 충분한 설명을 받으시기 바랍니다.",
    ],
  },
];

// 예금자보호안내문 (예금보험공사 보호금융상품 표시와 함께)
const DEPOSIT_PROTECTION =
  "이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기 시 보험금)에 기타 지급금을 합한 금액이 1인당 '1억원까지' (본 보험회사의 여타 보호상품과 합산) 보호됩니다. 이와 별도로 본 보험회사 보호상품의 사고보험금을 합산한 금액이 1인당 1억원까지' 보호됩니다. 다만, 보험계약자 및 보험료납부자가 법인인 보험계약의 경우에는 보호되지 않습니다.";

function Line({ line }) {
  if (typeof line === "string") return <p>{line}</p>;
  return (
    <p>
      {line.map((part, i) =>
        typeof part === "string" ? (
          part
        ) : (
          <a key={i} href={part.href} target="_blank" rel="noopener noreferrer">
            {part.text}
          </a>
        )
      )}
    </p>
  );
}

export default function TermsInfo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 약관: 누르면 다운로드 버튼 */}
      <ul className="claim-toggles terms-toggle">
        <li className={`faq-item${open ? " is-open" : ""}`}>
          <button type="button" className="faq-q" aria-expanded={open} aria-controls="terms-body" onClick={() => setOpen(!open)}>
            <span className="faq-q-text">올라!펫보험 약관</span>
            <svg className="faq-chevron" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M4 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
          <div className="faq-a" id="terms-body" role="region">
            <div className="faq-a-inner">
              <div className="faq-a-body">
                <p>보험계약 체결 전 반드시 약관을 확인하시기 바랍니다.</p>
                <a className="claim-download" href={TERMS_FILE} download="올라펫보험_약관.pdf">
                  약관 다운로드
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M8 2v8M4.5 6.5L8 10l3.5-3.5M3 13h10" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}

// 필수안내사항 페이지 (고객센터 > 필수안내사항): 항상 펼쳐서 표시
export function RequiredNotices() {
  return (
    <section className="terms-notice">
      <h3>필수안내사항</h3>
      <ul className="terms-required">
        {REQUIRED.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <h3>올라!펫보험 계약 및 금융소비자보호법 관련 고지사항</h3>
      <div className="terms-list">
        {NOTICES.map((n) => (
          <div key={n.title} className="terms-item">
            <h4>{n.title}</h4>
            {n.body.map((line, i) => (
              <Line key={i} line={line} />
            ))}
          </div>
        ))}
      </div>

      <h3>예금자보호안내문</h3>
      <div className="deposit-protect">
        <img src="/protect.png" alt="예금보험공사 보호금융상품 1인당 최고 1억원" />
        <p>{DEPOSIT_PROTECTION}</p>
      </div>
    </section>
  );
}
