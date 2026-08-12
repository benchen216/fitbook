import { useState } from "react";
import TopBar from "../components/TopBar";
import { PageHead, Panel, Tag, Btn, Field, Input, Select, DataGrid } from "../components/ui";
import { IconPerson } from "../components/icons";

const COLS = [
  { label: "姓名", width: "30%" },
  { label: "角色", width: "22%" },
  { label: "狀態", width: "24%" },
  { label: "操作", width: "24%" },
];

const INITIAL_STAFF = [
  { id: 1, name: "吳佳蓉", role: "櫃檯人員", active: true },
  { id: 2, name: "鄭雅婷", role: "櫃檯人員", active: true },
  { id: 3, name: "游承恩", role: "教練", active: true },
  { id: 4, name: "賴思婷", role: "教練", active: true },
  { id: 5, name: "簡佩瑜", role: "教練", active: false },
];

export default function StoreManagerStaff() {
  const [staff, setStaff] = useState(INITIAL_STAFF);
  const [nextId, setNextId] = useState(6);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("櫃檯人員");

  const createStaff = () => {
    if (!newName) return;
    setStaff((s) => [...s, { id: nextId, name: newName, role: newRole, active: true }]);
    setNextId((n) => n + 1);
    setNewName("");
  };

  const toggleActive = (id) => setStaff((s) => s.map((x) => (x.id === id ? { ...x, active: !x.active } : x)));

  return (
    <div className="shell">
      <TopBar variant="store_manager" activeNav="員工帳號" displayName="蔡宗翰" branchName="信義店" />
      <main className="shell__body">
        <PageHead title="員工帳號" desc="建立本分店（信義店）的櫃檯人員與教練帳號，並可隨時停用或啟用。" />

        <Panel
          head={
            <h2 className="t-heading row">
              <IconPerson />
              建立員工帳號
            </h2>
          }
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
            <Field label="姓名">
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="吳佳蓉" />
            </Field>
            <Field label="角色">
              <Select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                <option value="櫃檯人員">櫃檯人員</option>
                <option value="教練">教練</option>
              </Select>
            </Field>
          </div>
          <Btn variant="primary" onClick={createStaff}>
            建立
          </Btn>
        </Panel>

        <Panel
          head={
            <h2 className="t-heading row">
              <IconPerson />
              員工列表
            </h2>
          }
          flush
        >
          <DataGrid columns={COLS}>
            {staff.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.role}</td>
                <td>
                  <Tag kind={p.active ? "blue" : "neutral"}>{p.active ? "在職" : "停用"}</Tag>
                </td>
                <td className="dgrid__actions">
                  <Btn size="sm" onClick={() => toggleActive(p.id)}>
                    {p.active ? "停用" : "啟用"}
                  </Btn>
                </td>
              </tr>
            ))}
          </DataGrid>
        </Panel>
      </main>
    </div>
  );
}
