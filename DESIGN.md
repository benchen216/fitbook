---
name: FitBook
description: 把名額、記點、會籍期間全部畫在同一張可見構造格線上的健身房營運系統。
colors:
  paper: "#ffffff"
  surface: "#f5f7fa"
  surface-sunk: "#eef1f6"
  grid-line: "#e6ebf2"
  grid-line-strong: "#d3dbe6"
  ink: "#111111"
  ink-muted: "#5b6470"
  ink-faint: "#6b7480"
  ink-inverse: "#ffffff"
  blue: "#0057ff"
  blue-deep: "#0040bf"
  blue-wash: "#e8efff"
  alert: "hsl(0 72% 42%)"
  hold: "hsl(40 90% 30%)"
  live: "hsl(140 60% 28%)"
  info-ink: "hsl(210 70% 38%)"
typography:
  display:
    fontFamily: "Archivo Expanded, Noto Sans TC, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.2rem + 6.4vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.02em"
    fontVariation: "font-stretch: 125%"
  headline:
    fontFamily: "Archivo Expanded, Noto Sans TC, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2.4vw, 3.25rem)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Noto Sans TC, Archivo Expanded, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.15
  figure:
    fontFamily: "Archivo Expanded, Noto Sans TC, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.05
  figureSm:
    fontFamily: "Archivo Expanded, Noto Sans TC, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1
  body:
    fontFamily: "Noto Sans TC, Archivo Expanded, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  note:
    fontFamily: "Noto Sans TC, Archivo Expanded, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo Expanded, Noto Sans TC, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    letterSpacing: "0.07em"
  numeric:
    fontFamily: "Archivo Expanded, Noto Sans TC, system-ui, sans-serif"
    fontWeight: 700
    letterSpacing: "0"
    fontFeature: "tnum 1"
rounded:
  none: "0"
spacing:
  cell: "8px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "24px"
  6: "32px"
  7: "48px"
  8: "64px"
  section: "clamp(32px, 2rem + 2vw, 56px)"
components:
  panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "24px"
  panel-head:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  btn-default:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "8px 14px"
    height: "38px"
    typography: "{typography.note}"
  btn-default-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue}"
  btn-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.ink-inverse}"
    rounded: "{rounded.none}"
    padding: "8px 14px"
    height: "38px"
  btn-primary-hover:
    backgroundColor: "{colors.blue-deep}"
    textColor: "{colors.ink-inverse}"
  btn-quiet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue}"
    padding: "8px 6px"
  btn-danger:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.alert}"
    padding: "8px 6px"
  btn-disabled:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-faint}"
  btn-sm:
    padding: "4px 10px"
    height: "30px"
    typography: "{typography.label}"
  tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-muted}"
    padding: "2px 0"
    typography: "{typography.label}"
  tag-solid:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.ink-inverse}"
    padding: "2px 8px"
  notice:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "7px 10px"
    height: "38px"
  input-disabled:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-muted}"
  seg-opt:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-muted}"
    padding: "6px 12px"
    typography: "{typography.label}"
  seg-opt-on:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.ink-inverse}"
  topbar-link:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-muted}"
    padding: "7px 14px"
  topbar-link-on:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.ink-inverse}"
  cell:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.none}"
    width: "12px"
    height: "12px"
  cell-on:
    backgroundColor: "{colors.blue}"
  daystrip-day:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "28px"
  stat-value:
    textColor: "{colors.blue}"
    typography: "{typography.numeric}"
    size: "1.75rem"
---

# Design System: FitBook

## Overview

**Creative North Star: 「格線字體樣本」（The Gridded Type Specimen）**

這是一份印在紙上的構造格線字體樣本，不是一個管理後台。整個系統建立在一張**看得見**的 24px 構造格線上：格線不是被藏起來當作對齊工具，它留在畫面上，成為設計本身。每一個模組、每一條髮絲線、每一顆計數格子都咬在這張格線上，所以畫面的秩序感來自結構本身，而不是來自卡片陰影或圓角。

