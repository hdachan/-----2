"use client";

// 오른쪽 아래 고정 버튼: 보험료 조회 및 가입 사이트로 이동 (모든 페이지)
export const JOIN_URL = "https://cdsm.mdbins.com:8485/dsm/dvcphone/zcommon/b/DSMPZBAE400UM00.do?brth=2068650913";

export default function FloatingCta() {
  return (
    <a
      className="floating-cta"
      href={JOIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="보험료 조회 및 가입"
      title="보험료 조회 및 가입"
      onTouchStart={() => {}} // 아이폰 사파리에서 누르는 동안(:active) 효과가 작동하도록
    >
      {/* 버튼 자체가 위에서 내려다본 프리스비: 두꺼운 테두리(림) + 안쪽 홈 + 빛 반사 */}
      <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
        <circle cx="32" cy="32" r="31" fill="#006b3b" />
        <circle cx="32" cy="32" r="27" fill="#008147" />
        <circle cx="32" cy="32" r="20" fill="none" stroke="#006b3b" strokeWidth="1.6" opacity="0.7" />
        <circle cx="32" cy="32" r="13" fill="none" stroke="#006b3b" strokeWidth="1.3" opacity="0.5" />
        <circle cx="32" cy="32" r="5" fill="#006b3b" opacity="0.45" />
        <path d="M14 22a21 21 0 0 1 14-10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
      </svg>
      {/* 날아가는 느낌: 왼쪽 아래로 뻗은 속도선 3개 */}
      <span className="fc-line fc-line-1" aria-hidden="true" />
      <span className="fc-line fc-line-2" aria-hidden="true" />
      <span className="fc-line fc-line-3" aria-hidden="true" />
    </a>
  );
}
