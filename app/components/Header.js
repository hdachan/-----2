"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const MENU = [
  { href: "/#features", label: "특장점" },
  { href: "/#coverage", label: "보장예시" },
  { href: "/support/notice/", label: "고객센터" },
];

// 홈: 첫 섹션 카드 안의 로고(#hero-logo)가 상단바 뒤로 올라가면 상단바 가운데에 로고가 나타남
// 다른 페이지(고객센터 등): 상단바 가운데에 로고를 항상 표시
export default function Header() {
  const isHome = usePathname() === "/";
  const [showLogo, setShowLogo] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setShowLogo(true);
      return;
    }
    const heroLogo = document.getElementById("hero-logo");
    if (!heroLogo) {
      setShowLogo(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setShowLogo(!entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px" } // 상단바 높이만큼 빼고 판단
    );
    observer.observe(heroLogo);
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="header">
      <div className="container header-inner">
        <div className={`header-logo${showLogo ? " is-visible" : ""}`}>
          <Logo height={34} />
        </div>
        <nav aria-label="주요 메뉴">
          <ul className="nav">
            {MENU.map((m) => (
              <li key={m.href}>
                <a href={m.href}>{m.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
