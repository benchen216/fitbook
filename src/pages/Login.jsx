import { useState } from "react";
import { Btn, Cells, Input, Notice, Seg, Slash, Tag } from "../components/ui";
import { IconMinus, IconPlus } from "../components/icons";

/**
 * FitBook — login.
 *
 * This is the thesis viewport: the product's name built on the construction
 * grid and the three meters every screen reads by. Signing in is a single
 * account + password form; the account decides the role and the landing page.
 */

const ACCOUNTS = [
  { account: "0912345678", password: "fitbook123", role: "MEMBER", name: "陳怡君", desc: "會員", badge: "生效中" },
  { account: "0923456789", password: "fitbook123", role: "MEMBER", name: "林志強", desc: "會員", badge: "生效中" },
  { account: "0934567890", password: "fitbook123", role: "MEMBER", name: "黃美玲", desc: "會員", badge: "已到期" },
  { account: "0945678901", password: "fitbook123", role: "MEMBER", name: "王建宏", desc: "會員", badge: "生效中" },
  { account: "0956789012", password: "fitbook123", role: "MEMBER", name: "張淑芬", desc: "會員", badge: "無會籍" },
  { account: "0967890123", password: "fitbook123", role: "MEMBER", name: "李冠廷", desc: "會員", badge: "生效中" },
  { account: "wujr", password: "fitbook123", role: "FRONT_DESK", name: "吳佳蓉", desc: "櫃檯人員｜信義店", badge: "在職" },
  { account: "zhengyt", password: "fitbook123", role: "FRONT_DESK", name: "鄭雅婷", desc: "櫃檯人員｜大安店", badge: "在職" },
  { account: "xujw", password: "fitbook123", role: "FRONT_DESK", name: "許家瑋", desc: "櫃檯人員｜板橋店", badge: "在職" },
  { account: "caizh", password: "fitbook123", role: "STORE_MANAGER", name: "蔡宗翰", desc: "店經理｜信義店", badge: "在職" },
  { account: "zengsh", password: "fitbook123", role: "STORE_MANAGER", name: "曾淑惠", desc: "店經理｜大安店", badge: "在職" },
  { account: "youce", password: "fitbook123", role: "COACH", name: "游承恩", desc: "教練｜信義店", badge: "在職" },
  { account: "laist", password: "fitbook123", role: "COACH", name: "賴思婷", desc: "教練｜大安店", badge: "在職" },
  { account: "hongby", password: "fitbook123", role: "COACH", name: "洪柏毅", desc: "教練｜板橋店", badge: "在職" },
  { account: "jianpy", password: "fitbook123", role: "COACH", name: "簡佩瑜", desc: "教練｜大安店", badge: "休假" },
];

const SHIFT_DEFS = [
  { value: -24, label: "−1 天" },
  { value: 0, label: "現在" },
  { value: 24, label: "+1 天" },
  { value: 168, label: "+7 天" },
];

/** The booking state machine, stated once here and honoured on every screen. */
const FLOW = [
  { from: "已確認", to: "已報到", when: "開課前 30 分鐘至結束之間完成報到" },
  { from: "已確認", to: "未報到", when: "報到窗口結束仍未報到，記一次缺席點" },
  { from: "候補中", to: "已確認", when: "有名額釋出時自動遞補並通知" },
  { from: "任何狀態", to: "已取消", when: "課程停課，不計入缺席記點" },
];

function formatShift(hours) {
  if (hours === 0) return "現在";
  const days = hours / 24;
  return days > 0 ? `+${days} 天` : `${days} 天`;
}

