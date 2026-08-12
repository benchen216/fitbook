# FitBook — React app scaffold (design handoff)

A runnable Vite + React + React Router project structure, built from the FitBook design
prototypes. This is still a **design reference** — inline-styled, no data layer, no auth — but
it's laid out the way a real React app is: `src/pages`, `src/components`, `src/tokens.js`,
routed with `react-router-dom`.

## Run it

```
npm install
npm run dev
```

Opens at `/` (login/role-picker) with routes for all 13 authenticated screens (see `src/App.jsx`).

## Structure

```
fitbook-react/
├── package.json, vite.config.js, index.html
├── src/
│   ├── main.jsx          — entry point
│   ├── App.jsx            — route table (illustrative — swap for real auth/routing)
│   ├── tokens.js          — design tokens (colors, type, spacing) lifted from Broadsheet
│   ├── components/
│   │   ├── ui.jsx         — shared primitives: Section, Notice, Tag, Btn, Seg, Field, Input, Select, TableHead/TableRow
│   │   └── TopBar.jsx     — sticky nav bar, used by every authenticated screen
│   └── pages/             — one file per screen (14 total, see table below)
└── prototypes/            — original interactive HTML prototypes, one per screen, for reference
```

## About fidelity
High-fidelity: colors, type, spacing and copy are final per the bound Broadsheet design system.
Recreate pixel-for-pixel in the target codebase; only styling method/data layer should change.
Screens use inline styles + the shared `ui.jsx` primitives rather than a CSS framework — swap
`tokens.js`/`ui.jsx` for the target app's own design-token layer and component library, keeping
the values from `tokens.js`.

## Known prototype quirk
The interactive prototypes hit a bug where native `<table>`/`<select><option>` fed by a loop
didn't bind correctly in the prototyping tool's template engine — worked around with CSS Grid
rows (`TableHead`/`TableRow` in `ui.jsx`) instead of native `<table>`. Not a design requirement:
use a real `<table>` or your own data-grid component if you prefer, matching the same columns.

## Screens

| Route | File | Role / screen | Nav label |
| --- | --- | --- | --- |
| `/` | `pages/LoginRolePicker.jsx` | Login / role picker | — |
| `/guest` | `pages/GuestEmptyState.jsx` | Guest | 未登入 |
| `/member/membership` | `pages/MemberMyMembership.jsx` | Member | 我的會籍 |
| `/member/courses` | `pages/MemberCourseList.jsx` | Member | 課程列表 |
| `/member/bookings` | `pages/MemberMyBookings.jsx` | Member | 我的預約 |
| `/member/no-show` | `pages/MemberNoShowSuspension.jsx` | Member | 爽約與停權 |
| `/front-desk/members` | `pages/FrontDeskMembers.jsx` | Front desk | 會員與會籍 |
| `/front-desk/booking` | `pages/FrontDeskBooking.jsx` | Front desk | 代預約 |
| `/front-desk/checkin` | `pages/FrontDeskCheckin.jsx` | Front desk | 報到作業 |
| `/store-manager/courses` | `pages/StoreManagerCourses.jsx` | Store manager | 課程管理 |
| `/store-manager/staff` | `pages/StoreManagerStaff.jsx` | Store manager | 員工帳號 |
| `/store-manager/counter` | `pages/StoreManagerCounter.jsx` | Store manager | 櫃檯作業 |
| `/coach/open-class` | `pages/CoachOpenClass.jsx` | Coach | 開課 |
| `/coach/my-courses` | `pages/CoachMyCourses.jsx` | Coach | 我的課程 |

`TopBar` reads `variant`/`activeNav`/`displayName`/`branchName` props on each page to render the
right chip and nav pills — see any page file for the call.

## Interactions & Behavior
- "示範" (demo) segmented controls that toggle FROZEN/ACTIVE, has-bookings/empty, etc. exist
  purely to show every visual state in one file — they aren't real product controls. Remove
  once real data drives these states.
- Book/cancel/freeze/unfreeze/check-in/open-class/reschedule actions are wired to local
  `useState` for demonstration; replace with real API calls.
- `App.jsx`'s routing is illustrative — there's no auth guard. `LoginRolePicker` calls
  `onLogin({role, name, desc})` on selection; `App.jsx` wires that to `navigate()` to each
  role's first screen. Replace with real auth once it exists.

## Design Tokens
See `src/tokens.js`. Background `#f3f2f2`, text `#201e1d`, accent (cyan) ramp `#e9f8ff`→`#004961`,
accent-2 (magenta) `#d82071`/`#790e3d`, process yellow `#edbb00` (amber/warn states), Source
Serif 4 for heading + body, 4px card radius, `0 1px 2px rgba(45,43,43,.14)` shadow. Success/danger
green/red aren't in this design system (cyan + magenta only) — they're derived in OKLCH
(`oklch(94% 0.045 150)` / `oklch(94% 0.045 25)` etc.) matching the ramps' lightness/chroma; keep
using OKLCH derivation for any new status color rather than picking an arbitrary hex.

## Assets
None — no icons or photography on any screen (one inline lock SVG on the guest empty state).
