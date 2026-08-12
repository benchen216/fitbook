import { useState } from "react";
import TopBar from "../components/TopBar";
import { PageHead, Panel, Notice, Tag, Btn, Field, Input, Select, DataGrid, Cells, Empty } from "../components/ui";
import { IconPerson, IconSearch } from "../components/icons";

const STATUS_META = {
  NO_PLAN: { label: "無會籍", tag: "neutral" },
  PENDING_PAYMENT: { label: "待付款", tag: "hold" },
  ACTIVE: { label: "生效中", tag: "blue" },
  FROZEN: { label: "凍結中", tag: "ink" },
};

const COLS = [
  { label: "會員#", width: "10%" },
  { label: "手機", width: "16%" },
  { label: "方案", width: "12%" },
  { label: "狀態", width: "12%" },
  { label: "到期日", width: "16%" },
  { label: "凍結次數", width: "14%" },
  { label: "作業", width: "20%" },
];

const PLAN_OPTIONS = ["月約", "季約", "年約", "年約 VIP"];

const INITIAL_MEMBERS = [
  { id: "#1001", phone: "0912-345-678", plan: "—", status: "NO_PLAN", expiry: "—", freeze: null, selectedPlan: "月約" },
  { id: "#1002", phone: "0923-456-789", plan: "季約", status: "PENDING_PAYMENT", expiry: "—", freeze: 0, selectedPlan: "季約" },
  { id: "#1003", phone: "0934-567-890", plan: "年約 VIP", status: "ACTIVE", expiry: "2027年2月10日", freeze: 1 },
  { id: "#1004", phone: "0945-678-901", plan: "月約", status: "FROZEN", expiry: "2026年9月5日", freeze: 2 },
  { id: "#1005", phone: "0956-789-012", plan: "年約", status: "ACTIVE", expiry: "2027年5月1日", freeze: 0 },
];

