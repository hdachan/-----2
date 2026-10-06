// 연락채널 카드 (홈 2섹션, 고객센터 > 상담하기에서 공통 사용)
const iconProps = { width: 40, height: 40, viewBox: "0 0 40 40", "aria-hidden": true };

const CONTACTS = [
  {
    title: "카카오톡 상담",
    desc: "채팅으로 편하게 물어보세요",
    href: "https://pf.kakao.com/_VsxgHn",
    external: true,
    icon: (
      <svg {...iconProps}>
        <path d="M20 8C12.3 8 6 12.9 6 19c0 3.9 2.6 7.3 6.5 9.3L11 34l6.3-4.2c.9.1 1.8.2 2.7.2 7.7 0 14-4.9 14-11S27.7 8 20 8z" fill="currentColor" />
        <circle cx="14" cy="19" r="1.8" fill="#fff" />
        <circle cx="20" cy="19" r="1.8" fill="#fff" />
        <circle cx="26" cy="19" r="1.8" fill="#fff" />
      </svg>
    ),
  },
  {
    title: "유선상담 1522-5179",
    desc: "전화로 바로 상담받으세요",
    href: "tel:1522-5179",
    icon: (
      <svg {...iconProps}>
        <path d="M13.5 7l4 7.5-3 2.5c1.6 3.6 4.9 6.9 8.5 8.5l2.5-3 7.5 4-1.5 5.5c-.3 1-1.2 1.6-2.2 1.5C17.6 32.6 7.4 22.4 6.5 10.7c-.1-1 .5-1.9 1.5-2.2L13.5 7z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "메일문의",
    desc: "csolapet@gmail.com",
    href: "mailto:csolapet@gmail.com",
    icon: (
      <svg {...iconProps}>
        <rect x="5" y="10" width="30" height="21" rx="4" fill="currentColor" />
        <path d="M7 13l13 9 13-9" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ContactCards({ className = "" }) {
  return (
    <ul className={`contact-list ${className}`.trim()}>
      {CONTACTS.map((c) => (
        <li key={c.title}>
          <a className="contact-card" href={c.href} {...(c.external && { target: "_blank", rel: "noopener noreferrer" })}>
            <span className="contact-text">
              <strong>{c.title}</strong>
              <span>{c.desc}</span>
            </span>
            <span className="contact-icon">{c.icon}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
