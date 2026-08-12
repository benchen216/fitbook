/**
 * FitBook icon system — drawn on the same construction grid as everything else.
 *
 * Rules, so the set stays one voice: a 24×24 box, marks snapped to the 4px
 * sub-grid, 1.5px strokes with butt caps and mitre joins, zero radius, and the
 * 45° diagonal wherever a mark needs direction. No curves, no filled blobs.
 */

const BASE = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
  "aria-hidden": "true",
  focusable: "false",
};

/** Capacity / a field of slots. */
export function IconField(props) {
  const dots = [];
  for (let y = 5; y <= 19; y += 3.5) {
    for (let x = 5; x <= 19; x += 3.5) {
      dots.push(<rect key={`${x}-${y}`} x={x - 0.6} y={y - 0.6} width={1.2} height={1.2} fill="currentColor" stroke="none" />);
    }
  }
  return (
    <svg {...BASE} {...props}>
      <rect x="2.75" y="2.75" width="18.5" height="18.5" />
      {dots}
    </svg>
  );
}

/** A schedule: the grid with its header band. */
export function IconSchedule(props) {
  return (
    <svg {...BASE} {...props}>
      <rect x="2.75" y="4.75" width="18.5" height="16.5" />
      <path d="M2.75 9.75h18.5M9 9.75V21.25M15 9.75V21.25M2.75 15.5h18.5" />
      <path d="M7 2.75v4M17 2.75v4" />
    </svg>
  );
}

/** The rolling window: a run of days with one marked. */
export function IconWindow(props) {
  return (
    <svg {...BASE} {...props}>
      <rect x="2.75" y="7.75" width="18.5" height="8.5" />
      <path d="M8.5 7.75v8.5M14.5 7.75v8.5" />
      <rect x="8.5" y="7.75" width="6" height="8.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Check-in: crossing the threshold. */
export function IconCheckIn(props) {
  return (
    <svg {...BASE} {...props}>
      <path d="M13.25 2.75h8v18.5h-8" />
      <path d="M2.75 12h11.5M9.5 7.25 14.25 12 9.5 16.75" />
    </svg>
  );
}

/** A person on the roll. */
export function IconPerson(props) {
  return (
    <svg {...BASE} {...props}>
      <rect x="8.75" y="3.75" width="6.5" height="6.5" />
      <path d="M3.75 21.25v-3.5l4-3.5h8.5l4 3.5v3.5" />
    </svg>
  );
}

/** Time remaining, squared off. */
export function IconClock(props) {
  return (
    <svg {...BASE} {...props}>
      <rect x="3.75" y="3.75" width="16.5" height="16.5" />
      <path d="M12 7v5h4.5" />
    </svg>
  );
}

/** Locked / bound to the account. */
export function IconLock(props) {
  return (
    <svg {...BASE} {...props}>
      <rect x="3.75" y="10.75" width="16.5" height="10.5" />
      <path d="M7.75 10.75V7a4.25 4.25 0 0 1 8.5 0v3.75" />
      <path d="M12 14.5v3.5" />
    </svg>
  );
}

/** Expand. The world's own mark, drawn — never the "+" character. */
export function IconPlus(props) {
  return (
    <svg {...BASE} {...props}>
      <path d="M12 4.75v14.5M4.75 12h14.5" />
    </svg>
  );
}

/** Collapse. */
export function IconMinus(props) {
  return (
    <svg {...BASE} {...props}>
      <path d="M4.75 12h14.5" />
    </svg>
  );
}

/** Search: the square lens with its 45° handle. */
export function IconSearch(props) {
  return (
    <svg {...BASE} {...props}>
      <rect x="3.75" y="3.75" width="11.5" height="11.5" />
      <path d="m15.25 15.25 5 5" />
    </svg>
  );
}
