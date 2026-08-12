import { useNavigate } from "react-router-dom";
import { Btn, Panel } from "../components/ui";
import { IconCheckIn, IconLock } from "../components/icons";
import TopBar from "../components/TopBar";

const CAN_DO = ["瀏覽門店與課程等公開頁面"];

const CANNOT_DO = ["查詢會籍資料", "預約課程", "使用櫃檯或後台功能", "保留任何個人資料"];

export default function GuestEmptyState({ onLogin }) {
  const navigate = useNavigate();
  const goLogin = onLogin || (() => navigate("/"));

  return (
    <div className="shell">
      <TopBar variant="guest" onLogout={goLogin} />
      <main className="shell__body">
        <header className="page-head">
          <div className="page-head__text">
            <span className="row" style={{ gap: "var(--space-3)" }}>
              <IconLock width={40} height={40} />
              <h1 className="t-display">請先登入</h1>
            </span>
            <p className="t-note" style={{ maxWidth: "62ch" }}>
              未登入狀態僅能瀏覽公開頁面，無法查詢會籍資料、預約課程，或使用櫃檯與後台功能。訪客模式不會保留任何個人資料；請先選擇身分登入以繼續使用完整功能。
            </p>
          </div>
          <div className="row">
            <Btn variant="primary" onClick={goLogin}>
              前往登入
            </Btn>
          </div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-5)", alignItems: "start" }}>
          <Panel
            head={
              <span className="row" style={{ gap: "var(--space-2)" }}>
                <IconCheckIn width={18} height={18} />
                <h2 className="t-heading">訪客能做什麼</h2>
              </span>
            }
          >
            <div className="dots" style={{ padding: "var(--space-4)" }}>
              <ul className="stack--tight" style={{ margin: 0, paddingLeft: "1.2em", listStyle: "square" }}>
                {CAN_DO.map((item) => (
                  <li key={item} className="t-note">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Panel>

          <Panel
            head={
              <span className="row" style={{ gap: "var(--space-2)" }}>
                <IconLock width={18} height={18} />
                <h2 className="t-heading">訪客不能做什麼</h2>
              </span>
            }
          >
            <ul className="stack--tight" style={{ margin: 0, paddingLeft: "1.2em", listStyle: "square" }}>
              {CANNOT_DO.map((item) => (
                <li key={item} className="t-note">
                  {item}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </main>
    </div>
  );
}