系統的密度偏高而不擁擠：資訊以矩形模組並排，模組之間靠 1px 髮絲線與 2px 墨線分界，不靠留白漂浮。整體是純平面的——全站沒有任何一條 `box-shadow`，沒有任何一個圓角。深度只由三件事表達：線的粗細（1px 髮絲 / 2px 墨線）、面的明度（`paper` / `surface` / `surface-sunk`），以及固定在最上層的紙面顆粒層。顏色極度節制：畫面幾乎全是墨、格線與紙，Crouwel 藍是唯一被允許鋪成「面」的顏色，而它一律只代表「這是作用中的／這是主要動作」。

被明確拒絕的是「側邊欄 + 白卡 + 大統計數字」那套後台預設排列，以及淡彩底色狀態晶片（pastel status pill）。狀態不加底色、不加外框，只用文字色說話。

**Key Characteristics:**
- 可見的 24px 構造格線是版面的骨架，不是背景裝飾
- 零圓角、零陰影：純平面，1px 髮絲線與 2px 墨線負責所有分界
- 一個藍平面代表「作用中」，一個 45° 斜線代表「可操作」
- 任何「N 之中的 M」一律畫成格子（Cells），而不是進度條或百分比
- 自架的 Archivo Expanded（寬體 125%、可變 600–900）配 Noto Sans TC；數字一律等寬
- 紙面顆粒層覆蓋全站，讓底色讀起來像啞光紙而不是發光螢幕

## Colors

一組近乎單色的墨—格線—紙中性層，加上一個純度極高的 Crouwel 藍，以及四個只以文字形式出現的狀態色。

### Primary
- **Crouwel 藍**（`blue`）：系統唯一被允許鋪成整面的顏色。用於：導覽列的作用中項目、分段控制的作用中選項、主要按鈕、`Cells` 的已填格、`Stat` 數字、連結、`::selection`、焦點外框、以及登入頁被選中的角色模組。
- **深藍**（`blue-deep`）：所有藍平面的 hover 狀態，唯一用途。
- **藍薄面**（`blue-wash`）：全站只用在登入頁的人員清單被選中／hover 的底色（`.login__person`）。這是唯一一處以淡色底表示選取的地方，因為那是一片密集的可點格子，不是狀態標籤。

### Neutral
- **墨**（`ink`）：正文、標題、以及所有 2px 結構線（頁首下緣、表頭下緣、`Stat` 左緣、頂欄下緣、登入頁的分隔線）。
- **次要墨**（`ink-muted`）：說明文、微標籤、表頭文字、中性狀態標籤。
- **淡墨**（`ink-faint`）：placeholder、停用文字、空狀態圖示。
- **反白墨**（`ink-inverse`）：藍平面上的文字。
- **紙**（`paper`）：所有模組、按鈕、輸入框、未填格子的底。
- **面**（`surface`）：模組標題列、表格 row hover、停用按鈕底、登入頁示範區底。
- **沉面**（`surface-sunk`）：日曆帶上「已滾出窗口」的格子、停用輸入框斜紋的暗紋。
- **格線**（`grid-line`）：body 上那張可見構造格線、以及表格列的分隔線。
- **強格線**（`grid-line-strong`）：模組外框、輸入框外框、未填計數格的邊、`.dots` 點陣、以及 `.slash` 的靜置色。

### Tertiary
狀態色。四個色相取自另一套色票（綠 140、紅 0、橘 40、資訊 210），並各自把明度壓深一階，因為在這個系統裡狀態色永遠是白底上的**裸文字標籤**而不是填色底上的文字——來源色票的橘在 42% 明度只有 2.6:1，作為裸標籤不合格。

