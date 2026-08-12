import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import { Btn, DataGrid, Empty, PageHead, Panel, Seg, Tag } from "../components/ui";

const BOOKING_DEFS = [
  { id: 1, title: "早晨重量訓練", branchCoach: "信義店｜陳建豪教練", startTime: "明天 07:00", status: "CONFIRMED", wl: null },
  { id: 2, title: "進階拳擊有氧", branchCoach: "大安店｜林雅涵教練", startTime: "週三 19:00", status: "WAITLIST", wl: 3 },
  { id: 3, title: "核心訓練營", branchCoach: "信義店｜陳建豪教練", startTime: "今天 08:00", status: "CHECKED_IN", wl: null },
  { id: 4, title: "拉丁舞入門", branchCoach: "大安店｜周書豪教練", startTime: "昨天 18:00", status: "NO_SHOW", wl: null },
];

const STATUS_META = {
  CONFIRMED: { label: "已確認", tag: "blue" },
  WAITLIST: { label: "候補中", tag: "hold" },
  CHECKED_IN: { label: "已報到", tag: "neutral" },
  NO_SHOW: { label: "未報到", tag: "alert" },
  CANCELLED: { label: "已取消", tag: "neutral" },
};

const COLS = [
  { label: "課程", width: "24%" },
  { label: "分店／教練", width: "22%" },
  { label: "開始時間", width: "16%" },
  { label: "狀態", width: "14%" },
  { label: "候補序號", width: "12%" },
  { label: "操作", width: "12%" },
];

export default function MemberMyBookings() {
  const navigate = useNavigate();
  const [showEmpty, setShowEmpty] = useState(false);
  const [cancelled, setCancelled] = useState({});

  const bookings = BOOKING_DEFS.map((b) => {
    const status = cancelled[b.id] ? "CANCELLED" : b.status;
    const meta = STATUS_META[status];
    const cancellable = status === "CONFIRMED" || status === "WAITLIST";
    return { ...b, status, meta, cancellable };
  });

  return (
    <div className="shell">
      <TopBar variant="member" activeNav="我的預約" displayName="王小明" />
      <main className="shell__body">
        <PageHead
          title="我的預約"
          aside={
            <>
              <span className="t-micro">示範狀態</span>
              <Seg
                label="示範狀態"
                value={showEmpty ? "empty" : "has"}
                onChange={(v) => setShowEmpty(v === "empty")}
                options={[
                  { value: "has", label: "有預約" },
                  { value: "empty", label: "無預約" },
                ]}
              />
            </>
          }
        />

        {!showEmpty ? (
          <Panel flush>
            <DataGrid columns={COLS}>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.title}</td>
                  <td>{b.branchCoach}</td>
                  <td className="t-num">{b.startTime}</td>
                  <td>
                    <Tag kind={b.meta.tag}>{b.meta.label}</Tag>
                  </td>
                  <td className="t-num">{b.wl && !cancelled[b.id] ? b.wl : "—"}</td>
                  <td>
                    {b.cancellable ? (
                      <Btn variant="danger" size="sm" onClick={() => setCancelled((c) => ({ ...c, [b.id]: true }))}>
                        取消
                      </Btn>
                    ) : (
                      <span className="t-note">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </DataGrid>
          </Panel>
        ) : (
          <Empty
            action={
              <Btn variant="primary" onClick={() => navigate("/member/courses")}>
                去看課程
              </Btn>
            }
          >
            目前沒有預約記錄
          </Empty>
        )}

        <Panel head={<h2 className="t-heading">狀態怎麼流轉？</h2>}>
          <p className="t-note">
            已確認 的預約，開課後依報到情況轉為 已報到 或 未報到（記一次缺席點）；候補中 若有名額釋出會自動轉為 已確認 並通知你；若課程本身被停課，所有預約與候補會直接標記 已取消，不計入缺席記點。
          </p>
        </Panel>
      </main>
    </div>
  );
}
