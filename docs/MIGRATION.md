# 예전 이름 → 새 이름

세 앱이 각자 쓰던 토큰·클래스를 디자인 시스템 이름으로 옮길 때 보는 표입니다.
값이 달랐던 곳은 **carol-web 이 기준**입니다. ⚠ 표시는 이름만이 아니라 값도 바뀌는 곳입니다.

## 색 토큰

| 새 토큰 (JS) | 새 CSS 변수 | carol-web (Tailwind) | carol (`BRAND` / `theme.ts`) | carol-ops (`index.css`) |
|---|---|---|---|---|
| `canvas` | `--crl-canvas` | `canvas` | `canvas` / `--canvas` | `--canvas` |
| `canvasAlt` | `--crl-canvas-alt` | `canvas-alt` | `canvasAlt` / `--canvas-alt` | `--canvas-alt` |
| `surface` | `--crl-surface` | `surface` | `surface` / `--surface` | `--surface` |
| `surface2` | `--crl-surface-2` | `surface-2` | `surface2` / `--surface-2` | `--surface-2` |
| `surfaceHover` | `--crl-surface-hover` | `[#332e36]` | `--hover-2` | `#38343b` ⚠ |
| `border` | `--crl-border` | **`border-soft`** | `border` / `--border` | `--border`, `--divider` |
| `borderStrong` | `--crl-border-strong` | **`border-2`** | `border2` / `--border-2` | **`--border-soft`** |
| `ink` | `--crl-ink` | `ink` | `ink` / `--ink` | `--text-hi` |
| `ink2` | `--crl-ink-2` | `ink-2` | `ink2` / `--ink-2` | `--text` |
| `inkSoft` | `--crl-ink-soft` | `ink-soft` | `inkSoft` / `--ink-soft` | `#cfc6ca` |
| `muted` | `--crl-muted` | `muted` | `muted` / `--muted` | `--text-lo` |
| `dim` | `--crl-dim` | `dim` | `dim` / `--dim` | `--text-dim` |
| `faint` | `--crl-faint` | `faint` | `faint` / `--faint` | — |
| `accent` | `--crl-accent` | `accent` | `accent` / `--accent` | `--accent` |
| `accentHover` | `--crl-accent-hover` | `accent-hover`, `[#f2857f]` | `accentHover` / `--accent-hover` | `--accent-hover` |
| `accentInk` | `--crl-accent-ink` | `accent-ink` | `accentInk` / `--accent-ink` | `--accent-ink` |
| `accentSoft` | `--crl-accent-soft` | `accent-soft` | `accentSoft` / `--accent-soft` | `--accent-light` |
| `success` | `--crl-success` | — | `--ok` (#4ade80) ⚠ | `--success` |
| `danger` | `--crl-danger` | — | `--err` (#f87171) ⚠ | `--danger` |
| `warning` | `--crl-warning` | — | `--warn` (#fbbf24) ⚠ | — |
| `successBg` · `successBorder` | `--crl-success-bg` · `-border` | — | — | `#263d32` · `#3e6852` |
| `dangerBg` · `dangerBorder` | `--crl-danger-bg` · `-border` | — | — | `#432b2e` · `#734548` |
| `focus` | `--crl-focus` | `#3898ec` | `#3898ec` | `var(--accent)` ⚠ |

> **주의:** `border-soft` 는 carol-web 에서는 `#33333a`(→ `border`), carol-ops 에서는 `#3a353d`(→ `borderStrong`) 였습니다. 같은 이름이 서로 다른 색을 가리켰기 때문에 새 이름에서는 `soft` 를 쓰지 않습니다.

## 게임 색 (carol `src/games.ts` 외)

| 예전 | 새 이름 (`@team-carol/tokens/game`) |
|---|---|
| `MAI_DIFF_COLOR` | `maimaiDifficulty` |
| `GAME_DIFF_COLOR` | `difficultyColor` |
| `MAI_CM_COLOR` | `maimaiClear` |
| `GAME_CM_COLOR` | `clearColor` |
| `GAMES[id].accent` | `gameAccent[id]` |
| `RS_DEFAULT_COLOR` / `RS_DOUBLE_COLOR` | `ratingValue.default` / `ratingValue.double` |
| `TROPHY_STYLE` (`cardKit.ts`) | `trophy` (`backgroundImage` → `background`) |
| `CIRCLE_COLOR_STYLE` (`circleColors.ts`) | `circle` (`main` 이 숫자 → hex 문자열. 임베드에는 `toInt(circle.gold.main)`) |
| `0x9333ea` 같은 숫자 색 (`chart.ts`, `songrec.ts`) | `toInt(maimaiDifficulty.MASTER)` |

## 클래스

| 예전 | 새 클래스 |
|---|---|
| `.btn.btn-primary` (carol, ops), `primaryCta` (web) | `crl-btn crl-btn--primary` |
| `.btn.btn-secondary` (carol), `.btn-ghost` (ops), `secondaryCta` (web) | `crl-btn crl-btn--secondary` |
| `.btn-sm` | `crl-btn--sm` |
| `.card` (ops) | `crl-card` |
| `.tag.tag-green` / `.tag-gray` (ops), `.badge` (carol) | `crl-tag crl-tag--success` / `crl-tag` |
| `.field` > `label` + `input` (ops) | `crl-field` > `crl-label` + `crl-input` |
| `.tabs` > `.tab-btn.active` (ops) | `crl-tabs` > `crl-tab[aria-selected=true]` |
| `.admin-tabs` > `a.on` (carol) | `crl-tabs crl-tabs--contained` > `crl-tab is-active` |
| `.stat-grid` / `.stat-label` / `.stat-value` (ops) | `crl-stat-grid` / `crl-stat__label` / `crl-stat__value` |
| `.topbar` / `.topbar-in` / `.topbar-link.on` (carol) | `crl-topbar` / `crl-topbar__inner` / `crl-topbar__link is-active` |
| `.app-header` / `.app-header-inner` (ops) | `crl-topbar crl-topbar--static` / `crl-topbar__inner` |
| `.brand` | `crl-brand` (+ 이미지에 `crl-brand__mark`) |
| `.site-foot` / `.site-foot-in` (carol) | `crl-footer` / `crl-footer__inner` |
| `.eyebrow` (carol) | `crl-eyebrow` |
| `.page-heading h1` (ops), `.admin-title` (carol) | `crl-heading-2` |

## 디자인 시스템에 없는 것 (각 앱에 남김)

한 앱에서만 쓰여 이번에는 올리지 않았습니다. 두 번째 앱이 쓰게 되면 올립니다.

- carol-ops: 모달(`.modal`), 알림(`.notification`), 진행 막대(`.progress-bar`), 위험 버튼(`.btn-danger`), 아이콘 버튼(`.btn-icon`)
- carol-web: 명령어 목록 행, 링크 필(`pillLink`), 면책 인용 블록, 히어로 패널, 트윗 갤러리
- carol: PNG 카드 레이아웃(`cardKit.ts` 의 `panel`, `statsPanel`, `wordmark`) — 색만 토큰을 씁니다