- **警示**（`alert`）：已停課、候補已滿、停權、爽約記點格、危險動作按鈕、`Stat` 的警示數字。
- **待處理**（`hold`）：滿額可候補、待付款、候補計數格、凍結次數格、報到窗口進行中。
- **進行中**（`live`）：可預約、會籍生效中。
- **資訊墨**（`info-ink`）：藍色狀態標籤的專用文字色。標籤是裸文字，需要比 `blue` 更深的藍才能在白底上讀得清楚；`blue` 本身留給平面用。

### Named Rules

**唯一藍面規則（The One Blue Plane Rule）.** 藍色鋪成整面時，只能代表一件事：「這是作用中的／這是主要動作」。導覽列的作用中項目、分段控制的作用中選項、主要按鈕、被選中的角色模組，用的都是同一個藍平面。不要拿藍當裝飾底色、不要拿藍當分區底。

**狀態用說的規則（The Stated-State Rule）.** 狀態標籤沒有邊框、沒有底色、白底，只用文字色和字重表達差異。一張二十列的表格必須維持是一張表格，而不是一面晶片牆。凍結（`tag--ink`）刻意用全墨陳述——它是「暫停」而非「錯誤」，不該去和待付款（橘，需要付錢）或已到期（灰，已失效）搶注意力。

**裸標籤對比規則（The Bare-Label Contrast Rule）.** 任何新增的狀態色，明度必須讓它在 `paper` 上作為裸文字達到 4.5:1。狀態色不會有底色來救它。

## Typography

**Display Font:** Archivo Expanded（自架，`font-stretch: 125%`，可變字重 600–900，僅 Latin 與 Latin-ext 兩個 unicode-range 子集）
**Body Font:** Noto Sans TC（Google Fonts，400/500/700/900）
**Label / Numeric Font:** Archivo Expanded（同顯示字，數字啟用 `tabular-nums`）

**Character:** 寬、黑、構造感的無襯線大寫字，是這個世界的紀念碑式建築積木——寬體來自字體樣本傳統，不是 sci-fi HUD 的切角字。中文交給 Noto Sans TC，兩者的字重與灰度刻意對齊（顯示層 700/900）。CJK 不加字距，Latin 微標籤加 0.07em 讓大寫透氣——同一套 stack 同時處理兩種需求。

### Hierarchy
- **Display**（700，clamp 2.75–6rem，line-height 0.92，全大寫）：只用在登入頁的品牌字（`.login__word`，line-height 壓到 0.82）與訪客空狀態的主標。這是整個系統最大的聲音，一個畫面最多一次。
- **Headline**（900，clamp 2–3.25rem，line-height 1.02）：每個畫面的 `PageHead` 標題，下方永遠壓一條 2px 墨線。
- **Title**（700，1.125rem）：模組標題（`.panel__head` 內為 900）。
- **Figure**（700，1.75rem，等寬）：統計欄位的主數字（`--text-figure`）。同一角色在登入頁的計量欄縮為 1.375rem（`--text-figure-sm`），因為三欄並排時 1.75rem 會撞到欄寬。這兩級只給數字用，不給文字用。
- **Body**（400，0.9375rem，line-height 1.6，max-width 68ch）：正文。頁首說明文另收窄至 62ch。
- **Note**（400，0.8125rem，`ink-muted`）：輔助說明、單位、比值的分母。
- **Label**（600，0.6875rem，字距 0.07em，全大寫，顯示字）：欄位標籤、表頭、單位標籤、微標題。這是全站使用頻率最高的類型角色。
- **Numeric**（700，`tabular-nums` + `tnum`，字距 0）：所有數字，包含日期、時間、電話、比值、計數。

### Named Rules

**等寬數字規則（The Tabular Rule）.** 畫面上任何數字都走數字角色（`.t-num` / `.stat__v` / `.login__meter b`），一律等寬。這個產品的內容是名額、記點與期間，數字必須在列與列之間對齊成一欄。

**無 eyebrow 規則（The No-Eyebrow Rule）.** 頁首是「標題 + 2px 墨線」，標題上方不放小字 kicker／eyebrow。層級由字級對比與那條線建立，不由多加一層標籤建立。

