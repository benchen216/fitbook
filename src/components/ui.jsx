/**
 * FitBook shared primitives — Gridded Type Specimen world.
 *
 * Everything here is a rectangle on the construction grid: hairline borders,
 * zero radius, one blue plane, and the 45° diagonal as the only ornament (it
 * always means "this is live / this can be acted on").
 *
 * Styling lives in src/styles/components.css — these components only choose
 * class names, so pages never hardcode a colour or a size.
 */

import { IconField } from "./icons";

/** The system's one ornament. Marks an active or actionable element. */
export function Slash({ size = "", className = "" }) {
  return <span aria-hidden="true" className={`slash ${size === "lg" ? "slash--lg" : ""} ${className}`} />;
}

/**
 * A bordered module on the grid. `head` renders a title bar, `foot` a footer
 * row; `flush` removes body padding for tables that own their own spacing.
 */
export function Panel({ head, foot, flush = false, children, className = "", ...props }) {
  return (
    <section className={`panel ${className}`} {...props}>
      {head ? <div className="panel__head">{head}</div> : null}
      <div className={`panel__body ${flush ? "panel__body--flush" : ""}`}>{children}</div>
      {foot ? <div className="panel__foot">{foot}</div> : null}
    </section>
  );
}

/** Page title with its rule. Optional `aside` sits on the right of the rule. */
export function PageHead({ title, desc, aside }) {
  return (
    <header className="page-head">
      <div className="page-head__text">
        <h1 className="t-title">{title}</h1>
        {desc ? <p className="t-note">{desc}</p> : null}
      </div>
      {aside ? <div className="row">{aside}</div> : null}
    </header>
  );
}

const NOTICE_ROLE = { alert: "alert", hold: "status", live: "status", info: "status" };

/** Flat-fill state banner. `kind`: info | live | alert | hold. */
export function Notice({ kind = "info", children }) {
  return (
    <p className={`notice notice--${kind}`} role={NOTICE_ROLE[kind]}>
      <Slash />
      <span className="notice__text">{children}</span>
    </p>
  );
}

/** Inline state label. `kind`: blue | live | alert | hold | neutral | solid. */
export function Tag({ kind = "neutral", children }) {
  return <span className={`tag tag--${kind}`}>{children}</span>;
}

/**
 * `variant`: default | primary | quiet | danger. Default and primary carry the
 * diagonal; pass `slash={false}` to drop it (compact cells, icon-less rows).
 */
export function Btn({ variant = "default", size, slash, children, className = "", ...props }) {
  const carriesSlash = slash ?? (variant === "default" || variant === "primary");
  const classes = [
    "btn",
    variant !== "default" ? `btn--${variant}` : "",
    size === "sm" ? "btn--sm" : "",
    carriesSlash ? "btn--split" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={classes} {...props}>
      <span>{children}</span>
      {carriesSlash ? <Slash /> : null}
    </button>
  );
}

/**
 * Segmented radio group. Used by the demo-state switches that let one screen
 * show every state — see README; these are not real product controls.
 */
export function Seg({ options, value, onChange, name, label }) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map((opt) => {
        const on = value === opt.value;
        return (
          <label key={opt.value} className={`seg__opt ${on ? "seg__opt--on" : ""}`}>
            <input
              type="radio"
              name={name || label || "seg"}
              checked={on}
              onChange={() => onChange(opt.value)}
            />
            {opt.label}
          </label>
        );
      })}
    </div>
  );
}

export function Field({ label, children, style }) {
  return (
    <label className="field" style={style}>
      <span className="t-micro">{label}</span>
      {children}
    </label>
  );
}

export function Input({ className = "", ...props }) {
  return <input className={`input ${className}`} {...props} />;
}

export function Select({ className = "", children, ...props }) {
  return (
    <select className={`input ${className}`} {...props}>
      {children}
    </select>
  );
}

/**
 * Data grid. `columns` is `[{ label, width }]`; children are `<tr>` rows whose
 * cells line up with those columns.
 */
export function DataGrid({ columns, children, caption }) {
  return (
    <div className="dgrid__scroll">
      <table className="dgrid">
        {caption ? <caption className="t-micro">{caption}</caption> : null}
        <colgroup>
          {columns.map((c) => (
            <col key={c.label} style={c.width ? { width: c.width } : undefined} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.label} scope="col">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

/**
 * The record built cell by cell — capacity, waitlist, and the 30-day point
 * window all read as the same object.
 *
 * `total` cells are drawn; the first `filled` are solid in `kind`; the next
 * `spent` are dashed (used up, or rolled out of the window).
 */
export function Cells({ total, filled = 0, spent = 0, kind = "on", size, fit = false, label }) {
  const cells = Array.from({ length: total }, (_, i) => {
    if (i < filled) return `cells__c cells__c--${kind}`;
    if (i < filled + spent) return "cells__c cells__c--spent";
    return "cells__c";
  });
  const classes = ["cells", size === "lg" ? "cells--lg" : "", fit ? "cells--fit" : ""].filter(Boolean).join(" ");
  return (
    <span className={classes} role="img" aria-label={label}>
      {cells.map((cls, i) => (
        <span key={i} className={cls} style={{ "--i": i }} />
      ))}
    </span>
  );
}

/** A number that owns its cell. `tone`: blue | ink | alert. */
export function Stat({ label, value, tone = "blue", note }) {
  return (
    <div className="stat">
      <span className={`stat__v ${tone === "blue" ? "" : `stat__v--${tone}`}`}>{value}</span>
      <span className="t-micro">{label}</span>
      {note ? <span className="t-note">{note}</span> : null}
    </div>
  );
}

export function Empty({ children, action, icon }) {
  return (
    <div className="empty">
      <span className="empty__mark">{icon || <IconField width={28} height={28} />}</span>
      <p>{children}</p>
      {action}
    </div>
  );
}
