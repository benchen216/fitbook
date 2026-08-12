import { Fragment, useState } from "react";
import TopBar from "../components/TopBar";
import { PageHead, Panel, Notice, Tag, Btn, Field, Input, DataGrid, Cells } from "../components/ui";
import { IconMinus, IconPlus, IconSchedule } from "../components/icons";

const STATUS_META = {
  OPEN: { label: "可預約", kind: "blue" },
  WAITLIST_OPEN: { label: "滿額・可候補", kind: "hold" },
  STARTED: { label: "已開始", kind: "neutral" },
  ENDED: { label: "已結束", kind: "neutral" },
  CANCELLED: { label: "已停課", kind: "alert" },
};

const BOOKING_TAG = { 已確認: "blue", 候補中: "hold" };

const COLS = [
  { label: "課程", width: "20%" },
  { label: "教練", width: "12%" },
  { label: "開始時間", width: "14%" },
  { label: "名額", width: "15%" },
  { label: "候補", width: "13%" },
  { label: "狀態", width: "12%" },
  { label: "操作", width: "14%" },
];

const INITIAL_COURSES = [
  { id: 1, title: "早晨重量訓練", coach: "陳建豪", startTime: "明天 07:00", confirmed: 8, capacity: 12, wl: 0, wlCap: 5, status: "OPEN", bookings: [{ name: "陳怡君", status: "已確認" }, { name: "林志強", status: "已確認" }] },
  { id: 2, title: "進階拳擊有氧", coach: "林雅涵", startTime: "週三 19:00", confirmed: 15, capacity: 15, wl: 3, wlCap: 8, status: "WAITLIST_OPEN", bookings: [{ name: "黃美玲", status: "候補中" }] },
  { id: 3, title: "核心訓練營", coach: "陳建豪", startTime: "今天 08:00", confirmed: 10, capacity: 10, wl: 0, wlCap: 4, status: "STARTED", bookings: [] },
  { id: 4, title: "拉丁舞入門", coach: "周書豪", startTime: "昨天 18:00", confirmed: 9, capacity: 10, wl: 0, wlCap: 3, status: "ENDED", bookings: [] },
  { id: 5, title: "壺鈴體能", coach: "蔡欣穎", startTime: "週五 20:00", confirmed: 0, capacity: 12, wl: 0, wlCap: 0, status: "CANCELLED", bookings: [] },
];