**比值寫法規則（The Ratio Rule）.** 「M / N」一律寫成數字角色的分子，接一個 note 角色的「 / N」；旁邊配一組 `Cells`。數字說得精確，格子說得直覺，兩者永遠成對出現。

## Layout

版面建立在單一格子單位 `cell = 8px` 上，所有間距都是它的倍數（8/12/16/24/32/48/64）。body 的背景是一張 24px（3 × cell）的雙向 1px 格線，全站可見。

**Shell.** 每個畫面是 `.shell`（垂直 flex，滿版高）＋ sticky 頂欄 ＋ `.shell__body`。內容區最大寬 1180px 置中，左右 padding 24px，上方 `section` 間距為 clamp(32px, 2rem + 2vw, 56px)，下方 64px，區塊之間固定 32px。資料量大的畫面改用 `--wide` 變體放寬到 1320px。

**模組網格.** 畫面內的模組排列一律是 `repeat(auto-fit, minmax(<280–360px>, 1fr))` 的自適應網格，間距 24–32px，`align-items: start`（模組不互相拉齊高度）。斷點是內建在 minmax 裡的，不靠 media query。

**登入頁.** 唯一的雙欄佈局：左 1.05fr（sticky 的論點半屏，含品牌字、承諾句與三組計量），右 1fr（角色模組 + 人員清單 + 示範區），中間一條 2px 墨線。940px 以下塌成單欄，那條墨線從右緣轉到下緣。

**表格.** `border-collapse: collapse`，表頭下 2px 墨線、資料列下 1px 淡格線，橫向溢位由 `.dgrid__scroll` 承接。

**斷點.** 只有兩個真實 media query：720px（頂欄改為堆疊、導覽列改橫向捲動）與 940px（登入頁塌成單欄）。其餘響應行為都由 `auto-fit` / `minmax` / `clamp` 內建。

### Named Rules

**八格規則（The Eight-Grid Rule）.** 沒有任意數值。所有間距、尺寸、內距都是 8px 格子的倍數（或明確的 4px 半格）。要加一個新間距時，取既有的 space token，不要寫新數字。

**格線在上規則（The Grid-Stays-Visible Rule）.** 構造格線不可以被整片不透明底色蓋掉。模組是白紙貼在格線上，模組之間的空隙必須看得見格線——那就是版面的證據。

## Elevation & Depth

**這個系統是純平面的。全站沒有任何一條 `box-shadow`。** `--lift` 與 `--lift-strong` 兩個陰影 token 存在於 `tokens.css`，但被**刻意不使用**——全專案零引用。它們是這個世界成形前的殘留，不是可用的層級工具；新畫面不得引用它們，也不得自行加陰影。

深度由四種手段表達，依強度排序：

1. **線的粗細**：1px 髮絲線（`grid-line-strong`）＝模組邊界；1px 淡線（`grid-line`）＝列分隔；2px 墨線＝結構性斷點（頁首下緣、表頭下緣、頂欄下緣、登入頁的軸線、日曆帶基線）。
2. **面的明度**：`paper`（前景模組）→ `surface`（模組標題列、hover 列、次要區）→ `surface-sunk`（已耗用／已失效的格子）。
3. **邊緣強調**：`Stat` 與 `Notice` 用一條左緣線把自己從流中提出來，而不是用卡片。
4. **層序**：`#root` 在 z-index 1，sticky 頂欄在 20，紙面顆粒層在 50（`position: fixed`，`pointer-events: none`，opacity 0.85，SVG fractalNoise 生成、非照片）。

### Named Rules

**零陰影規則（The No-Shadow Rule）.** 這個世界裡沒有燈光，所以沒有陰影。要表達「這一塊在上面」，用線、用面色、用左緣強調，不要用 `box-shadow`，也不要用 `filter: drop-shadow`。

**顆粒層不可穿透規則（The Grain-On-Top Rule）.** 紙面顆粒是覆蓋全站的固定層，不是元件的貼圖。不要在個別模組上再疊一層雜訊，也不要為了讓某個元素「浮起來」把它推到顆粒層之上。

