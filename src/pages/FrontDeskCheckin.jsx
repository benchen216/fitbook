import { useState } from "react";
import TopBar from "../components/TopBar";
import { PageHead, Panel, Notice, Tag, Btn, DataGrid, Empty } from "../components/ui";
import { IconSchedule, IconCheckIn, IconPerson } from "../components/icons";

const COURSE_DEFS = [
  { id: 1, title: "早晨重量訓練", time: "今天 07:00", status: "OPEN" },
  { id: 2, title: "核心訓練營", time: "今天 08:00", status: "NOT_OPEN" },
  { id: 3, title: "拉丁舞入門", time: "昨天 18:00", status: "ENDED" },
  { id: 4, title: "壺鈴體能", time: "週五 20:00", status: "CANCELLED" },
];
const COURSE_STATUS = {
  OPEN: { label: "報到中", kind: "live" },
  NOT_OPEN: { label: "尚未開放", kind: "hold" },
  ENDED: { label: "已結束", kind: "neutral" },
  CANCELLED: { label: "已停課", kind: "alert" },
};

const ROSTER_BY_COURSE = {
  1: [
    { name: "陳怡君", phone: "0912-345-678", status: "CONFIRMED" },
    { name: "林志強", phone: "0923-456-789", status: "CONFIRMED" },
    { name: "黃美玲", phone: "0934-567-890", status: "WAITLIST", wl: 1 },
  ],
  2: [{ name: "王建宏", phone: "0945-678-901", status: "CONFIRMED" }],
  3: [{ name: "張淑芬", phone: "0956-789-012", status: "CHECKED_IN", checkedInAt: "18:02" }],
  4: [],
};
const PERSON_STATUS = {
  CONFIRMED: { label: "已確認", kind: "blue" },
  WAITLIST: { label: "候補中", kind: "hold" },
  CHECKED_IN: { label: "已報到", kind: "neutral" },
};

const COURSE_COLS = [
  { label: "課程", width: "28%" },
  { label: "時間", width: "20%" },
  { label: "狀態", width: "22%" },
  { label: "動作", width: "30%" },
];

const ROSTER_COLS = [
  { label: "會員", width: "20%" },
  { label: "手機", width: "18%" },
  { label: "狀態", width: "16%" },
  { label: "候補", width: "12%" },
  { label: "報到時間", width: "16%" },
  { label: "報到", width: "18%" },
];

export default function FrontDeskCheckin() {
  const [selectedCourse, setSelectedCourse] = useState(1);
  const [checkedIn, setCheckedIn] = useState({});
  const course = COURSE_DEFS.find((c) => c.id === selectedCourse);
  const roster = ROSTER_BY_COURSE[selectedCourse] || [];

  return (
    <div className="shell">
      <TopBar variant="front_desk" activeNav="報到作業" displayName="吳佳蓉" branchName="信義店" />
      <main className="shell__body">
        <PageHead title="報到作業" desc="為到店會員辦理課程報到，僅顯示本分店的課程與名單。" />

        <Notice kind="info">報到開放時間為開課前 30 分鐘至該堂課結束；僅顯示本分店（信義店）的課程。</Notice>

        <Panel
          head={
            <h2 className="row">
              <IconSchedule />
              選擇課程
            </h2>
          }
          flush
        >
          <DataGrid columns={COURSE_COLS}>
            {COURSE_DEFS.map((c) => {
              const meta = COURSE_STATUS[c.status];
              const selected = c.id === selectedCourse;
              return (
                <tr key={c.id}>
                  <td>{c.title}</td>
                  <td className="t-num">{c.time}</td>
                  <td>
                    <Tag kind={meta.kind}>{meta.label}</Tag>
                  </td>
                  <td>
                    {selected ? (
                      <Btn size="sm" disabled>
                        顯示中
                      </Btn>
                    ) : (
                      <Btn size="sm" onClick={() => setSelectedCourse(c.id)}>
                        選擇本堂
                      </Btn>
                    )}
                  </td>
                </tr>
              );
            })}
          </DataGrid>
        </Panel>

        <Panel
          head={
            <h2 className="row">
              <IconCheckIn />
              {course.title}・出席名單
            </h2>
          }
          flush
        >
          {roster.length === 0 ? (
            <Empty icon={<IconPerson width={28} height={28} />}>尚無報名名單</Empty>
          ) : (
            <DataGrid columns={ROSTER_COLS}>
              {roster.map((p, i) => {
                const key = `${selectedCourse}-${i}`;
                const status = checkedIn[key] ? "CHECKED_IN" : p.status;
                const meta = PERSON_STATUS[status];
                return (
                  <tr key={i}>
                    <td>{p.name}</td>
                    <td className="t-num">{p.phone}</td>
                    <td>
                      <Tag kind={meta.kind}>{meta.label}</Tag>
                    </td>
                    <td className="t-num">{p.wl || "—"}</td>
                    <td className="t-num">{checkedIn[key] ? "剛剛" : p.checkedInAt || "—"}</td>
                    <td>
                      {status === "CONFIRMED" ? (
                        <Btn variant="primary" size="sm" onClick={() => setCheckedIn({ ...checkedIn, [key]: true })}>
                          報到
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
