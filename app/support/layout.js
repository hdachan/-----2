import { SupportBanner, SupportSideNav } from "./SupportNav";

export default function SupportLayout({ children }) {
  return (
    <div className="container support">
      <SupportBanner />
      <div className="support-body">
        <SupportSideNav />
        <div className="support-content">{children}</div>
      </div>
    </div>
  );
}
