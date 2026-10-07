"use client";

import { useState } from "react";

// 공지사항: 일반 게시판 형식 (목록: 번호·제목·등록일 → 제목을 누르면 글 보기 → 목록으로)
// 새 공지는 맨 위에 추가하면 됨 (번호는 자동)
const NOTICES = [
  {
    title: "가입환영 이마트 & 몰리스 쿠폰 받으세요.",
    date: "2026.10.07",
    body: (
      <>
        <p className="notice-lead">
          올라펫보험 가입 고객분들께(기계약자 포함) 몰리스 매장과 이마트 매장(반려동물용품 전용)에서 사용할 수 있는
          <strong> 총 2만원 상당 쿠폰</strong>을 모든 계약자분들께 드려요.
        </p>

        <div className="notice-coupons">
          <div className="notice-coupon">
            <strong>10,000원권 × 1장</strong>
            <span>4만원 이상 구매 시 사용 가능</span>
          </div>
          <div className="notice-coupon">
            <strong>5,000원권 × 2장</strong>
            <span>2만원 이상 구매 시 사용 가능</span>
          </div>
        </div>

        <dl className="notice-info">
          <div>
            <dt>발송 시기</dt>
            <dd>가입 후 익일부터 일주일 이내 발송 (기계약자분들도 수령 가능해요)</dd>
          </div>
          <div>
            <dt>받는 방법</dt>
            <dd>
              <a href="https://pf.kakao.com/_VsxgHn" target="_blank" rel="noopener noreferrer">
                카카오톡 채팅방
              </a>
              에 증권번호나 성함을 남겨주세요.
            </dd>
          </div>
          <div>
            <dt>문의</dt>
            <dd>
              고객센터 <a href="tel:1522-5179">1522-5179</a> /{" "}
              <a href="https://pf.kakao.com/_VsxgHn" target="_blank" rel="noopener noreferrer">
                카카오톡 채팅
              </a>
            </dd>
          </div>
        </dl>
      </>
    ),
  },
];

export default function NoticeList() {
  const [view, setView] = useState(null); // 보고 있는 글 번호 (null = 목록)

  // 글 보기
  if (view !== null) {
    const n = NOTICES[view];
    return (
      <article className="board-view">
        <header className="board-view-head">
          <h3>{n.title}</h3>
          <p className="board-meta">
            <span>관리자</span>
            <span>{n.date}</span>
          </p>
        </header>
        <div className="board-view-body notice-body">{n.body}</div>
        <div className="board-view-foot">
          <button type="button" className="board-btn" onClick={() => setView(null)}>
            목록
          </button>
        </div>
      </article>
    );
  }

  // 목록
  return (
    <div className="board">
      <p className="board-count">
        전체 <strong>{NOTICES.length}</strong>건
      </p>
      <table className="board-table">
        <thead>
          <tr>
            <th scope="col" className="board-no">번호</th>
            <th scope="col">제목</th>
            <th scope="col" className="board-date">등록일</th>
          </tr>
        </thead>
        <tbody>
          {NOTICES.map((n, i) => (
            <tr key={n.title}>
              <td className="board-no">{NOTICES.length - i}</td>
              <td className="board-title">
                <button type="button" onClick={() => { setView(i); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  {n.title}
                </button>
              </td>
              <td className="board-date">{n.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