export default function Login({ onLogin }) {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [signingIn, setSigningIn] = useState(null);
  const [demoOpen, setDemoOpen] = useState(false);
  const [shiftHours, setShiftHours] = useState(0);
  const [flowOverview, setFlowOverview] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const inputAccount = account.trim();
    if (!inputAccount || !password) {
      setError("請輸入帳號與密碼");
      return;
    }
    const matched = ACCOUNTS.find((a) => a.account === inputAccount && a.password === password);
    if (!matched) {
      setError("帳號或密碼錯誤");
      return;
    }
    setError(null);
    setSigningIn(matched);
    onLogin?.({ role: matched.role, name: matched.name, desc: matched.desc });
  };

  return (
    <div className="login">
      <section className="login__thesis">
        <p className="login__mark">
          FitBook
          <Slash />
        </p>

        <div className="login__anchor">
          <h1 className="login__word">
            <span>Fit</span>
            <span>
              Bo<em>o</em>k
            </span>
          </h1>
          <p className="login__lede">會籍、課程、名額、缺席，全部畫在同一張格線上。</p>
          <p className="login__sub">
            連鎖健身房的營運系統：會員自助預約，櫃檯、店經理與教練在同一份資料上作業。輸入帳號密碼登入。
          </p>

          <div className="login__meters">
            <div className="login__meter">
              <span className="t-micro">名額</span>
              <b>
                8<span className="t-note"> / 12</span>
              </b>
              <Cells total={12} filled={8} fit label="名額 8 / 12" />
            </div>
            <div className="login__meter">
              <span className="t-micro">30 天記點</span>
              <b>
                2<span className="t-note"> / 3</span>
              </b>
              <Cells total={3} filled={2} kind="alert" fit label="30 天記點 2 / 3" />
            </div>
            <div className="login__meter">
              <span className="t-micro">報到窗口</span>
              <b>
                30<span className="t-note"> 分鐘</span>
              </b>
              <Cells total={12} filled={4} spent={2} kind="hold" fit label="報到窗口進行中" />
            </div>
          </div>
        </div>
      </section>

      <section className="login__pick">
        <h2 className="t-micro" style={{ padding: "var(--space-5) var(--space-5) var(--space-2)" }}>
          登入
        </h2>

        <form className="login__list" onSubmit={submit}>
          <Input
            placeholder="帳號（會員為手機號碼，員工為員工帳號）"
            aria-label="帳號"
            autoComplete="username"
            value={account}
            style={{ maxWidth: 320 }}
            onChange={(e) => {
              setAccount(e.target.value);
              setError(null);
              setSigningIn(null);
            }}
          />
          <Input
            type="password"
            placeholder="密碼"
            aria-label="密碼"
            autoComplete="current-password"
            value={password}
            style={{ maxWidth: 320 }}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
              setSigningIn(null);
            }}
          />
          <div className="row">
            <Btn variant="primary" type="submit">
              登入
            </Btn>
            <Btn type="button" onClick={() => onLogin?.({ role: "GUEST", name: "訪客", desc: "未登入" })}>
              不登入進站
            </Btn>
          </div>
          <p className="t-note">
            訪客可以瀏覽門店與課程等公開頁面。訪客模式不保留任何個人資料，也無法查看會籍或預約課程。
          </p>

          {error && <Notice kind="alert">{error}</Notice>}
          {signingIn && (
            <Notice kind="info">
              歡迎回來，{signingIn.name}（{signingIn.desc}），登入中⋯⋯（示範用，尚未串接真實認證）
            </Notice>
          )}
        </form>

        <div className="login__demo">
          <button type="button" className="login__demo-toggle" onClick={() => setDemoOpen(!demoOpen)} aria-expanded={demoOpen}>
            <span className="row" style={{ gap: "var(--space-3)" }}>
              <span className="t-micro">示範設定</span>
              {shiftHours !== 0 && <Tag kind="hold">模擬時間 {formatShift(shiftHours)}</Tag>}
            </span>
            <span className="row" style={{ gap: "6px" }}>
              <span className="t-micro">{demoOpen ? "收合" : "展開"}</span>
              {demoOpen ? <IconMinus width={14} height={14} /> : <IconPlus width={14} height={14} />}
            </span>
          </button>

          {demoOpen && (
            <div className="stack" style={{ marginTop: "var(--space-4)" }}>
              <div className="stack--tight" style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                <span className="t-micro">示範帳號（密碼一律 fitbook123）</span>
                <div className="login__people">
                  {ACCOUNTS.map((a) => (
                    <button
                      key={a.account}
                      type="button"
                      className="login__person"
                      onClick={() => {
                        setAccount(a.account);
                        setPassword(a.password);
                        setError(null);
                        setSigningIn(null);
                      }}
                    >
                      <b>
                        {a.name}
                        <Tag kind={a.badge === "生效中" || a.badge === "在職" ? "blue" : "neutral"}>{a.badge}</Tag>
                      </b>
                      <small>
                        {a.desc}｜{a.account}
                      </small>
                    </button>
                  ))}
                </div>
              </div>
              <div className="stack--tight" style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                <span className="t-micro">模擬時間</span>
                <Seg label="模擬時間" value={shiftHours} onChange={setShiftHours} options={SHIFT_DEFS} />
              </div>
              <div className="row">
                <Btn
                  size="sm"
                  onClick={() => {
                    setShiftHours(0);
                    setFlowOverview(false);
                    setAccount("");
                    setPassword("");
                    setError(null);
                    setSigningIn(null);
                  }}
                >
                  重置示範資料
                </Btn>
                <label className="row" style={{ gap: "var(--space-2)", fontSize: "var(--text-sm)", cursor: "pointer" }}>
                  <input type="checkbox" checked={flowOverview} onChange={() => setFlowOverview(!flowOverview)} />
                  顯示預約狀態流程
                </label>
              </div>
              {flowOverview && (
                <div className="login__flow">
                  {FLOW.map((f) => (
                    <div key={`${f.from}-${f.to}`}>
                      <p className="t-micro">
                        {f.from} → {f.to}
                      </p>
                      <p className="t-note">{f.when}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
