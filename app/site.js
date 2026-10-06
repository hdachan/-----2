// 사이트 주소: 직접 정한 도메인이 있으면 NEXT_PUBLIC_SITE_URL 로 지정,
// 없으면 Vercel 이 빌드 때 알려주는 대표 주소(xxx.vercel.app 또는 연결한 도메인)를 자동 사용
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "http://localhost:3001";
