"use client";

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
  return (
    <nav className="support-nav" aria-label="고객센터 메뉴">
      <ul>
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