## Shapes

**零圓角。** `--radius` 定義為 `0`，而且全站沒有任何一條 `border-radius` 宣告——這條規則不是靠 token 執行的，是靠從不書寫來執行的。連原生控制項也被矯正回方形：`select` 的箭頭被換成 45° 斜線、日期／時間輸入的 picker indicator 被套上 1px 方框並去彩。

**矩形是唯一的容器形狀。** 模組、按鈕、輸入框、標籤、計數格、日曆帶格子，全都是矩形加 1px 邊。

**45° 斜線是唯一的裝飾**（`.slash`）。它由 linear-gradient 畫成 2px 對角線，尺寸以 em 計（1.15em 在按鈕內、1.2–1.3em 在標記與角色模組、1.5em 預設、2.5em 為 `--lg`），顏色永遠是 `currentColor`。它同時出現在三種語意上：狀態橫幅的前導記號、按鈕右緣的可操作記號、以及被選中／可選的角色模組。頂欄的作用中項目是「斜線變成平面」——整個連結 `skewX(-12deg)`，內文再 `skewX(12deg)` 轉正。

**斜紋是「鎖住」。** 停用的輸入框底是 -45° 的 6px/1px repeating-linear-gradient，和斜線同一個角度族。

**點陣是「還沒被填的容量」**（`.dots`，10px 間距 1px 圓點）。用在空狀態底、以及尚未指派內容的區塊。這是唯一一處出現圓形圖元的地方，且尺寸小到只讀作紋理。

### Named Rules

**斜線即作用中規則（The Slash Means Live Rule）.** 45° 斜線只能表示「這是作用中的／這可以被操作」。停用時它降到 0.3 不透明度，hover 時升到 1，靜置的角色模組上它是 `grid-line-strong`、hover 轉藍。不要拿斜線當純裝飾、當分隔符、當項目符號。

**無曲線規則（The No-Curve Rule）.** 不寫 `border-radius`，不用圓形頭像，不用膠囊按鈕，不用圓形圖示底。原生控制項的圓角要被明確覆寫掉。

## Components

### Buttons
- **形狀：** 直角矩形（radius 0），1px 邊，最小高度 38px，內距 8px/14px。小尺寸為 30px 高、4px/10px 內距、label 級字。
- **Default：** 白底、墨字、墨邊，右緣帶一個 0.55 不透明度的斜線。hover 時邊與字一起轉藍、斜線升到 1。
- **Primary：** 藍平面、反白字，同樣帶斜線。hover 轉 `blue-deep`。
- **Quiet：** 無邊、藍字，hover 加底線（offset 3px）。用於次要動作。
- **Danger：** 無邊、警示色字，hover 才長出警示色邊框。用於取消／停課／停用。
- **Disabled：** `surface` 底、淡墨字、強格線邊，斜線降到 0.3，`cursor: not-allowed`。
- **斜線規則：** default 與 primary 預設帶斜線並改為 `space-between` 排列（文字靠左、斜線靠右緣）；quiet 與 danger 不帶。表格列內的緊湊按鈕可用 `slash={false}` 關掉。

### Tags
- **樣式：** 白底、無邊框、無內距（僅 2px 上下），顯示字、0.6875rem、700、字距 0.06em。狀態完全由文字色承擔。
- **色域：** blue（`info-ink`）、live、alert、hold、neutral（`ink-muted`，字重降到 600）、ink（凍結專用）。
- **Solid 變體：** 唯一有底色的標籤——藍平面 + 反白字 + 2px/8px 內距。極少用，保留給需要被當成計數徽章的場合。

### Panels / Containers
- **邊角：** 直角（0）。
- **背景：** `paper`；標題列 `surface`。
- **邊框：** 1px `grid-line-strong` 全框；標題列下緣與頁尾上緣各一條同色髮絲線。
- **陰影：** 無（見 Elevation & Depth）。
- **內距：** body 24px，垂直節奏 16px；標題列與頁尾 12px/24px。表格類模組用 `flush` 取消 body 內距，讓表格自己管節奏。

