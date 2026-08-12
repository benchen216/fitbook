import { useState } from "react";
import { Btn, Cells, Field, Input, Notice, PageHead, Panel, Seg } from "../components/ui";
import { IconLock, IconSchedule } from "../components/icons";
import TopBar from "../components/TopBar";

const ACCOUNT_STATUS_OPTIONS = [
  { value: "enabled", label: "啟用" },
  { value: "disabled", label: "已停用" },
];

const CELLS_PREVIEW_MAX = 40;

export default function CoachOpenClass() {
  const [accountDisabled, setAccountDisabled] = useState(false);
  const [form, setForm] = useState({ title: "", start: "", duration: 60, capacity: 12, waitlistCap: 5 });
  const [createdMsg, setCreatedMsg] = useState("");

  const capacityNum = Math.max(0, Number(form.capacity) || 0);
  const waitlistNum = Math.max(0, Number(form.waitlistCap) || 0);

  const handleCreate = () => {
    if (accountDisabled || !form.title) return;
    setCreatedMsg(`已開課：${form.title}`);
    setForm({ ...form, title: "", start: "" });
  };

  return (
    <div className="shell">
      <TopBar variant="coach" activeNav="開課" displayName="陳建豪" branchName="信義店" />
      <main className="shell__body">
        <PageHead
          title="開課"
          aside={
            <div className="row" style={{ gap: "var(--space-2)" }}>
              <span className="t-micro">示範：帳號狀態</span>
              <Seg
                label="示範：帳號狀態"
                value={accountDisabled ? "disabled" : "enabled"}
                onChange={(v) => setAccountDisabled(v === "disabled")}
                options={ACCOUNT_STATUS_OPTIONS}
              />
            </div>
          }
        />

        <Notice kind="info">分店與教練姓名已與你的帳號綁定，開課時無法更改。</Notice>

        {accountDisabled && <Notice kind="alert">帳號已停用，暫時無法開課。請聯絡店經理恢復帳號。</Notice>}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "var(--space-5)", alignItems: "start" }}>
          <Panel
            head={
              <span className="row" style={{ gap: "var(--space-2)" }}>
                <IconSchedule width={18} height={18} />
                <h2>開課</h2>
              </span>
            }
          >
            <Field label="課程名稱">
              <Input
                disabled={accountDisabled}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="早晨重量訓練"
              />
            </Field>

            <Field label="開始時間">
              <Input
                type="datetime-local"
                disabled={accountDisabled}
                value={form.start}
                onChange={(e) => setForm({ ...form, start: e.target.value })}
              />
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-4)" }}>
              <Field label="時長(分)">
                <Input
                  type="number"
                  disabled={accountDisabled}
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                />
              </Field>
              <Field label="容量">
                <Input
                  type="number"
                  disabled={accountDisabled}
                  value={form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                />
              </Field>
              <Field label="候補上限">
                <Input
                  type="number"
                  disabled={accountDisabled}
                  value={form.waitlistCap}
                  onChange={(e) => setForm({ ...form, waitlistCap: e.target.value })}
                />
              </Field>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              <Field
                label={
                  <span className="row" style={{ gap: "4px" }}>
                    <IconLock width={14} height={14} />
                    分店
                  </span>
                }
              >
                <Input value="信義店" disabled />
              </Field>
              <Field
                label={
                  <span className="row" style={{ gap: "4px" }}>
                    <IconLock width={14} height={14} />
                    教練
                  </span>
                }
              >
                <Input value="陳建豪" disabled />
              </Field>
            </div>

            <div className="row">
              <Btn variant="primary" disabled={accountDisabled || !form.title} onClick={handleCreate}>
                開課
              </Btn>
            </div>

            {createdMsg && <Notice kind="live">{createdMsg}</Notice>}
          </Panel>

          <Panel head={<h2 className="t-heading">即時預覽</h2>}>
            <div className="dots stack" style={{ padding: "var(--space-4)" }}>
              <div className="stack--tight">
                <span className="t-micro">課程名稱</span>
                <span className="t-num">{form.title || "—"}</span>
              </div>
              <div className="stack--tight">
                <span className="t-micro">開始時間</span>
                <span className="t-num">{form.start || "—"}</span>
              </div>
              <div className="stack--tight">
                <span className="t-micro">名額</span>
                <div className="row" style={{ gap: "var(--space-3)" }}>
                  <Cells
                    total={Math.min(capacityNum, CELLS_PREVIEW_MAX)}
                    filled={Math.min(capacityNum, CELLS_PREVIEW_MAX)}
                    kind="on"
                    size="lg"
                    label={`名額 ${capacityNum}`}
                  />
                  <span className="t-num">{capacityNum}</span>
                </div>
              </div>
              <div className="stack--tight">
                <span className="t-micro">候補上限</span>
                <div className="row" style={{ gap: "var(--space-3)" }}>
                  <Cells
                    total={Math.min(waitlistNum, CELLS_PREVIEW_MAX)}
                    filled={Math.min(waitlistNum, CELLS_PREVIEW_MAX)}
                    kind="hold"
                    size="lg"
                    label={`候補上限 ${waitlistNum}`}
                  />
                  <span className="t-num">{waitlistNum}</span>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </main>
    </div>
  );
}
