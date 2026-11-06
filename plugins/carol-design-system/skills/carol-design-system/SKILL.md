---
name: carol-design-system
description: team carol 디자인 시스템(@team-carol/tokens · styles · react) 사용 규칙. carol-web, carol(봇 웹 페이지·PNG 카드·Discord 임베드), carol-ops 에서 색·글꼴·버튼·카드·탭·입력창·상단바 같은 UI 를 만들거나 고칠 때, 색 값(hex)을 쓰려 할 때, 예전 CSS 변수(--border-soft, --text-lo, --ok 등)를 만났을 때 먼저 읽는다.
---

# Carol Design System

team carol 의 세 앱(carol-web, carol, carol-ops)이 함께 쓰는 디자인 시스템이다.
원본 저장소: https://github.com/team-carol/carol-design-system · 기준 값은 **carol-web 랜딩**이다.

## 반드시 지킬 것

1. **색을 직접 쓰지 않는다.** `#ff9294`, `#33333a` 같은 hex 를 새로 쓰지 말고 토큰을 쓴다.
   - JS/TS: `import { color } from "@team-carol/tokens"` → `color.accent`
   - CSS: `var(--crl-accent)`
   - Tailwind(carol-web): `bg-accent`, `text-ink-soft`, `border-border`
   - Discord 임베드: `toInt(color.accent)` → `0xff9294`
2. **게임 고유 색**(난이도·랭크·FC/AP·칭호·서클)은 `@team-carol/tokens/game` 에서 가져온다. 브랜드 색과 섞지 않는다.
3. **이미 있는 컴포넌트를 먼저 쓴다.** 아래 목록에 있으면 새로 만들지 않는다.
4. 디자인 시스템에 없는 UI 가 필요하면 우선 앱 안에 만든다. **둘 이상의 앱이 쓰게 되면** carol-design-system 에 올리자고 제안한다.
5. 토큰 값이 맞지 않아 보이면 앱에서 덮어쓰지 말고 carol-design-system 저장소에서 고친다.

## 색 토큰

| 토큰 (JS) | CSS 변수 | Tailwind | 값 | 용도 |
|---|---|---|---|---|
| canvas | --crl-canvas | canvas | #1a1a1c | 페이지 바탕 |
| canvasAlt | --crl-canvas-alt | canvas-alt | #211f24 | 띠 섹션, 입력창 바탕 |
| surface | --crl-surface | surface | #242427 | 카드·패널 |
| surface2 | --crl-surface-2 | surface-2 | #2e2e33 | 칩·코드·보조 버튼 |
| surfaceHover | --crl-surface-hover | surface-hover | #332e36 | surface-2 위 hover |
| border | --crl-border | border | #33333a | 카드·구분선 |
| borderStrong | --crl-border-strong | border-strong | #3a353d | 버튼 링·입력창 |
| ink | --crl-ink | ink | #f2edef | 제목·핵심 수치 |
| ink2 | --crl-ink-2 | ink-2 | #e8dfe3 | 강조 본문 |
| inkSoft | --crl-ink-soft | ink-soft | #cfc6ca | 기본 본문 |
| muted | --crl-muted | muted | #b3a8ad | 설명문 |
| dim | --crl-dim | dim | #8a8087 | 라벨·메타 |
| faint | --crl-faint | faint | #6f676c | 각주·푸터 |
| accent | --crl-accent | accent | #ff9294 | 코랄 강조, primary 버튼 |
| accentHover | --crl-accent-hover | accent-hover | #f2787b | accent hover |
| accentInk | --crl-accent-ink | accent-ink | #3a1e1e | accent 위 글자 |
| accentSoft | --crl-accent-soft | accent-soft | #f2b3bf | 링크·활성 탭·큰 수치 |
| success / successBg / successBorder | --crl-success … | success … | #80d8a3 / #263d32 / #3e6852 | 성공 |
| danger / dangerBg / dangerBorder | --crl-danger … | danger … | #ff9a9a / #432b2e / #734548 | 오류 |
| warning / warningBg / warningBorder | --crl-warning … | warning … | #f5c97a / #41382a / #6e5c3a | 경고 |
| focus | --crl-focus | focus | #3898ec | 키보드 포커스 링 |

모서리: `radius.inline 6 · small 8 · control 10 · button 12 · card 16 · hero 32 · pill 999` (Tailwind `rounded-card` 등. 기본 `rounded-xl` 과 다르다).
레이아웃: `--crl-container 1200px`, `--crl-container-narrow 880px`, `--crl-gutter clamp(20px,4vw,40px)` (Tailwind `max-w-page`, `max-w-narrow`, `px-gutter`, `py-section`).
글꼴: Pretendard → Noto Sans JP → 시스템. 코드는 JetBrains Mono. 제목은 굵기 500.