### Inputs / Fields
- **樣式：** 白底、1px 髮絲邊、直角、38px 高、7px/10px 內距。欄位標籤是 label 角色（大寫微標籤），與輸入框間距 4px。
- **Hover：** 邊框轉 `ink-faint`。
- **Focus：** 邊框轉藍，並在內側 -2px 加一條 1px 藍外框（雙線收邊，不外擴、不發光）。
- **Disabled：** 斜紋底（-45°，6px/1px），淡墨字，`cursor: not-allowed`——「鎖住」是被畫出來的，不是靠灰掉。
- **Select：** 原生箭頭移除，改用一條 12px 的 45° 藍斜線（右 8px 置中）。
- **表格內：** `--sm` 變體降到 30px 高、label 級字，對齊列的節奏。

### Navigation
- **頂欄：** sticky（z-index 20），白底，下緣 2px 墨線，12px/24px 內距。左側是品牌標記（顯示字大寫 + 藍斜線），右側是身分膠囊（1px 墨框，內含大寫藍色角色名）。
- **連結：** 700、0.8125rem，`skewX(-12deg)` 的平行四邊形塊，內文反向 skew 轉正。靜置為 `ink-muted`；hover 轉墨字 + `surface` 底；**作用中為藍平面 + 反白字**；不可用的項目為淡墨、`pointer-events: none`。
- **720px 以下：** 左側整段換行堆疊，導覽列改為不換行的橫向捲動條。

### Segmented control
- **樣式：** 一排直角格，外框 1px 髮絲線，格與格之間 1px 分隔線，label 級字。
- **狀態：** 靜置 `ink-muted`，hover 轉墨，**作用中為藍平面 + 反白字**（hover 轉 `blue-deep`）。真正的 radio input 以絕對定位透明覆蓋整格。
- 與頂欄共用同一句話：「作用中 = 藍平面」。導覽列把它說成斜的，分段控制把它說成方的。

### Cells（系統的核心語彙）
- **這是這套設計系統的簽名元件。** 任何「N 之中的 M」都畫成 N 個格子：課程名額、候補人數、30 天缺席記點、凍結次數、報到窗口進度、會籍期間。使用者不是讀到一個數字，是看到自己的狀態被畫在格子上。
- **格子：** 12px 見方（`--lg` 為 16px），1px `grid-line-strong` 邊，白底，間距 3px。
- **狀態：** 已填＝實心 + 同色邊（`on` 藍／`alert` 紅／`hold` 橘）；已耗用或已滾出窗口＝虛線邊、白底；未填＝細邊白底。
- **`fit` 變體：** 格子改為 `flex: 1 1 0`（min 4px / max 12px），讓「12 個名額」永遠是一列十二個記號，絕不換行。
- **一律配 `aria-label`**（例如「名額 8 / 12」），因為視覺上它是圖不是文字（`role="img"`）。
- **旁邊永遠有數字。** 格子提供直覺，數字提供精確；兩者成對。

### Daystrip（30 天滾動窗口）
- 30 個 flex 等分的直立格（28px 高，min 3px 寬，1px 淡格線邊），一格一天，由左（30 天前）到右（今天）。
- 狀態：`hit`＝警示色實心（該日記一點）、`spent`＝沉面（已滾出窗口）、`held`＝待處理色。
- 下緣一條 1px 墨線作為基線，基線下是三個 label 級的軸標（30 天前／窗口說明／今天）。
- 這是把一條抽象規則（滾動窗口）畫成可數物件的地方，不是圖表。

### Stat
- 一個左緣 1px 墨線的直欄：大數字（1.75rem、700、等寬）在上，label 級標籤在下，可再加一行 note。
- 色調：預設藍（`blue`）、`ink`、`alert`。數字本身就是強調，不需要底色或卡片。

