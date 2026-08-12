import { useState } from "react";
import TopBar from "../components/TopBar";
import { Btn, Cells, Notice, PageHead, Panel, Seg, Tag } from "../components/ui";

const COURSE_DEFS = [
  { id: 1, title: "早晨重量訓練", branchCoach: "信義店｜陳建豪教練", status: "OPEN", startTime: "明天 07:00", countdown: "18 小時後・60 分鐘", confirmed: 8, capacity: 12, wl: 0, wlCap: 5 },
  { id: 2, title: "進階拳擊有氧", branchCoach: "大安店｜林雅涵教練", status: "WAITLIST_OPEN", startTime: "週三 19:00", countdown: "2 天後・50 分鐘", confirmed: 15, capacity: 15, wl: 3, wlCap: 8 },
  { id: 3, title: "熱瑜珈基礎", branchCoach: "板橋店｜蔡欣穎教練", status: "WAITLIST_FULL", startTime: "週四 09:30", countdown: "3 天後・75 分鐘", confirmed: 12, capacity: 12, wl: 6, wlCap: 6 },
  { id: 4, title: "核心訓練營", branchCoach: "信義店｜陳建豪教練", status: "STARTED", startTime: "今天 08:00", countdown: "已開始・45 分鐘", confirmed: 10, capacity: 10, wl: 0, wlCap: 4 },
  { id: 5, title: "拉丁舞入門", branchCoach: "大安店｜周書豪教練", status: "ENDED", startTime: "昨天 18:00", countdown: "已結束・45 分鐘", confirmed: 9, capacity: 10, wl: 0, wlCap: 3 },
  { id: 6, title: "壺鈴體能", branchCoach: "板橋店｜蔡欣穎教練", status: "CANCELLED", startTime: "週五 20:00", countdown: "已停課・50 分鐘", confirmed: 0, capacity: 12, wl: 0, wlCap: 0 },
];

const STATUS_META = {
  OPEN: { label: "可預約", tag: "live" },
  WAITLIST_OPEN: { label: "滿額・可候補", tag: "hold" },
  WAITLIST_FULL: { label: "候補已滿", tag: "alert" },
  STARTED: { label: "已開始", tag: "neutral" },
  ENDED: { label: "已結束", tag: "neutral" },
  CANCELLED: { label: "已停課", tag: "alert" },
};

export default function MemberCourseList() {
  const [eligible, setEligible] = useState(true);
  const [booked, setBooked] = useState({ 4: true });

  return (
    <div className="shell">
      <TopBar variant="member" activeNav="課程列表" displayName="王小明" />
      <main className="shell__body">
        <PageHead title="課程列表" />

        <div className="row row--between">
          <Notice kind={eligible ? "live" : "hold"}>
            {eligible
              ? "會籍生效中，到期日 2027年3月15日；預約權正常，記點 1/3。可直接預約下列課程。"
              : "會籍已凍結，需先恢復會籍才能預約課程；目前僅能查看課程列表。"}
          </Notice>
          <span className="row">
            <span className="t-micro">示範狀態</span>
            <Seg
              label="示範狀態"
              value={eligible ? "yes" : "no"}
              onChange={(v) => setEligible(v === "yes")}
              options={[
                { value: "yes", label: "符合" },
                { value: "no", label: "不符合" },
              ]}
            />
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-5)", alignItems: "start" }}>
          {COURSE_DEFS.map((c) => {
            const meta = STATUS_META[c.status];
            const isBooked = !!booked[c.id];
            const bookable = c.status === "OPEN" || c.status === "WAITLIST_OPEN";

            let primaryLabel, primaryEnabled;
            if (c.status === "STARTED") {
              primaryLabel = "已開始";
              primaryEnabled = false;
            } else if (c.status === "ENDED") {
              primaryLabel = "已結束";
              primaryEnabled = false;
            } else if (c.status === "CANCELLED") {
              primaryLabel = "已停課";
              primaryEnabled = false;
            } else if (c.status === "WAITLIST_FULL") {
              primaryLabel = "候補已滿";
              primaryEnabled = false;
            } else if (isBooked) {
              primaryLabel = c.status === "WAITLIST_OPEN" ? "候補中" : "已預約";
              primaryEnabled = false;
            } else {
              primaryLabel = c.status === "WAITLIST_OPEN" ? "加入候補" : "預約這堂";
              primaryEnabled = eligible;
            }

            return (
              <Panel
                key={c.id}
                head={
                  <>
                    <div className="stack--tight">
                      <h3 className="t-heading">{c.title}</h3>
                      <span className="t-note">{c.branchCoach}</span>
                    </div>
                    <Tag kind={meta.tag}>{meta.label}</Tag>
                  </>
                }
                foot={
                  <div className="dgrid__actions">
                    <Btn variant="primary" disabled={!primaryEnabled} onClick={() => setBooked((b) => ({ ...b, [c.id]: true }))}>
                      {primaryLabel}
                    </Btn>
                    {isBooked && bookable && (
                      <Btn
                        variant="danger"
                        onClick={() =>
                          setBooked((b) => {
                            const n = { ...b };
                            delete n[c.id];
                            return n;
                          })
                        }
                      >
                        取消
                      </Btn>
                    )}
                  </div>
                }
              >
                <div className="stack--tight">
                  <div className="row row--between">
                    <span className="t-micro">開始時間</span>
                    <span className="t-num">{c.startTime}</span>
                  </div>
                  <div className="row row--between">
                    <span className="t-micro">距離開課</span>
                    <span className="t-num">{c.countdown}</span>
                  </div>
                  <div className="row row--between">
                    <span className="t-micro">名額</span>
                    <span className="row">
                      <Cells total={c.capacity} filled={c.confirmed} label={`名額 ${c.confirmed} / ${c.capacity}`} />
                      <span className="t-num">
                        {c.confirmed}
                        <span className="t-note"> / {c.capacity}</span>
                      </span>
                    </span>
                  </div>
                  <div className="row row--between">
                    <span className="t-micro">候補</span>
                    {c.wlCap ? (
                      <span className="row">
                        <Cells total={c.wlCap} filled={c.wl} kind="hold" label={`候補 ${c.wl} / ${c.wlCap}`} />
                        <span className="t-num">
                          {c.wl}
                          <span className="t-note"> / {c.wlCap}</span>
                        </span>
                      </span>
                    ) : (
                      <span className="t-num">—</span>
                    )}
                  </div>
                </div>
                {isBooked && bookable && (
                  <Notice kind="info">
                    {c.status === "WAITLIST_OPEN" ? `候補中，序號 ${c.wl}。` : "已預約，出席請提早 5 分鐘報到。"}
                  </Notice>
                )}
              </Panel>
            );
          })}
        </div>
      </main>
    </div>
  );
}
