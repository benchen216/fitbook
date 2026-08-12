import { useState } from "react";
import TopBar from "../components/TopBar";
import { Cells, DataGrid, Notice, PageHead, Panel, Seg, Tag } from "../components/ui";
import { IconWindow } from "../components/icons";

const OK_RECORDS = [
  { title: "熱瑜珈基礎", time: "5 天前", inWindow: true },
  { title: "核心訓練營", time: "18 天前", inWindow: true },
  { title: "晨間拉筋", time: "40 天前", inWindow: false },
  { title: "拳擊有氧", time: "55 天前", inWindow: false },
];
const SUSPENDED_RECORDS = [
  { title: "熱瑜珈基礎", time: "2 天前", inWindow: true },
  { title: "核心訓練營", time: "10 天前", inWindow: true },
  { title: "拳擊有氧", time: "16 天前", inWindow: true },
  { title: "晨間拉筋", time: "40 天前", inWindow: false },
  { title: "壺鈴體能", time: "58 天前", inWindow: false },
];

const COLS = [
  { label: "#", width: "8%" },
  { label: "課程", width: "40%" },
  { label: "記點時間", width: "27%" },
  { label: "狀態", width: "25%" },
];

const WINDOW_DAYS = 30;

/** "5 天前" → 5. The record times are the only day data this demo carries. */
function daysAgo(time) {
  const match = time.match(/(\d+)\s*天前/);
  return match ? Number(match[1]) : null;
}

export default function MemberNoShowSuspension() {
  const [bookingStatus, setBookingStatus] = useState("OK");
  const records = bookingStatus === "OK" ? OK_RECORDS : SUSPENDED_RECORDS;
  const count = records.filter((r) => r.inWindow).length;
  const pointDays = records.filter((r) => r.inWindow).map((r) => daysAgo(r.time));
  const rolledOut = records.filter((r) => !r.inWindow);

  return (
    <div className="shell">
      <TopBar variant="member" activeNav="爽約與停權" displayName="王小明" />
      <main className="shell__body">
        <PageHead
          title="爽約與停權"
          desc="系統以最近 30 天為滾動窗口計算缺席（未報到）記點；累積達 3 點將暫停預約權 7 天，到期後自動恢復；已滾出窗口的記點不再計入門檻判斷。"
          aside={
            <>
              <span className="t-micro">示範狀態</span>
              <Seg
                label="示範狀態"
                value={bookingStatus}
                onChange={setBookingStatus}
                options={[
                  { value: "OK", label: "正常" },
                  { value: "SUSPENDED", label: "停權" },
                ]}
              />
            </>
          }
        />

        <Panel>
          {bookingStatus === "OK" ? (
            <Notice kind="live">預約權正常，最近 30 天記點 {count}/3。</Notice>
          ) : (
            <Notice kind="alert">預約權已暫停，最近 30 天記點 {count}/3，將於 2026年8月19日 09:00 恢復。</Notice>
          )}
          <div className="row" style={{ gap: "var(--space-6)", alignItems: "flex-start" }}>
            <div className="stat">
              <span className="row" style={{ gap: "var(--space-2)" }}>
                <Cells total={3} filled={Math.min(count, 3)} kind="alert" label={`停權門檻 ${count} / 3`} />
                <span className="t-num">
                  {count}
                  <span className="t-note"> / 3</span>
                </span>
              </span>
              <span className="t-micro">停權門檻</span>
            </div>

            <div className="daystrip">
              <div className="daystrip__row" role="img" aria-label={`最近 30 天中有 ${count} 天記點`}>
                {Array.from({ length: WINDOW_DAYS }, (_, i) => {
                  const ago = WINDOW_DAYS - 1 - i;
                  const hit = pointDays.includes(ago);
                  return (
                    <span
                      key={ago}
                      className={`daystrip__d ${hit ? "daystrip__d--hit" : ""}`}
                      style={{ "--i": i }}
                      title={hit ? `${ago} 天前記一點` : undefined}
                    />
                  );
                })}
              </div>
              <div className="daystrip__axis">
                <span className="t-micro">30 天前</span>
                <span className="t-micro">最近 30 天滾動窗口</span>
                <span className="t-micro">今天</span>
              </div>
            </div>

            {rolledOut.length > 0 && (
              <div className="stat">
                <span className="row" style={{ gap: "var(--space-2)" }}>
                  <Cells total={rolledOut.length} spent={rolledOut.length} label={`已滾出窗口 ${rolledOut.length} 點`} />
                  <span className="t-num">{rolledOut.length}</span>
                </span>
                <span className="t-micro">已滾出窗口</span>
                <span className="t-note">不再計入門檻</span>
              </div>
            )}
          </div>
        </Panel>

        <Panel
          flush
          head={
            <span className="row" style={{ gap: "var(--space-2)" }}>
              <IconWindow width={18} height={18} />
              <h2 className="t-heading">記點明細（共 {count} 點）</h2>
            </span>
          }
        >
          <DataGrid columns={COLS}>
            {records.map((r, i) => (
              <tr key={`${r.title}-${r.time}`}>
                <td className="t-num">{i + 1}</td>
                <td>{r.title}</td>
                <td className="t-num">{r.time}</td>
                <td>
                  <Tag kind={r.inWindow ? "hold" : "neutral"}>{r.inWindow ? "窗口內" : "已滾出窗口"}</Tag>
                </td>
              </tr>
            ))}
          </DataGrid>
        </Panel>
      </main>
    </div>
  );
}
