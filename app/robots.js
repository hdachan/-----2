import { SITE_URL } from "./site";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Yeti", allow: "/" }, // 네이버 검색로봇
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