export default function StoreManagerCourses() {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [nextId, setNextId] = useState(6);
  const [form, setForm] = useState({ title: "", coach: "", start: "", duration: 60, capacity: 12 });
  const [expanded, setExpanded] = useState({});
  const [reschedulingId, setReschedulingId] = useState(null);
  const [rNewStart, setRNewStart] = useState("");

  const rc = courses.find((c) => c.id === reschedulingId);

  const toggleExpanded = (id) => setExpanded((e) => ({ ...e, [id]: !e[id] }));

  const openCourse = () => {
    if (!form.title || !form.coach) return;
    setCourses((cs) => [
      ...cs,
      { id: nextId, title: form.title, coach: form.coach, startTime: form.start || "待定", confirmed: 0, capacity: Number(form.capacity) || 12, wl: 0, wlCap: 5, status: "OPEN", bookings: [] },
    ]);
    setNextId((n) => n + 1);
    setForm({ title: "", coach: "", start: "", duration: 60, capacity: 12 });
  };

  const confirmReschedule = () => {
    setCourses((cs) => cs.map((c) => (c.id === rc.id ? { ...c, startTime: "已調整" } : c)));
    setReschedulingId(null);
  };

  const cancelCourse = (id) => setCourses((cs) => cs.map((c) => (c.id === id ? { ...c, status: "CANCELLED", bookings: [] } : c)));

  return (
    <div className="shell">
      <TopBar variant="store_manager" activeNav="課程管理" displayName="蔡宗翰" branchName="信義店" />
      <main className="shell__body shell__body--wide">
        <PageHead title="課程管理" desc="開課、調課與停課會即時反映在下方名額格與候補格上。" />

        <Notice kind="info">
          店經理可管理本分店（信義店）所有課程的開課、調課與停課；教練姓名為文字欄位，不綁定特定教練帳號。
        </Notice>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-5)" }}>
          <Panel
            head={
              <h2 className="t-heading row">
                <IconSchedule />
                開課
              </h2>
            }
          >
            <Field label="課程名稱">
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="早晨重量訓練" />
            </Field>
            <Field label="教練名">
              <Input value={form.coach} onChange={(e) => setForm({ ...form, coach: e.target.value })} placeholder="陳建豪" />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
              <Field label="開始時間">
                <Input type="datetime-local" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} />
              </Field>
              <Field label="時長(分)">
                <Input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
              </Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
              <Field label="容量">
                <Input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
              </Field>
              <Field label="分店">
                <Input value="信義店" disabled />
              </Field>
            </div>
            <Btn variant="primary" onClick={openCourse}>
              開課
            </Btn>
          </Panel>

          <Panel head={<h2 className="t-heading">{rc ? `調課・${rc.title}` : "停課會發生什麼？"}</h2>}>
            {rc ? (
              <>
                <Field label="新開始時間">
                  <Input type="datetime-local" value={rNewStart} onChange={(e) => setRNewStart(e.target.value)} />
                </Field>
                <div className="row">
                  <Btn variant="primary" onClick={confirmReschedule}>
                    確認調課
                  </Btn>
                  <Btn variant="quiet" onClick={() => setReschedulingId(null)}>
                    取消
                  </Btn>
                </div>
              </>
            ) : (
              <p className="t-note">
                停課後，該課程所有已確認與候補的預約會直接標記為已取消，且不計入會員的缺席記點；已停課的課程無法復課，如需再次開課請重新建立。從左側課程列表點選「調課」可改期而不取消預約。
              </p>
            )}
          </Panel>
        </div>

        <Panel
          head={
            <h2 className="t-heading row">
              <IconSchedule />
              課程列表
            </h2>
          }
          flush
        >
          <DataGrid columns={COLS}>
            {courses.map((c) => {
              const meta = STATUS_META[c.status];
              const schedulable = c.status === "OPEN" || c.status === "WAITLIST_OPEN";
              return (
                <Fragment key={c.id}>
                  <tr>
                    <td>
                      <Btn variant="quiet" size="sm" slash={false} onClick={() => toggleExpanded(c.id)}>
                        <span className="row" style={{ gap: "6px" }}>
                          {expanded[c.id] ? <IconMinus width={13} height={13} /> : <IconPlus width={13} height={13} />}
                          {c.title}
                        </span>
                      </Btn>
                    </td>
                    <td>{c.coach}</td>
                    <td className="t-num">{c.startTime}</td>
                    <td>
                      <div className="row" style={{ gap: "var(--space-2)" }}>
                        <Cells total={c.capacity} filled={c.confirmed} label={`名額 ${c.confirmed}/${c.capacity}`} />
                        <span className="t-num">{c.confirmed}/{c.capacity}</span>
                      </div>
                    </td>
                    <td>
                      {c.wlCap ? (
                        <div className="row" style={{ gap: "var(--space-2)" }}>
                          <Cells total={c.wlCap} filled={c.wl} kind="hold" label={`候補 ${c.wl}/${c.wlCap}`} />
                          <span className="t-num">{c.wl}/{c.wlCap}</span>
                        </div>
                      ) : (
                        <span className="t-note">—</span>
                      )}
                    </td>
                    <td>
                      <Tag kind={meta.kind}>{meta.label}</Tag>
                    </td>
                    <td className="dgrid__actions">
                      {schedulable && (
                        <>
                          <Btn
                            size="sm"
                            onClick={() => {
                              setReschedulingId(c.id);
                              setRNewStart("");
                            }}
                          >
                            調課
                          </Btn>
                          <Btn variant="danger" size="sm" onClick={() => cancelCourse(c.id)}>
                            停課
                          </Btn>
                        </>
                      )}
                    </td>
                  </tr>
                  {expanded[c.id] && (
                    <tr>
                      <td colSpan={COLS.length}>
                        {c.bookings.length === 0 ? (
                          <span className="t-note">尚無預約</span>
                        ) : (
                          <div className="stack--tight" style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                            {c.bookings.map((bk, i) => (
                              <div key={i} className="row row--between" style={{ maxWidth: 320 }}>
                                <span>{bk.name}</span>
                                <Tag kind={BOOKING_TAG[bk.status] || "neutral"}>{bk.status}</Tag>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </DataGrid>
        </Panel>
      </main>
    </div>
  );
}
