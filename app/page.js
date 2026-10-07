import Features from "./components/Features";
import ContactCards from "./components/ContactCards";
import DevTuner from "./components/DevTuner";
import CoverageCopy from "./components/CoverageCopy";
import CoverageDetail from "./components/CoverageDetail";

export default function Home() {
  return (
    <>
      {/* 개발용 위치 조정기: npm run dev 에서만 보임 */}
      {process.env.NODE_ENV === "development" && <DevTuner />}

      <section className="hero">
        {/* 섹션 바닥에서 고양이·강아지가 고개를 내밀고 있는 모습 */}
        <div className="hero-art" aria-hidden="true">
          <img className="art-cat" src="/ola_cat2.png" alt="" />
          <img className="art-dog" src="/ola_dog2.png" alt="" />
        </div>
        {/* 프리스비: 카드 위를 왼쪽에서 오른쪽으로 천천히 날아감 */}
        <img className="art-frisbee" src="/pr.png" alt="" aria-hidden="true" />
        {/* 두 번째 프리스비: 아래쪽을 오른쪽에서 왼쪽으로 (첫 번째의 70% 크기) */}
        <img className="art-frisbee art-frisbee-2" src="/pr.png" alt="" aria-hidden="true" />
        {/* 모바일 전용 첫 프리스비: 화면 앞에서 크게 나타나 멀리 날아가며 작아짐 (PC에서는 숨김) */}
        <img className="art-frisbee-intro" src="/pr.png" alt="" aria-hidden="true" />
        <div className="hero-inner">
          {/* 브랜드 카드: 제휴 표기 → 로고 → 태그라인 → 메인 카피 → 설명 → 버튼 */}
          <div className="hero-card">
            <p className="hero-eyebrow">이마트 몰리스 × DB손해보험</p>
            {/* 이 로고가 스크롤로 화면 위로 사라지면 상단바 가운데에 로고가 나타남 (Header.js) */}
            <h2 className="hero-card-logo" id="hero-logo">
              <img src="/ola_logo.svg" alt="올라!펫보험" />
            </h2>
            <p className="hero-tagline">
              O Lovely Animal<span className="tail-exclamation">!</span>
            </p>
            <h1 className="hero-headline">
              새로운 반려생활에{" "}
              <em className="headline-end">
                {/* 임시: "타" 글자 위 체크 표시 */}
                <span className="ta-check">타</span>세요.
                {/* 두 번째 프리스비: 글자 뒤로 날아와 "요." 끝에서 사라짐 → 오른쪽 강아지가 받아 문 것처럼 */}
                <img className="art-frisbee art-frisbee-3" src="/pr.png" alt="" aria-hidden="true" />
                {/* 타세요 오른쪽: 프리스비 무는 강아지 (absolute → 글자 위치에 영향 없음) */}
                <img className="headline-dog" src="/pr_2.png" alt="" aria-hidden="true" />
              </em>
            </h1>

            <div className="hero-main">
              <p className="hero-sub">특약포함 설계가 필요없는 원플랜</p>
              {/* 시계(왼쪽)·청진기(오른쪽)가 버튼 양옆을 감싸 시선을 버튼으로 모음 */}
              <div className="btn-wrap">
                <a
                  className="btn"
                  href="https://cdsm.mdbins.com:8485/dsm/dvcphone/zcommon/b/DSMPZBAE400UM00.do?brth=2068650913"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  보험료 조회 및 가입
                </a>
                <img className="art-clock" src="/clock.png" alt="" aria-hidden="true" />
                <img className="art-stetho" src="/stethoscope.png" alt="" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 연락채널: 얇은 직사각형 카드 3개 */}
      <section className="contact" aria-label="상담 채널">
        <ContactCards className="container" />
      </section>

      <section id="features" className="features">
        <Features />
      </section>

      {/* 보장내용: 감성 카피(줄마다 흐릿 → 선명하게, 가운데 정렬) + 보상 예시·손해 드롭다운 3개 */}
      <section id="coverage" className="section coverage">
        <div className="container">
          <CoverageCopy />
          {/* 카피와 보상 예시 사이: 하트 고양이 (f_cat) */}
          <div className="coverage-head">
            <img className="coverage-hero" src="/f_cat.png" alt="" aria-hidden="true" />
          </div>

          {/* 보상 예시 + 보상하는 손해 / 보상하지 않는 손해 */}
          <CoverageDetail />
        </div>
        {/* 섹션 아래 경계(푸터와 만나는 곳)에 걸쳐 앉은 고양이 */}
        <img className="coverage-cat" src="/sleep_cat.png" alt="" aria-hidden="true" />
      </section>
    </>
  );
}
