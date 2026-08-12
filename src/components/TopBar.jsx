import { Link, useNavigate } from "react-router-dom";
import { Btn, Slash } from "./ui";

const NAV_MAP = {
  guest: [{ label: "未登入", href: null, active: true }],
  member: [
    { label: "我的會籍", href: "/member/membership" },
    { label: "課程列表", href: "/member/courses" },
    { label: "我的預約", href: "/member/bookings" },
    { label: "爽約與停權", href: "/member/no-show" },
  ],
  front_desk: [
    { label: "會員與會籍", href: "/front-desk/members" },
    { label: "代預約", href: "/front-desk/booking" },
    { label: "報到作業", href: "/front-desk/checkin" },
  ],
  store_manager: [
    { label: "課程管理", href: "/store-manager/courses" },
    { label: "員工帳號", href: "/store-manager/staff" },
    { label: "櫃檯作業", href: "/store-manager/counter" },
  ],
  coach: [
    { label: "開課", href: "/coach/open-class" },
    { label: "我的課程", href: "/coach/my-courses" },
  ],
};

const ROLE_LABEL = { member: "會員", front_desk: "櫃檯人員", store_manager: "店經理", coach: "教練", guest: "訪客" };

/**
 * Sticky navigation strip shared by every authenticated screen. `variant`
 * picks the nav set and the role label; `activeNav` is the current page's nav
 * label. `onLogout` defaults to routing back to the role picker.
 */
export default function TopBar({ variant = "member", displayName = "王小明", branchName = "信義店", activeNav, onLogout }) {
  const navigate = useNavigate();
  const handleLogout = onLogout || (() => navigate("/"));
  const items = NAV_MAP[variant] || NAV_MAP.member;
  const showsBranch = variant === "front_desk" || variant === "store_manager" || variant === "coach";

  return (
    <nav className="topbar" aria-label="主要導覽">
      <div className="topbar__left">
        <Link to="/" className="topbar__mark">
          FitBook
          <Slash />
        </Link>
        <div className="topbar__nav">
          {items.map((it) => {
            const on = it.active || it.label === activeNav;
            const cls = `topbar__link ${on ? "topbar__link--on" : ""} ${!it.href && !it.active ? "topbar__link--off" : ""}`;
            return it.href ? (
              <Link key={it.label} to={it.href} className={cls} aria-current={on ? "page" : undefined}>
                <span>{it.label}</span>
              </Link>
            ) : (
              <span key={it.label} className={cls} aria-current={on ? "page" : undefined}>
                <span>{it.label}</span>
              </span>
            );
          })}
        </div>
      </div>
      <div className="topbar__right">
        <span className="topbar__who">
          <b>{ROLE_LABEL[variant]}</b>
          {variant === "guest" ? "尚未登入" : displayName}
          {showsBranch ? <span className="t-note">{branchName}</span> : null}
        </span>
        <Btn variant="quiet" size="sm" onClick={handleLogout}>
          登出
        </Btn>
      </div>
    </nav>
  );
}
