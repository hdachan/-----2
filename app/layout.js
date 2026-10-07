import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SITE_URL } from "./site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "올라!펫보험 | 우리 아이를 위한 반려동물 보험",
  description: "올라!펫보험의 특장점과 보장예시를 확인하고 반려동물에게 꼭 맞는 보험을 준비하세요.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "올라!펫보험",
    title: "올라!펫보험",
    description: "우리 아이를 위한 반려동물 보험",
    // 카카오톡·페이스북 등 링크 미리보기 이미지 (1200×630)
    images: [{ url: "/OG_BA.png", width: 1200, height: 630, alt: "올라!펫보험" }],
  },
  twitter: { card: "summary_large_image", images: ["/OG_BA.png"] },
  robots: { index: true, follow: true },
  // 구글 Search Console / 네이버 서치어드바이저에서 발급받은 코드로 교체
  verification: {
    google: "GOOGLE_VERIFICATION_CODE",
    other: { "naver-site-verification": "NAVER_VERIFICATION_CODE" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* Noto Sans KR (구글 폰트, 굵기 100~900) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
