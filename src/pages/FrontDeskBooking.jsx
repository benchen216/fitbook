import { useState } from "react";
import TopBar from "../components/TopBar";
import { PageHead, Panel, Notice, Tag, Btn, Field, Select, DataGrid, Empty } from "../components/ui";
import { IconSchedule, IconPerson } from "../components/icons";

const MEMBERS = [
  { id: "m1", name: "陳怡君", status: "ACTIVE", statusText: "會籍生效中，可正常預約。" },
  { id: "m2", name: "林志強", status: "FROZEN", statusText: "會籍已凍結，需先解凍才能預約。" },
  { id: "m3", name: "黃美玲", status: "EXPIRED", statusText: "會籍已到期，需先購買新方案。" },
  { id: "m4", name: "王建宏", status: "ACTIVE", statusText: "會籍生效中，可正常預約。" },
  { id: "m5", name: "張淑芬", status: "NO_PLAN", statusText: "此會員尚無會籍，無法預約課程。" },
];
const MEMBER_STATUS_LABEL = { ACTIVE: "生效中", FROZEN: "凍結中", EXPIRED: "已到期", NO_PLAN: "無會籍" };

const COURSES = [
  { id: "c1", title: "早晨重量訓練", startTime: "明天 07:00", full: false },
  { id: "c2", title: "進階拳擊有氧", startTime: "週三 19:00", full: true },
  { id: "c3", title: "熱瑜珈基礎", startTime: "週四 09:30", full: false },
  { id: "c4", title: "核心訓練營", startTime: "今天 08:00", full: false },
];

const INITIAL_BOOKINGS = {
  m1: [
    { title: "早晨重量訓練", startTime: "明天 07:00", status: "CONFIRMED", wl: null },
    { title: "進階拳擊有氧", startTime: "週三 19:00", status: "WAITLIST", wl: 2 },
  ],
  m4: [{ title: "熱瑜珈基礎", startTime: "週四 09:30", status: "CONFIRMED", wl: null }],
};

const STATUS_TAG = {
  CONFIRMED: { label: "已確認", kind: "blue" },
  WAITLIST: { label: "候補中", kind: "hold" },
  CANCELLED: { label: "已取消", kind: "neutral" },
};

const BOOKING_COLS = [
  { label: "課程", width: "30%" },
  { label: "開始時間", width: "20%" },
  { label: "狀態", width: "18%" },
  { label: "候補", width: "14%" },
  { label: "取消", width: "18%" },
];

export default function FrontDeskBooking() {
  const [memberId, setMemberId] = useState("m1");
  const [courseId, setCourseId] = useState("c1");
  const [bookingsByMember, setBookingsByMember] = useState(INITIAL_BOOKINGS);

  const member = MEMBERS.find((m) => m.id === memberId);
  const bookings = bookingsByMember[memberId] || [];

  return (
    <div className="shell">
      <TopBar variant="front_desk" activeNav="代預約" displayName="吳佳蓉" branchName="信義店" />
      <main className="shell__body">
        <PageHead title="代預約" desc="查詢到店會員的會籍狀態，代為預約課程；已預約與候補中的紀錄都可以直接取消。" />

        <Panel
          head={
            <h2 className="row">
              <IconSchedule />
              代為預約
            </h2>
          }
        >
          <div className="stack">
            <div className="row row--end">
              <Field label="會員">
                <Select style={{ maxWidth: 220 }} value={memberId} onChange={(e) => setMemberId(e.target.value)}>
                  {MEMBERS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}（{MEMBER_STATUS_LABEL[m.status]}）
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="課程">
                <Select style={{ maxWidth: 260 }} value={courseId} onChange={(e) => setCourseId(e.target.value)}>
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}・{c.startTime}
                      {c.full ? "（可候補）" : ""}
                    </option>
                  ))}
                </Select>
              </Field>
              <Btn
                variant="primary"
                onClick={() => {
                  if (member.status !== "ACTIVE") return;
                  const course = COURSES.find((c) => c.id === courseId);
                  const list = bookingsByMember[memberId] || [];
                  setBookingsByMember({
                    ...bookingsByMember,
                    [memberId]: [
                      ...list,
                      {
                        title: course.title,
                        startTime: course.startTime,
                        status: course.full ? "WAITLIST" : "CONFIRMED",
                        wl: course.full ? list.length + 1 : null,
                      },
                    ],
                  });
                }}
              >
                代為預約
              </Btn>
            </div>
            <Notice kind={member.status === "ACTIVE" ? "live" : "hold"}>
              {member.name}：{member.statusText}
            </Notice>
          </div>
        </Panel>

        <Panel
          head={
            <h2 className="row">
              <IconPerson />
              該會員的預約紀錄
            </h2>
          }
          flush
        >
          {bookings.length === 0 ? (
            <Empty icon={<IconSchedule width={28} height={28} />}>此會員目前沒有預約記錄</Empty>
          ) : (
            <DataGrid columns={BOOKING_COLS}>
              {bookings.map((b, i) => {
                const meta = STATUS_TAG[b.status];
                const cancellable = b.status === "CONFIRMED" || b.status === "WAITLIST";
                return (
                  <tr key={i}>
                    <td>{b.title}</td>
                    <td className="t-num">{b.startTime}</td>
                    <td>
                      <Tag kind={meta.kind}>{meta.label}</Tag>
                    </td>
                    <td className="t-num">{b.wl || "—"}</td>
                    <td>
                      {cancellable ? (
                        <Btn
                          variant="danger"
                          size="sm"
                          onClick={() =>
                            setBookingsByMember({
                              ...bookingsByMember,
                              [memberId]: bookings.map((x, xi) => (xi === i ? { ...x, status: "CANCELLED", wl: null } : x)),
                            })
                          }
                        >
                          取消
                        </Btn>
                      ) : (
                        <span className="t-note">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </DataGrid>
          )}
        </Panel>
      </main>
    </div>
  );
}
