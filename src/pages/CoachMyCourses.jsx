import { useState } from "react";
import { Btn, Cells, DataGrid, Empty, Field, Input, PageHead, Panel, Seg, Tag } from "../components/ui";
import { IconClock, IconSchedule } from "../components/icons";
import TopBar from "../components/TopBar";

const STATUS_META = {
  OPEN: { label: "可預約", tag: "blue" },
  STARTED: { label: "已開始", tag: "neutral" },
  ENDED: { label: "已結束", tag: "neutral" },
  CANCELLED: { label: "已停課", tag: "alert" },
};

const DEMO_OPTIONS = [
  { value: "has", label: "有課程" },
  { value: "empty", label: "無課程" },
];

const COLUMNS = [
  { label: "課程", width: "20%" },
  { label: "分店", width: "10%" },
  { label: "開始時間", width: "14%" },
  { label: "名額", width: "18%" },
  { label: "候補", width: "16%" },
  { label: "狀態", width: "10%" },
  { label: "操作", width: "12%" },
];

export default function CoachMyCourses() {
  const [showEmpty, setShowEmpty] = useState(false);
  const [courses, setCourses] = useState([
    { id: 1, title: "早晨重量訓練", branch: "信義店", startTime: "明天 07:00", confirmed: 8, capacity: 12, wl: 0, wlCap: 5, status: "OPEN" },
    { id: 2, title: "核心訓練營", branch: "信義店", startTime: "今天 08:00", confirmed: 10, capacity: 10, wl: 0, wlCap: 4, status: "STARTED" },
    { id: 3, title: "重量訓練進階班", branch: "信義店", startTime: "週五 07:00", confirmed: 4, capacity: 12, wl: 0, wlCap: 5, status: "OPEN" },
    { id: 4, title: "拉丁舞入門", branch: "信義店", startTime: "昨天 18:00", confirmed: 9, capacity: 10, wl: 0, wlCap: 3, status: "ENDED" },
  ]);
  const [reschedulingId, setReschedulingId] = useState(null);
  const [rNewStart, setRNewStart] = useState("");
  const rescheduling = courses.find((c) => c.id === reschedulingId);

  const cancelClass = (id) => {
    setCourses((cs) => cs.map((c) => (c.id === id ? { ...c, status: "CANCELLED" } : c)));
  };

  const confirmReschedule = () => {
    setCourses((cs) => cs.map((c) => (c.id === rescheduling.id ? { ...c, startTime: "已調整" } : c)));
    setReschedulingId(null);
  };

  return (
    <div className="shell">
      <TopBar variant="coach" activeNav="我的課程" displayName="陳建豪" branchName="信義店" />
      <main className="shell__body">
        <PageHead
          title="我的課程"
          aside={
            <div className="row" style={{ gap: "var(--space-2)" }}>
              <span className="t-micro">示範狀態</span>
              <Seg
                label="示範狀態"
                value={showEmpty ? "empty" : "has"}
                onChange={(v) => setShowEmpty(v === "empty")}
                options={DEMO_OPTIONS}
              />
            </div>
          }
        />

        {rescheduling && (
          <Panel
            head={
              <span className="row" style={{ gap: "var(--space-2)" }}>
                <IconClock width={18} height={18} />
                <h2>調課・{rescheduling.title}</h2>
              </span>
            }
          >
            <Field label="新開始時間" style={{ maxWidth: 320 }}>
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
          </Panel>
        )}

        <Panel
          head={
            <span className="row" style={{ gap: "var(--space-2)" }}>
              <IconSchedule width={18} height={18} />
              <h2>我的課程</h2>
            </span>
          }
          flush={!showEmpty}
        >
          {showEmpty ? (
            <Empty>您還沒有開過課。</Empty>
          ) : (
            <DataGrid columns={COLUMNS}>
              {courses.map((c) => {
                const meta = STATUS_META[c.status];
                const schedulable = c.status === "OPEN";
                return (
                  <tr key={c.id}>
                    <td>{c.title}</td>
                    <td>{c.branch}</td>
                    <td className="t-num">{c.startTime}</td>
                    <td>
                      <div className="row" style={{ gap: "var(--space-2)", flexWrap: "nowrap" }}>
                        <Cells total={c.capacity} filled={c.confirmed} kind="on" label={`名額 ${c.confirmed}/${c.capacity}`} />
                        <span className="t-num t-note">
                          {c.confirmed}/{c.capacity}
                        </span>
                      </div>
                    </td>
                    <td>
                      {c.wlCap ? (
                        <div className="row" style={{ gap: "var(--space-2)", flexWrap: "nowrap" }}>
                          <Cells total={c.wlCap} filled={c.wl} kind="hold" label={`候補 ${c.wl}/${c.wlCap}`} />
                          <span className="t-num t-note">
                            {c.wl}/{c.wlCap}
                          </span>
                        </div>
                      ) : (
                        <span className="t-note">—</span>
                      )}
                    </td>
                    <td>
                      <Tag kind={meta.tag}>{meta.label}</Tag>
                    </td>
                    <td>
                      {schedulable ? (
                        <div className="dgrid__actions">
                          <Btn
                            size="sm"
                            slash={false}
                            onClick={() => {
                              setReschedulingId(c.id);
                              setRNewStart("");
                            }}
                          >
                            調課
                          </Btn>
                          <Btn size="sm" variant="danger" onClick={() => cancelClass(c.id)}>
                            停課
                          </Btn>
                        </div>
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
