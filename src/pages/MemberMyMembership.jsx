import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import { Btn, Cells, Notice, PageHead, Panel, Seg, Tag } from "../components/ui";
import { IconCheckIn } from "../components/icons";

const MEMBERSHIP_STATUS_META = {
  ACTIVE: { tag: "blue", label: "生效中" },
  FROZEN: { tag: "ink", label: "凍結中" },
  EXPIRED: { tag: "neutral", label: "已到期" },
};

/** 年約 VIP is a twelve-month term; the strip draws it a month per cell. */
const TERM_MONTHS = 12;

export default function MemberMyMembership() {
  const navigate = useNavigate();
  const [membershipStatus, setMembershipStatus] = useState("ACTIVE"); // ACTIVE | FROZEN | EXPIRED
  const [bookingStatus, setBookingStatus] = useState("OK"); // OK | SUSPENDED

  const isFrozen = membershipStatus === "FROZEN";
  const isExpired = membershipStatus === "EXPIRED";
  const remainingFreezes = isFrozen ? 0 : 1;
  const usedMonths = isExpired ? TERM_MONTHS : isFrozen ? 7 : 5;
  const statusMeta = MEMBERSHIP_STATUS_META[membershipStatus];

  return (
    <div className="shell">
      <TopBar variant="member" activeNav="我的會籍" displayName="王小明" />
      <main className="shell__body">
        <PageHead
          title="我的會籍"
          desc="到期日與剩餘凍結次數依系統即時計算；申請凍結或退會後，課程列表與預約頁會立即反映最新狀態。"
          aside={
            <>
              <span className="t-micro">示範狀態</span>
              <Seg
                label="示範狀態"
                value={membershipStatus}
                onChange={setMembershipStatus}
                options={[
                  { value: "ACTIVE", label: "生效中" },
                  { value: "FROZEN", label: "凍結中" },
                  { value: "EXPIRED", label: "已到期" },
                ]}
              />
            </>
          }
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "var(--space-5)", alignItems: "start" }}>
          <Panel>
            <div className="spread">
              <div className="stat">
                <span className="stat__v stat__v--ink">年約 VIP</span>
                <span className="t-micro">方案</span>
              </div>
              <div className="stat">
                <Tag kind={statusMeta.tag}>{statusMeta.label}</Tag>
                <span className="t-micro">狀態</span>
              </div>
              <div className="stat">
                <span className="stat__v stat__v--ink">{isExpired ? "2025年11月2日" : "2027年3月15日"}</span>
                <span className="t-micro">到期日</span>
              </div>
              <div className="stat">
                {isExpired ? (
                  <span className="stat__v stat__v--ink">—</span>
                ) : (
                  <span className="row">
                    <Cells total={2} filled={remainingFreezes} label={`剩餘凍結次數 ${remainingFreezes} / 2`} />
                    <span className="t-num">
                      {remainingFreezes}
                      <span className="t-note"> / 2</span>
                    </span>
                  </span>
                )}
                <span className="t-micro">剩餘凍結次數</span>
              </div>
            </div>
            {isFrozen && <Notice kind="hold">會籍已凍結：凍結期間到期日不會倒數，且無法預約課程；剩餘凍結次數 0/2。</Notice>}

            {/* A membership is a length of time, so it is drawn as one: each cell
                is a month of the term, filled up to today. Derived from the
                expiry date already shown above — no new product fact. */}
            <div className="daystrip">
              <div
                className="daystrip__row"
                role="img"
                aria-label={isExpired ? "會籍期間已用盡" : `會籍期間共 ${TERM_MONTHS} 個月，已使用 ${usedMonths} 個月`}
              >
                {Array.from({ length: TERM_MONTHS }, (_, i) => (
                  <span
                    key={i}
                    className={`daystrip__d ${i < usedMonths ? "daystrip__d--spent" : ""} ${isFrozen && i === usedMonths ? "daystrip__d--held" : ""}`}
                    style={{ "--i": i }}
                  />
                ))}
              </div>
              <div className="daystrip__axis">
                <span className="t-micro">會籍期間</span>
                <span className="t-micro">
                  {isExpired ? "已到期" : isFrozen ? "凍結中・不倒數" : `尚餘 ${TERM_MONTHS - usedMonths} 個月`}
                </span>
              </div>
            </div>
          </Panel>

          <Panel
            head={
              <>
                <span className="row" style={{ gap: "var(--space-2)" }}>
                  <IconCheckIn width={18} height={18} />
                  <h2 className="t-heading">我的預約權</h2>
                </span>
                <span className="row">
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
                </span>
              </>
            }
          >
            <p className="t-note">缺席（未報到）以最近 30 天內計算；達到 3 次將暫停預約權一段時間，停權期間仍可取消已預約課程。</p>
            {bookingStatus === "OK" ? (
              <Notice kind="live">預約權正常，最近 30 天記點 1/3。</Notice>
            ) : (
              <Notice kind="alert">預約權已暫停，將於 2026年8月19日 09:00 恢復。</Notice>
            )}
            <div className="stat">
              <span className="row" style={{ gap: "var(--space-2)" }}>
                <Cells total={3} filled={1} kind="alert" size="lg" label="30 天記點 1 / 3" />
                <span className="t-num">
                  1<span className="t-note"> / 3</span>
                </span>
              </span>
              <span className="t-micro">停權門檻</span>
            </div>
            <div className="row">
              <Btn variant="quiet" onClick={() => navigate("/member/courses")}>
                去看課程
              </Btn>
              <Btn variant="quiet" onClick={() => navigate("/member/no-show")}>
                看記點明細
              </Btn>
            </div>
          </Panel>
        </div>
      </main>
    </div>
  );
}
