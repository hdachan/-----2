// src 로 다른 색 로고(예: 검정 /ola_logo_black.svg)를 쓸 수 있음
export default function Logo({ height = 28, src = "/ola_logo.svg" }) {
  return (
    <a href="/" className="logo" aria-label="올라!펫보험 홈">
      <img src={src} alt="올라!펫보험" height={height} style={{ height, width: "auto" }} />
    </a>
  );
}