/** Reused as-is inside Store Manager's 櫃檯作業 screen — same table/actions, manager shell. */
export default function FrontDeskMembers() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [nextId, setNextId] = useState(1006);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [createdMsg, setCreatedMsg] = useState("");
  const [lookupPhone, setLookupPhone] = useState("");
  const [lookupResult, setLookupResult] = useState(null); // { text, found }

  const update = (id, patch) => setMembers((ms) => ms.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  return (
    <div className="shell">
      <TopBar variant="front_desk" activeNav="會員與會籍" displayName="吳佳蓉" branchName="信義店" />
      <main className="shell__body">
        <PageHead title="會員與會籍" desc="建立會員主檔、以電話查詢會員，並執行購買會籍、標記付款、凍結與解凍等會籍作業。" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
          <Panel
            head={
              <h2 className="row">
                <IconPerson />
                Step 1・建立會員主檔
              </h2>
            }
          >
            <div className="stack">
              <Field label="姓名">
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="王小明" />
              </Field>
              <Field label="手機">
                <Input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder="0912-345-678" />
              </Field>
              <Field label="Email">
                <Input placeholder="name@example.com" />
              </Field>
              <Field label="身分證">
                <Input placeholder="A123456789" />
              </Field>
              <Btn
                variant="primary"
                onClick={() => {
                  if (!newName || !newPhone) return;
                  const id = `#${nextId}`;
                  setMembers((ms) => [
                    ...ms,
                    { id, phone: newPhone, plan: "—", status: "NO_PLAN", expiry: "—", freeze: null, selectedPlan: "月約" },
                  ]);
                  setNextId((n) => n + 1);
                  setCreatedMsg(`已建立會員 ${id}（${newName}）`);
                  setNewName("");
                  setNewPhone("");
                }}
              >
                建立會員
              </Btn>
              {createdMsg && <Notice kind="live">{createdMsg}</Notice>}
            </div>
          </Panel>

          <Panel
            head={
              <h2 className="row">
                <IconSearch />
                Step 2・電話查詢會員
              </h2>
            }
          >
            <div className="stack">
              <div className="row">
                <Input
                  value={lookupPhone}
                  onChange={(e) => setLookupPhone(e.target.value)}
                  placeholder="輸入手機號碼"
                  style={{ maxWidth: 240 }}
                />
                <Btn
                  onClick={() => {
                    const found = lookupPhone.trim() && members.find((m) => m.phone.includes(lookupPhone.trim()));
                    setLookupResult(
                      found
                        ? {
                            text: `找到會員 ${found.id}，方案：${found.plan}，狀態：${STATUS_META[found.status].label}`,
                            found: true,
                            member: found,
                          }
                        : { text: "找不到符合的會員", found: false, member: null }
                    );
                  }}
                >
                  查詢
                </Btn>
              </div>
              {lookupResult ? (
                <div className="stack--tight">
                  <Notice kind={lookupResult.found ? "live" : "alert"}>{lookupResult.text}</Notice>
                  {lookupResult.found && lookupResult.member.freeze !== null && (
                    <div className="row">
                      <span className="t-micro">凍結次數</span>
                      <Cells
                        total={2}
                        filled={lookupResult.member.freeze}
                        kind="hold"
                        label={`凍結次數 ${lookupResult.member.freeze}/2`}
                      />
                      <span className="t-num t-note">{lookupResult.member.freeze}/2</span>
                    </div>
                  )}
                </div>
              ) : (
                <Empty icon={<IconSearch width={28} height={28} />}>輸入手機號碼查詢會員</Empty>
              )}
            </div>
          </Panel>
        </div>

        <Panel
          head={
            <h2 className="row">
              <IconPerson />
              Step 3・會員與會籍作業
            </h2>
          }
          flush
        >
          <DataGrid columns={COLS}>
            {members.map((m) => (
              <tr key={m.id}>
                <td className="t-num">{m.id}</td>
                <td className="t-num">{m.phone}</td>
                <td>{m.plan}</td>
                <td>
                  <Tag kind={STATUS_META[m.status].tag}>{STATUS_META[m.status].label}</Tag>
                </td>
                <td className="t-num">{m.expiry}</td>
                <td>
                  {m.freeze === null ? (
                    <span className="t-note">—</span>
                  ) : (
                    <span className="row" style={{ gap: "var(--space-2)" }}>
                      <Cells total={2} filled={m.freeze} kind="hold" label={`凍結次數 ${m.freeze}/2`} />
                      <span className="t-num t-note">{m.freeze}/2</span>
                    </span>
                  )}
                </td>
                <td>
                  <div className="dgrid__actions">
                    {m.status === "NO_PLAN" && (
                      <>
                        <Select
                          className="input--sm"
                          style={{ maxWidth: 140 }}
                          value={m.selectedPlan}
                          onChange={(e) => update(m.id, { selectedPlan: e.target.value })}
                        >
                          {PLAN_OPTIONS.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </Select>
                        <Btn size="sm" onClick={() => update(m.id, { plan: m.selectedPlan || "月約", status: "PENDING_PAYMENT" })}>
                          購會籍
                        </Btn>
                      </>
                    )}
                    {m.status === "PENDING_PAYMENT" && (
                      <Btn
                        variant="primary"
                        size="sm"
                        onClick={() => update(m.id, { status: "ACTIVE", expiry: "2027年8月12日", freeze: 0 })}
                      >
                        標記付款
                      </Btn>
                    )}
                    {m.status === "ACTIVE" && (
                      <>
                        <Input
                          className="input--sm"
                          style={{ maxWidth: 160 }}
                          placeholder="凍結原因"
                          onChange={(e) => update(m.id, { freezeReason: e.target.value })}
                        />
                        <Btn size="sm" onClick={() => update(m.id, { status: "FROZEN" })}>
                          凍結
                        </Btn>
                      </>
                    )}
                    {m.status === "FROZEN" && (
                      <Btn size="sm" onClick={() => update(m.id, { status: "ACTIVE" })}>
                        解凍
                      </Btn>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </DataGrid>
        </Panel>
      </main>
    </div>
  );
}
