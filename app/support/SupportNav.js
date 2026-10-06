"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SUPPORT_MENU } from "./menu";

function useCurrent() {
  const pathname = usePathname();
  return SUPPORT_MENU.find((m) => pathname.startsWith(`/support/${m.slug}`)) ?? SUPPORT_MENU[0];
}

export function SupportBanner() {
  const current = useCurrent();
  return (
    <div className="support-banner">
      <p>고객센터</p>
      <h1>{current.label}</h1>
    </div>
  );
}

export function SupportSideNav() {
  const current = useCurrent();
  const listRef = useRef(null);

  // 모바일(메뉴가 가로로 밀리는 경우)에서만: 선택된 탭이 보이도록 가로로 스크롤
  useEffect(() => {
    const ul = listRef.current;
    const active = ul?.querySelector(".is-active");
    if (!ul || !active || ul.scrollWidth <= ul.clientWidth) return;
    const a = active.getBoundingClientRect(), u = ul.getBoundingClientRect();
    ul.scrollLeft += a.left - u.left - (u.width - a.width) / 2;
  }, [current.slug]);

  return (
    <nav className="support-nav" aria-label="고객센터 메뉴">
      <ul ref={listRef}>
        {SUPPORT_MENU.map((m) => (
          <li key={m.slug}>
            <Link
              href={`/support/${m.slug}/`}
              className={m.slug === current.slug ? "is-active" : undefined}
              aria-current={m.slug === current.slug ? "page" : undefined}
            >
              {m.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