## 컴포넌트

| 컴포넌트 | React (`@team-carol/react`) | HTML 클래스 (`@team-carol/styles`) |
|---|---|---|
| 버튼 | `<Button variant="primary\|secondary" size="sm\|md\|lg" href?>` · `buttonClassName()` (`@team-carol/styles`) | `crl-btn crl-btn--primary` / `--secondary` / `--sm` / `--lg` |
| 카드 | `<Card>` `<CardTitle>` `<CardBody>` | `crl-card` `crl-card__title` `crl-card__body` |
| 배지 | `<Tag tone="neutral\|accent\|success\|danger">` | `crl-tag crl-tag--success` |
| 칩 | `<Chip>` | `crl-chip` |
| 입력 | `<TextInput label error helperText>` `<TextArea>` `<Select>` | `crl-field` > `crl-label` + `crl-input` + `crl-helper` |
| 탭 | `<Tabs items value onChange variant="underline\|contained">` | `crl-tabs [crl-tabs--contained]` > `crl-tab [is-active]` |
| 수치 | `<StatGrid><Stat label value variant="default\|hero"/></StatGrid>` | `crl-stat-grid` > `crl-stat` > `crl-stat__label` + `crl-stat__value` |
| 상단바 | `<TopBar brand={<Brand name markSrc href/>} variant="sticky\|static">` `<TopBarLink active>` | `crl-topbar` > `crl-topbar__inner` |
| 푸터 | `<Footer>` | `crl-footer` > `crl-footer__inner` |
| 타이포 | — | `crl-display` `crl-heading-1..4` `crl-body-lg` `crl-body-sm` `crl-caption` `crl-eyebrow` |
| 레이아웃 | — | `crl-container [--narrow]` `crl-section` |

## 앱별 사용법

- **carol-web (Next.js + Tailwind v4)** — `globals.css` 에 `@import "tailwindcss"; @import "@team-carol/tokens/tailwind.css";`. 클래스는 Tailwind 그대로(`bg-surface rounded-card`). 버튼은 `import { buttonClassName } from "@team-carol/styles"` 로 가져와 `<Link className={buttonClassName({ variant: "secondary" })}>` 처럼 쓴다 (`@team-carol/styles/components.css` 를 함께 불러야 한다). 서버 컴포넌트에서는 `@team-carol/react` 가 아니라 `@team-carol/styles` 에서 import 한다.
- **carol (서버 렌더 HTML · satori PNG · Discord)** — HTML 은 `<style>${carolCss}</style>` (`import { carolCss } from "@team-carol/styles"`) 뒤에 페이지 CSS 를 붙이고 `crl-*` 클래스를 쓴다. PNG 카드(satori)는 CSS 변수를 못 쓰므로 `color.surface` 처럼 JS 값을 쓴다. 임베드는 `toInt(color.accent)`.
- **carol-ops (Vite + React)** — `main.tsx` 에 `import "@team-carol/styles/carol.css"` 하고 `@team-carol/react` 컴포넌트를 쓴다.

## 예전 이름 → 새 이름

| 예전 (어디서) | 새 이름 |
|---|---|
| `border-soft` (carol-web Tailwind, #33333a) | `border` |
| `border-2` (carol-web / carol, #3a353d) | `border-strong` |
| `--border-soft` (**carol-ops**, #3a353d) | `--crl-border-strong` (carol-web 의 border-soft 와 다른 색이었다) |
| `--divider` (carol-ops) | `--crl-border` |
| `--hover-2`, `#332e36`, `#38343b` | `--crl-surface-hover` |
| `--accent-light` (carol-ops) | `--crl-accent-soft` |
| `--text-hi` / `--text` / `--text-lo` / `--text-dim` (carol-ops) | `--crl-ink` / `--crl-ink-2` / `--crl-muted` / `--crl-dim` |
| `--ok` / `--err` / `--warn` (carol) | `--crl-success` / `--crl-danger` / `--crl-warning` (값이 조금 다르다) |
| `BRAND.*` (carol `src/brand.ts`) | `color.*` (`BRAND.border2` → `color.borderStrong`) |
| `MAI_DIFF_COLOR` / `GAME_DIFF_COLOR` / `GAME_CM_COLOR` (carol `src/games.ts`) | `maimaiDifficulty` / `difficultyColor` / `clearColor` |
| `primaryCta` / `secondaryCta` (carol-web `components/cta.ts`) | `buttonClassName({ variant })` 또는 `crl-btn crl-btn--*` |
| 포커스 링 `var(--accent)` (carol-ops) | `--crl-focus` (#3898ec, carol-web 기준) |
