import { useState } from "react";
import TopBar from "../components/TopBar";
import { PageHead, Panel, Notice, Tag, Btn, Field, Input, Select, DataGrid, Cells } from "../components/ui";
import { IconSearch, IconPerson } from "../components/icons";

const STATUS_META = {
  NO_PLAN: { label: "無會籍", kind: "neutral" },
  PENDING_PAYMENT: { label: "待付款", kind: "hold" },
  ACTIVE: { label: "生效中", kind: "blue" },
  FROZEN: { label: "凍結中", kind: "ink" },
};

const PLAN_OPTIONS = ["月約", "季約", "年約", "年約 VIP"];

const COLS = [
  { label: "會員#", width: "10%" },
  { label: "手機", width: "16%" },
  { label: "方案", width: "12%" },
  { label: "狀態", width: "12%" },
  { label: "到期日", width: "14%" },
  { label: "凍結次數", width: "14%" },
  { label: "作業", width: "22%" },
];

const INITIAL_MEMBERS = [
  { id: "#1001", phone: "0912-345-678", plan: "—", status: "NO_PLAN", expiry: "—", freezeUsed: null, selectedPlan: "月約" },
  { id: "#1002", phone: "0923-456-789", plan: "季約", status: "PENDING_PAYMENT", expiry: "—", freezeUsed: 0, selectedPlan: "季約" },
  { id: "#1003", phone: "0934-567-890", plan: "年約 VIP", status: "ACTIVE", expiry: "2027年2月10日", freezeUsed: 1, selectedPlan: "月約" },
  { id: "#1004", phone: "0945-678-901", plan: "月約", status: "FROZEN", expiry: "2026年9月5日", freezeUsed: 2, selectedPlan: "月約" },
  { id: "#1005", phone: "0956-789-012", plan: "年約", status: "ACTIVE", expiry: "2027年5月1日", freezeUsed: 0, selectedPlan: "月約" },
];

export default function StoreManagerCounter() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [nextId, setNextId] = useState(1006);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [lookupPhone, setLookupPhone] = useState("");
  const [lookupResult, setLookupResult] = useState(null);

  const update = (id, patch) => setMembers((ms) => ms.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const quickCreate = () => {
    if (!newName || !newPhone) return;
    const id = `#${nextId}`;
    setMembers((ms) => [...ms, { id, phone: newPhone, plan: "—", status: "NO_PLAN", expiry: "—", freezeUsed: null, selectedPlan: "月約" }]);
    setNextId((n) => n + 1);
    setNewName("");
    setNewPhone("");
  };

  const lookup = () => {
    const q = lookupPhone.trim();
    const found = q && members.find((m) => m.phone.includes(q));
    setLookupResult(found ? { text: `找到 ${found.id}，狀態：${STATUS_META[found.status].label}`, found: true } : { text: "找不到符合的會員", found: false });
  };

  return (
    <div className="shell">
      <TopBar variant="store_manager" activeNav="櫃檯作業" displayName="蔡宗翰" branchName="信義店" />
      <main className="shell__body shell__body--wide">
        <PageHead title="櫃檯作業" desc="店經理也能直接執行本分店的櫃檯作業，作業結果會即時反映在下方會員列表。" />

        <Notice kind="info">
          身為店經理，你也可以直接執行本分店（信義店）的櫃檯作業，例如建立會員主檔、購買 / 標記付款 / 凍結與解凍會籍。
        </Notice>

        <Panel
          head={
            <h2 className="t-heading row">
              <IconSearch />
              快速建檔／手機查詢
            </h2>
          }
        >
          <div className="row" style={{ gap: "var(--space-6)" }}>
            <div className="row" style={{ gap: "var(--space-2)" }}>
              <Field label="姓名">
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="王小明" />
              </Field>
              <Field label="手機">
                <Input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder="0912-345-678" />
              </Field>
              <Btn size="sm" onClick={quickCreate}>
                快速建檔
              </Btn>
            </div>
            <div className="row" style={{ gap: "var(--space-2)" }}>
              <Field label="查詢手機">
                <Input value={lookupPhone} onChange={(e) => setLookupPhone(e.target.value)} placeholder="輸入手機號碼" />
              </Field>
              <Btn size="sm" onClick={lookup}>
                查詢
              </Btn>
            </div>
          </div>
          {lookupResult && <Notice kind={lookupResult.found ? "live" : "alert"}>{lookupResult.text}</Notice>}
        </Panel>

        <Panel
          head={
            <h2 className="t-heading row">
              <IconPerson />
              會員與會籍作業
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
                  <Tag kind={STATUS_META[m.status].kind}>{STATUS_META[m.status].label}</Tag>
                </td>
                <td className="t-num">{m.expiry}</td>
                <td>
                  {m.freezeUsed == null ? (
                    <span className="t-note">—</span>
                  ) : (
                    <div className="row" style={{ gap: "var(--space-2)" }}>
                      <Cells total={2} filled={m.freezeUsed} kind="hold" label={`凍結次數 ${m.freezeUsed}/2`} />
                      <span className="t-num">{m.freezeUsed}/2</span>
                    </div>
                  )}
                </td>
                <td className="dgrid__actions">
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
                    <Btn variant="primary" size="sm" onClick={() => update(m.id, { status: "ACTIVE", expiry: "2027年8月12日", freezeUsed: 0 })}>
                      標記付款
                    </Btn>
                  )}
                  {m.status === "ACTIVE" && (
                    <>
                      <Input className="input--sm" placeholder="凍結原因" style={{ maxWidth: 140 }} />
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
                </td>
              </tr>
            ))}
          </DataGrid>
        </Panel>
      </main>
    </div>
  );
}
