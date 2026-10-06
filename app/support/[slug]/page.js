import { notFound } from "next/navigation";
import { SUPPORT_MENU } from "../menu";
import FaqList from "./FaqList";
import ClaimInfo from "./ClaimInfo";
import TermsInfo, { RequiredNotices } from "./TermsInfo";
import ContactCards from "../../components/ContactCards";

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORT_MENU.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = SUPPORT_MENU.find((m) => m.slug === slug);
  return {
    title: `${item?.label ?? "고객센터"} | 올라!펫보험 고객센터`,
    alternates: { canonical: `/support/${slug}/` },
  };
}

export default async function SupportPage({ params }) {
  const { slug } = await params;
  const item = SUPPORT_MENU.find((m) => m.slug === slug);
  if (!item) notFound();

  if (slug === "faq") {
    return (
      <>
        <div className="support-head">
          <h2>자주 묻는 질문</h2>
          <p>궁금한 것들을 살펴보고 더 알고 싶으시면 고객센터를 이용해 주세요.</p>
        </div>
        <FaqList />
      </>
    );
  }

  if (slug === "consult") {
    return (
      <>
        <div className="support-head">
          <h2>상담하기</h2>
          <p>고객센터 1522-5179</p>
        </div>
        {/* 왼쪽: 상담 카드 3개 / 오른쪽: 카드 쪽을 올려다보는 강아지 */}
        <div className="consult-layout">
          <ContactCards className="support-contact" />
          <img className="consult-dog" src="/ola_dog.png" alt="" aria-hidden="true" />
        </div>
      </>
    );
  }

  if (slug === "claim") {
    return (
      <>
        <div className="support-head">
          <h2>보험금 청구 및 지급과정</h2>
        </div>
        <ClaimInfo />
      </>
    );
  }

  if (slug === "required") {
    return (
      <>
        <div className="support-head">
          <h2>필수안내사항</h2>
        </div>
        <RequiredNotices />
      </>
    );
  }

  if (slug === "terms") {
    return (
      <>
        <div className="support-head">
          <h2>약관</h2>
        </div>
        <TermsInfo />
      </>
    );
  }

  // 나머지 메뉴는 내용 준비 중
  return (
    <>
      <div className="support-head">
        <h2>{item.label}</h2>
      </div>
      <p className="support-empty">준비 중입니다.</p>
    </>
  );
}
