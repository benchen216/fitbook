import { useMemo, useState } from "react";
import { Btn, Cells, Input, Notice, Seg, Slash, Tag } from "../components/ui";
import { IconMinus, IconPlus } from "../components/icons";

/**
 * FitBook — login / role picker.
 *
 * This is the thesis viewport: the product's name built on the construction
 * grid, the three meters every screen reads by, and the five roles as modules
 * on that same grid. Picking a person signs in as them.
 */

const ROLE_DEFS = [
  { id: "MEMBER", label: "會員", desc: "檢視會籍、預約課程、查詢記點" },
  { id: "FRONT_DESK", label: "櫃檯人員", desc: "報到、會籍異動與代預約" },
  { id: "STORE_MANAGER", label: "店經理", desc: "課程、員工與本店櫃檯作業" },
  { id: "COACH", label: "教練", desc: "開課與學員出席" },
  { id: "GUEST", label: "未登入", desc: "以訪客瀏覽公開頁面，不保留任何資料" },
];

const MEMBERS = [
  { name: "陳怡君", phone: "0912-345-678", badge: "生效中", kind: "blue" },
  { name: "林志強", phone: "0923-456-789", badge: "生效中", kind: "blue" },
  { name: "黃美玲", phone: "0934-567-890", badge: "已到期", kind: "neutral" },
  { name: "王建宏", phone: "0945-678-901", badge: "生效中", kind: "blue" },
  { name: "張淑芬", phone: "0956-789-012", badge: "無會籍", kind: "neutral" },
  { name: "李冠廷", phone: "0967-890-123", badge: "生效中", kind: "blue" },
];

const STAFF_BY_ROLE = {
  FRONT_DESK: [
    { name: "吳佳蓉", roleBranch: "櫃檯人員｜信義店", status: "在職" },
    { name: "鄭雅婷", roleBranch: "櫃檯人員｜大安店", status: "在職" },
    { name: "許家瑋", roleBranch: "櫃檯人員｜板橋店", status: "在職" },
  ],
  STORE_MANAGER: [
    { name: "蔡宗翰", roleBranch: "店經理｜信義店", status: "在職" },
    { name: "曾淑惠", roleBranch: "店經理｜大安店", status: "在職" },
  ],
  COACH: [
    { name: "游承恩", roleBranch: "教練｜信義店", status: "在職" },
    { name: "賴思婷", roleBranch: "教練｜大安店", status: "在職" },
    { name: "洪柏毅", roleBranch: "教練｜板橋店", status: "在職" },
    { name: "簡佩瑜", roleBranch: "教練｜大安店", status: "休假" },
  ],
};

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

export default function LoginRolePicker({ onLogin }) {
  const [role, setRole] = useState("MEMBER");
  const [search, setSearch] = useState("");
  const [demoOpen, setDemoOpen] = useState(false);
  const [shiftHours, setShiftHours] = useState(0);
  const [flowOverview, setFlowOverview] = useState(false);
  const [selection, setSelection] = useState(null);

  const isMember = role === "MEMBER";
  const isGuest = role === "GUEST";
  const staffList = STAFF_BY_ROLE[role] || [];

  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MEMBERS.filter((m) => !q || m.name.toLowerCase().includes(q) || m.phone.includes(q));
  }, [search]);

  const selectPerson = (name, desc) => {
    setSelection({ name, desc });
    onLogin?.({ role, name, desc });
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
            連鎖健身房的營運系統：會員自助預約，櫃檯、店經理與教練在同一份資料上作業。選一個身分進入。
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
          選擇身分
        </h2>
        <div className="login__roles">
          {ROLE_DEFS.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`login__role ${r.id === role ? "login__role--on" : ""}`}
              aria-pressed={r.id === role}
              onClick={() => {
                setRole(r.id);
                setSelection(null);
              }}
            >
              <strong>
                {r.label}
                <Slash />
              </strong>
              <span>{r.desc}</span>
            </button>
          ))}
        </div>

        <div className="login__list">
          {isMember && (
            <>
              <Input
                placeholder="搜尋姓名或手機"
                aria-label="搜尋姓名或手機"
                value={search}
                style={{ maxWidth: 320 }}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelection(null);
                }}
              />
              {filteredMembers.length > 0 ? (
                <div className="login__people">
                  {filteredMembers.map((m) => (
                    <button
                      key={m.name}
                      type="button"
                      className={`login__person ${selection?.name === m.name ? "login__person--on" : ""}`}
                      onClick={() => selectPerson(m.name, "會員")}
                    >
                      <b>
                        {m.name}
                        <Tag kind={m.kind}>{m.badge}</Tag>
                      </b>
                      <small>{m.phone}</small>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="t-note">找不到符合「{search}」的會員，換個姓名或手機號碼再試。</p>
              )}
            </>
          )}

          {!isMember && !isGuest && (
            <div className="login__people">
              {staffList.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  className={`login__person ${selection?.name === s.name ? "login__person--on" : ""}`}
                  onClick={() => selectPerson(s.name, s.roleBranch)}
                >
                  <b>
                    {s.name}
                    <Tag kind={s.status === "在職" ? "blue" : "neutral"}>{s.status}</Tag>
                  </b>
                  <small>{s.roleBranch}</small>
                </button>
              ))}
            </div>
          )}

          {isGuest && (
            <>
              <p className="t-note">
                訪客可以瀏覽門店與課程等公開頁面。訪客模式不保留任何個人資料，也無法查看會籍或預約課程。
              </p>
              <Btn variant="primary" onClick={() => selectPerson("訪客", "未登入")}>
                不登入進站
              </Btn>
            </>
          )}

          {selection && <Notice kind="info">已選擇 {selection.name}（{selection.desc}），登入中⋯⋯（示範用，尚未串接真實認證）</Notice>}
        </div>

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
                <span className="t-micro">模擬時間</span>
                <Seg label="模擬時間" value={shiftHours} onChange={setShiftHours} options={SHIFT_DEFS} />
              </div>
              <div className="row">
                <Btn
                  size="sm"
                  onClick={() => {
                    setShiftHours(0);
                    setFlowOverview(false);
                    setSearch("");
                    setSelection(null);
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