### Notice
- 白底、1px 髮絲全框、**左緣 2px `currentColor`**，前導一個斜線，內距 12px/16px，note 級字。
- `kind` 只改 `color`（info 藍／live／alert／hold），因此左緣線與斜線自動同色，而內文維持墨色可讀。
- **刻意沒有色彩底。** 淡彩底 + 深色字的橫幅是這個世界不需要的通用後台語彙。

### Empty
- 置中直欄，10px 點陣底（`.dots` 同款），上方一個 1px 框住的圖示（預設 `IconField`），下方說明文，可再帶一個動作。
- 內距 64px/24px——空狀態要佔滿它該佔的格子，不能塌成一行小字。

### Icons
- 全部自繪，24×24 視框、預設渲染 20×20，1.5px 描邊、`square` 端點、`miter` 接角、無填色塊、無圓角，marks 咬 4px 次格線。需要方向的地方用 45° 斜線（例如放大鏡的握把）。
- 共 8 個：Field（容量）、Schedule（課表）、Window（滾動窗口）、CheckIn（報到）、Person（名單）、Clock（剩餘時間）、Lock（綁定）、Search。
- 這是一套自有圖示系統，不要混入第三方圖示庫——它們的圓角與圓端點會立刻破壞這個世界。

## Do's and Don'ts

### Do:
- **Do** 讓所有間距落在 8px 格子的倍數上（8/12/16/24/32/48/64），並優先取既有的 space token。
- **Do** 把任何「M 之中的 N」畫成 `Cells`——名額、候補、記點、凍結次數、期間，都是同一個物件。
- **Do** 讓格子旁邊永遠附上等寬數字與 `aria-label`。
- **Do** 用 45° 斜線標示「作用中／可操作」，而且只用在這個語意上。
- **Do** 用藍平面表示「這是作用中的那一個」（導覽、分段控制、主要按鈕、被選中的模組）。
- **Do** 用文字色表達狀態；標籤保持白底無框。
- **Do** 用 2px 墨線做結構性斷點，1px 髮絲線做模組邊界，1px 淡線做列分隔。
- **Do** 讓模組之間的空隙露出 body 的構造格線。
- **Do** 用 `repeat(auto-fit, minmax(280–360px, 1fr))` 排模組，並保持 `align-items: start`。
- **Do** 新增圖示時遵守 24×24 / 1.5px / square / miter / 無曲線的繪製規則。
- **Do** 為新的狀態色驗證它在白底上作為裸文字達到 4.5:1。

### Don't:
- **Don't** 寫任何 `border-radius`（包含 1px）。原生控制項的圓角要被明確覆寫。
- **Don't** 寫任何 `box-shadow` 或 `drop-shadow`；不要引用 `--lift` / `--lift-strong`，它們是刻意不使用的殘留 token。
- **Don't** 給狀態標籤加底色、外框或膠囊形狀。
- **Don't** 用淡彩底色的橫幅表示狀態；橫幅是白底 + 左緣色線 + 斜線。
- **Don't** 把藍色當裝飾底色或分區底——藍平面只代表「作用中」。
- **Don't** 在頁首標題上方加 kicker／eyebrow 小標。
- **Don't** 加入 `cell-draw` 以外的動畫。這個世界只有一個動態：格子逐格展開（360ms，每格延遲 24ms，`ease-out-expo`）。不要加入場淡入、視差、hover 位移或載入骨架動畫。
- **Don't** 用進度條或百分比圓環取代 `Cells`；離散的數量必須畫成離散的格子。
- **Don't** 引入第三方圖示庫或字型圖示。
- **Don't** 用字元符號（`+`、`＋`、`—`、`▾`）當作圖示；需要一個記號時，畫在同一張格線上。
- **Don't** 用整片不透明底色覆蓋大面積畫面，讓構造格線消失。
- **Don't** 在個別元件上再疊雜訊紋理；紙面顆粒是全站唯一且最上層的一層。
