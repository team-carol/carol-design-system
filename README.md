# Carol Design System

team carol 의 세 앱 — **carol-web**(랜딩), **carol**(디스코드 봇 · 웹 페이지 · PNG 카드), **carol-ops**(운영 대시보드) — 이 함께 쓰는 색, 타이포그래피, 컴포넌트를 한곳에 모은 디자인 시스템입니다.

지금까지는 세 저장소가 같은 코랄 팔레트를 각자 복사해 썼고(`globals.css`, `src/brand.ts`, `web/src/index.css`), 그 사이에 이름과 값이 조금씩 어긋나 있었습니다. 이 저장소가 그 값의 **유일한 원본**입니다.

- 기준 값: **carol-web 랜딩** (`app/globals.css` 의 `@theme`)
- 담는 범위: **둘 이상의 앱이 함께 쓰는 것만** — 한 앱에서만 쓰는 UI 는 그 앱에 둡니다
- 문서 사이트: <https://team-carol.github.io/carol-design-system/> (로컬은 `npm run docs` → <http://localhost:5173>)

## 목차

1. [패키지 구성](#패키지-구성)
2. [설치](#설치)
3. [프로젝트별 적용](#프로젝트별-적용) — carol-web · carol · carol-ops
4. [에이전트 스킬 추가](#에이전트-스킬-추가)
5. [토큰 한눈에 보기](#토큰-한눈에-보기)
6. [컴포넌트](#컴포넌트)
7. [이 저장소 개발하기](#이-저장소-개발하기)
8. [릴리스](#릴리스)

---

## 패키지 구성

```
carol-design-system/
├─ packages/
│  ├─ tokens/   @team-carol/tokens   색·타이포·간격 토큰 → JS/TS, CSS 변수, Tailwind v4 테마
│  ├─ styles/   @team-carol/styles   프레임워크 없는 컴포넌트 CSS (crl-* 클래스)
│  └─ react/    @team-carol/react    styles 클래스를 렌더하는 React 18/19 컴포넌트
├─ apps/docs/                        문서 사이트 (Vite)
├─ plugins/carol-design-system/      에이전트 스킬 (Claude Code 플러그인)
└─ docs/MIGRATION.md                 예전 이름 → 새 이름 대응표
```

| 패키지 | 내보내는 것 | 누가 쓰나 |
|---|---|---|
| `@team-carol/tokens` | `color`, `typeScale`, `radius`, `layout`, `toInt()`, `toCssVars()` … | 전부 |
| `@team-carol/tokens/game` | `difficultyColor`, `clearColor`, `trophy`, `circle` … (게임 고유 색) | carol |
| `@team-carol/tokens/tokens.css` | `:root { --crl-* }` | 일반 CSS |
| `@team-carol/tokens/tailwind.css` | Tailwind v4 `@theme` + `px-gutter`·`py-section` 유틸리티 | carol-web |
| `@team-carol/styles/carol.css` | 토큰 + 리셋 + 컴포넌트 CSS | carol-ops |
| `@team-carol/styles/components.css` | 토큰 + 컴포넌트 CSS (리셋 없음, Tailwind 앱용) | carol-web (선택) |
| `@team-carol/styles` (JS) | `carolCss`, `componentsCss` (위 CSS 문자열), `buttonClassName()`, `cx()` | carol (서버 렌더 HTML), carol-web |
| `@team-carol/react` | `Button`, `Card`, `Tag`, `Chip`, `TextInput`, `Tabs`, `Stat`, `TopBar` … | carol-ops, (carol-web) |

세 패키지는 모두 **ESM + CJS** 로 나갑니다. carol 처럼 `"module": "commonjs"` 인 TypeScript 프로젝트에서도 `@team-carol/tokens/game` 까지 타입이 잡힙니다.

## 설치

패키지는 **GitHub Packages** (`npm.pkg.github.com`) 에 `@team-carol` 스코프로 배포됩니다. GitHub Packages 는 공개 패키지라도 설치할 때 토큰이 필요합니다.

### 1. 토큰 만들기 (사람마다 한 번)

GitHub → Settings → Developer settings → Personal access tokens (classic) → `read:packages` 권한으로 발급한 뒤, **홈 디렉터리**의 `~/.npmrc` 에 넣습니다. 이 파일은 저장소에 커밋하지 않습니다.

```ini
# ~/.npmrc
//npm.pkg.github.com/:_authToken=ghp_xxxxxxxxxxxx
```

### 2. 쓰는 저장소에 `.npmrc` 두기 (저장소마다 한 번, 커밋함)

```ini
# <앱 저장소>/.npmrc
@team-carol:registry=https://npm.pkg.github.com
```

### 3. 설치

```bash
# carol-web
npm install @team-carol/tokens @team-carol/styles

# carol
npm install @team-carol/tokens @team-carol/styles

# carol-ops (web/ 폴더에서)
npm install @team-carol/react @team-carol/styles @team-carol/tokens
```

### CI · Docker 에서 설치할 때

- **GitHub Actions** — `actions/setup-node` 에 `registry-url: https://npm.pkg.github.com`, `scope: "@team-carol"` 를 주고 `npm ci` 단계에 `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}` 를 넘깁니다. 다른 저장소의 패키지를 읽으려면 이 저장소의 Package settings → *Manage Actions access* 에 carol-web · carol · carol-ops 를 추가해야 합니다.
- **Docker (carol, carol-ops)** — 빌드 시크릿으로 넘기고 이미지에 남기지 않습니다.

  ```dockerfile
  RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci
  ```
  ```bash
  docker build --secret id=npmrc,src=$HOME/.npmrc .
  ```

> 토큰 없이 설치하고 싶다면 npmjs.com 에 `@team-carol` 조직을 만들어 공개 배포하는 방법도 있습니다. 그때는 각 `package.json` 의 `publishConfig` 와 위 `.npmrc` 만 바꾸면 됩니다.

### 배포 전에 로컬에서 써 보기

```bash
# 이 저장소에서
npm install && npm run build
npm pack -w @team-carol/tokens -w @team-carol/styles -w @team-carol/react --pack-destination ../carol-packs

# 앱 저장소에서
npm install ../carol-packs/team-carol-tokens-0.1.0.tgz ../carol-packs/team-carol-styles-0.1.0.tgz
```

---

## 프로젝트별 적용

### carol-web (Next.js 16 + Tailwind v4)

Tailwind 테마를 디자인 시스템 것으로 바꿉니다. 색 클래스 이름(`bg-canvas`, `text-ink-soft`, `bg-accent` …)은 **그대로** 쓸 수 있고, 아래 두 개만 이름이 바뀝니다.

| 예전 | 새 이름 |
|---|---|
| `border-border-soft` | `border-border` |
| `border-border-2` / `var(--color-border-2)` | `border-border-strong` / `var(--color-border-strong)` |

```css
/* app/globals.css */
@import "tailwindcss";
@import "@team-carol/tokens/tailwind.css";   /* ← 기존 @theme { … } 블록을 지운다 */

body {
  margin: 0;
  background: var(--color-canvas);
  color: var(--color-ink);
  font-family: var(--font-sans);
  text-wrap: pretty;
}
a:focus-visible, button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

`components/cta.ts` 의 버튼 문자열은 `buttonClassName` 으로 바꿀 수 있습니다. 이 경우 버튼 CSS 가 필요하므로 `components.css` 도 함께 불러옵니다. **반드시 `tailwindcss` 다음에** 불러와야 합니다. 앞에 두면 `components` 레이어가 먼저 선언돼서 Tailwind preflight 가 버튼 배경을 지워 버립니다.

```css
/* app/globals.css */
@import "tailwindcss";
@import "@team-carol/tokens/tailwind.css";
@import "@team-carol/styles/components.css" layer(components);   /* 순서: tailwindcss 뒤 */
```

이렇게 하면 레이어 순서가 `theme → base → components → utilities` 가 되어, `crl-*` 는 preflight 를 이기고 Tailwind 유틸리티(`px-8` 등)는 `crl-*` 를 덮어쓸 수 있습니다.

`buttonClassName` 은 `"use client"` 가 없는 `@team-carol/styles` 에서 가져옵니다. 그래서 서버 컴포넌트에서도 호출할 수 있습니다.

```tsx
import Link from "next/link";
import { buttonClassName } from "@team-carol/styles";

<a href={site.inviteUrl} className={buttonClassName({ size: "lg" })}>{t.cta1}</a>
<Link href="/commands" className={buttonClassName({ variant: "secondary", size: "lg" })}>{t.cta2}</Link>
```

자주 쓰던 임의 값은 토큰 클래스로 바꿉니다.

| 예전 | 새 이름 |
|---|---|
| `rounded-2xl` (카드 16px) | `rounded-card` |
| `max-w-[1200px]` / `max-w-[880px]` | `max-w-page` / `max-w-narrow` |
| `px-[clamp(20px,4vw,40px)]` | `px-gutter` |
| `py-[clamp(64px,8vw,104px)]` | `py-section` |
| `hover:bg-[#332e36]` | `hover:bg-surface-hover` |
| `hover:!border-[#f2857f]` | `hover:!border-accent-hover` |
| `shadow-[0_0_0_1px_#33333a]` | `shadow-[0_0_0_1px_var(--color-border)]` |

### carol (Express 서버 렌더 HTML · satori PNG · Discord)

**1) 브랜드 값** — `src/brand.ts` 를 디자인 시스템 토큰으로 바꿉니다. 기존 import 를 깨지 않으려면 다시 내보내기만 해도 됩니다.

```ts
// src/brand.ts
import { color } from "@team-carol/tokens";

/** @deprecated color 를 직접 쓴다. */
export const BRAND = { ...color, border2: color.borderStrong } as const;
```

**2) 웹 페이지 CSS** — `src/web/theme.ts` 의 `BASE_CSS` 토큰·리셋·버튼 부분을 `carolCss` 로 바꿉니다. 페이지 고유 CSS 는 그 뒤에 붙입니다.

```ts
// src/web/theme.ts
import { carolCss } from "@team-carol/styles";

export const BASE_CSS = carolCss + `
  body { min-height: 100vh; display: flex; flex-direction: column; }
  .page { flex: 1; width: 100%; margin: 0 auto; padding: clamp(40px,7vw,80px) var(--crl-gutter); }
`;

export function topbar(right = "") {
  return `<header class="crl-topbar"><div class="crl-topbar__inner">
    <a class="crl-brand" href="${LANDING_URL}"><img class="crl-brand__mark" src="${BRAND_AVATAR_PATH}" alt="">캐롤봇</a>
    <span class="crl-topbar__spacer"></span>${right}</div></header>`;
}
```

HTML 문자열에서는 `crl-*` 클래스를 그대로 씁니다.

```html
<button class="crl-btn crl-btn--primary">저장</button>
<nav class="crl-tabs crl-tabs--contained">
  <a class="crl-tab is-active" href="/admin/aliases?code=…">곡 별명</a>
</nav>
<div class="crl-field">
  <label class="crl-label" for="alias">곡 별명</label>
  <input class="crl-input" id="alias">
</div>
```

페이지 CSS 의 `var(--ok)` · `var(--err)` · `var(--warn)` 은 `var(--crl-success)` · `var(--crl-danger)` · `var(--crl-warning)` 로 바꿉니다 (값이 조금 부드러워집니다).

**3) PNG 카드 (satori)** — satori 는 CSS 변수를 못 쓰므로 JS 값을 씁니다. `cardKit.ts` 의 상수가 `BRAND` 를 거치므로 1) 만 해도 그대로 동작합니다.

```ts
import { color } from "@team-carol/tokens";
el("div", { background: color.surface, border: `1px solid ${color.border}`, borderRadius: 16 });
```

**4) 게임 색** — `src/games.ts` 의 색 표를 옮깁니다.

```ts
import { maimaiDifficulty, difficultyColor, clearColor, maimaiClear } from "@team-carol/tokens/game";

export const MAI_DIFF_COLOR = maimaiDifficulty;
export const GAME_DIFF_COLOR = difficultyColor;
export const MAI_CM_COLOR = maimaiClear;
export const GAME_CM_COLOR = clearColor;
```

**5) Discord 임베드** — 숫자 색은 `toInt` 로 만듭니다.

```ts
import { color, toInt } from "@team-carol/tokens";
import { maimaiDifficulty } from "@team-carol/tokens/game";

new ContainerBuilder().setAccentColor(toInt(maimaiDifficulty.MASTER)); // 0x9333ea
```

> 팔레트가 바뀌면 카드 PNG 캐시를 깨기 위해 `CARD_VERSION` / `ACH_CARD_VERSION` 을 올리는 기존 규칙은 그대로입니다. `@team-carol/tokens` 버전을 올릴 때 같이 올립니다.

### carol-ops (Vite + React 18)

```tsx
// web/src/main.tsx
import "@team-carol/styles/carol.css";
import "./index.css"; // ← :root 토큰·버튼·카드·탭·입력 스타일은 지우고 ops 전용 스타일만 남긴다
```

```tsx
// web/src/App.tsx
import { Brand, TopBar } from "@team-carol/react";

<TopBar variant="static" brand={<Brand name="캐롤봇 운영" markSrc="/carolbot-avatar.png" />}>
  <span className="crl-caption">team carol</span>
</TopBar>
```

```tsx
// pages/DashboardPage.tsx
import { Button, Card, Stat, StatGrid, Tabs, Tag, TextInput } from "@team-carol/react";

<Tabs value={tab} onChange={setTab} items={[{ value: "status", label: "상태" }, { value: "containers", label: "컨테이너" }]} />
<Card><StatGrid><Stat label="CPU" value="12%" /></StatGrid></Card>
<Tag tone={c.State === "running" ? "success" : "neutral"}>{c.State}</Tag>
<Button variant="secondary" size="sm">재시작</Button>
```

모달 · 알림 · 진행 막대 · 위험 버튼은 ops 에서만 쓰므로 디자인 시스템에 없습니다. `index.css` 에 남겨 두되, 색은 `var(--crl-danger-bg)` 처럼 토큰으로 바꿉니다.

carol-ops 에서 이름이 바뀌는 변수 (**`--border-soft` 에 주의**: carol-web 의 border-soft 와 다른 색이었습니다):

| carol-ops 예전 | 새 이름 |
|---|---|
| `--border-soft` (#3a353d) | `--crl-border-strong` |
| `--border`, `--divider` | `--crl-border` |
| `--accent-light` | `--crl-accent-soft` |
| `--text-hi` / `--text` / `--text-lo` / `--text-dim` | `--crl-ink` / `--crl-ink-2` / `--crl-muted` / `--crl-dim` |
| `--success` / `--danger` | `--crl-success` / `--crl-danger` |

전체 대응표는 [docs/MIGRATION.md](docs/MIGRATION.md) 에 있습니다.

---

## 에이전트 스킬 추가

에이전트(Claude Code 등)가 앱 저장소에서 UI 를 고칠 때 이 디자인 시스템을 따르도록 스킬을 함께 배포합니다. 스킬에는 “hex 를 직접 쓰지 않는다”, 토큰·컴포넌트 표, 예전 이름 대응표가 들어 있습니다.

원본: [`plugins/carol-design-system/skills/carol-design-system/SKILL.md`](plugins/carol-design-system/skills/carol-design-system/SKILL.md)

### 방법 A — 플러그인으로 설치 (권장)

이 저장소 자체가 Claude Code 플러그인 마켓플레이스입니다. 한 번 설치하면 `/plugin` 업데이트로 최신 규칙을 받습니다.

```text
/plugin marketplace add team-carol/carol-design-system
/plugin install carol-design-system@team-carol
```

팀 전체에 자동으로 켜려면 각 앱 저장소의 `.claude/settings.json` 에 넣고 커밋합니다.

```json
{
  "extraKnownMarketplaces": {
    "team-carol": { "source": { "source": "github", "repo": "team-carol/carol-design-system" } }
  },
  "enabledPlugins": { "carol-design-system@team-carol": true }
}
```

### 방법 B — 스킬 파일 복사

플러그인을 쓰지 않는다면 앱 저장소에 파일을 복사해 커밋합니다 (업데이트는 다시 복사).

```bash
mkdir -p .claude/skills/carol-design-system
curl -fsSL https://raw.githubusercontent.com/team-carol/carol-design-system/main/plugins/carol-design-system/skills/carol-design-system/SKILL.md \
  -o .claude/skills/carol-design-system/SKILL.md
```

### 다른 에이전트 (Codex 등 AGENTS.md 를 읽는 도구)

각 앱의 `AGENTS.md` 에 한 줄을 추가합니다.

```md
## 디자인 시스템
UI·색·글꼴을 다룰 때는 @team-carol/* 디자인 시스템을 따른다. 색 hex 를 직접 쓰지 않는다.
규칙: https://github.com/team-carol/carol-design-system/blob/main/plugins/carol-design-system/skills/carol-design-system/SKILL.md
```

---

## 토큰 한눈에 보기

| 토큰 | CSS 변수 | Tailwind | 값 |
|---|---|---|---|
| `canvas` | `--crl-canvas` | `bg-canvas` | `#1a1a1c` |
| `canvasAlt` | `--crl-canvas-alt` | `bg-canvas-alt` | `#211f24` |
| `surface` | `--crl-surface` | `bg-surface` | `#242427` |
| `surface2` | `--crl-surface-2` | `bg-surface-2` | `#2e2e33` |
| `surfaceHover` | `--crl-surface-hover` | `bg-surface-hover` | `#332e36` |
| `border` | `--crl-border` | `border-border` | `#33333a` |
| `borderStrong` | `--crl-border-strong` | `border-border-strong` | `#3a353d` |
| `ink` · `ink2` · `inkSoft` | `--crl-ink` · `-ink-2` · `-ink-soft` | `text-ink` … | `#f2edef` · `#e8dfe3` · `#cfc6ca` |
| `muted` · `dim` · `faint` | `--crl-muted` · `-dim` · `-faint` | `text-muted` … | `#b3a8ad` · `#8a8087` · `#6f676c` |
| `accent` · `accentHover` | `--crl-accent` · `-accent-hover` | `bg-accent` … | `#ff9294` · `#f2787b` |
| `accentInk` · `accentSoft` | `--crl-accent-ink` · `-accent-soft` | `text-accent-ink` … | `#3a1e1e` · `#f2b3bf` |
| `success` · `danger` · `warning` (+`Bg`, `Border`) | `--crl-success` … | `text-success` … | `#80d8a3` · `#ff9a9a` · `#f5c97a` |
| `focus` | `--crl-focus` | `outline-focus` | `#3898ec` |

- **모서리** `radius`: `inline 6` · `small 8` · `control 10` · `button 12` · `card 16` · `hero 32` · `pill 999` → Tailwind `rounded-card` 등. Tailwind 기본 `rounded-xl` 과 겹치지 않게 용도 이름을 씁니다.
- **레이아웃** `layout`: `container 1200px` · `containerNarrow 880px` · `gutter clamp(20px, 4vw, 40px)` · `sectionY clamp(64px, 8vw, 104px)`
- **글꼴** `fontFamily`: Pretendard → Noto Sans JP → 시스템 / JetBrains Mono. `fontUrls` 에 웹 폰트 주소가 있습니다.
- **타입 스케일** `typeScale`: `display` · `heading1–4` · `bodyLg` · `body` · `bodySm` · `label` · `caption` · `legal` (Tailwind `text-heading-1` 등). 제목 굵기는 500 입니다.

## 컴포넌트

모두 **둘 이상의 앱이 이미 쓰던 것**입니다. 예시는 문서 사이트에 있습니다.

| 컴포넌트 | React | HTML 클래스 | 원래 쓰던 곳 |
|---|---|---|---|
| Button | `<Button variant size href>` · `buttonClassName()` | `crl-btn crl-btn--primary\|secondary [--sm\|--lg]` | web · carol · ops |
| Card | `<Card>` `<CardTitle>` `<CardBody>` | `crl-card` | web · carol · ops |
| Tag | `<Tag tone>` | `crl-tag [--accent\|--success\|--danger]` | carol · ops |
| Chip | `<Chip>` | `crl-chip` | web · carol 카드 |
| Text input | `<TextInput>` `<TextArea>` `<Select>` | `crl-field` `crl-label` `crl-input` `crl-helper` | carol · ops |
| Tabs | `<Tabs items value onChange variant>` | `crl-tabs [--contained]` `crl-tab [is-active]` | carol · ops |
| Stat | `<StatGrid>` `<Stat label value variant>` | `crl-stat-grid` `crl-stat` | web · carol 카드 · ops |
| TopBar | `<TopBar brand variant>` `<Brand>` `<TopBarLink>` | `crl-topbar` `crl-brand` | web · carol · ops |
| Footer | `<Footer>` | `crl-footer` | web · carol |
| 타이포 · 레이아웃 | — | `crl-heading-1` … `crl-container` `crl-section` | web · carol · ops |

`@team-carol/react` 는 `"use client"` 가 붙어 나가므로 Next.js App Router 에서 그대로 렌더할 수 있습니다. 단, 서버 컴포넌트에서 `buttonClassName()` 같은 함수를 **호출**하려면 `@team-carol/styles` 에서 import 합니다.

---

## 이 저장소 개발하기

```bash
npm install
npm run build       # tokens → styles → react 순서로 빌드
npm test            # 토큰 값이 carol-web·carol 원본과 같은지 검사
npm run typecheck
npm run docs        # 빌드 후 문서 사이트 개발 서버
```

### 무엇을 어디서 고치나

| 하고 싶은 일 | 고칠 곳 |
|---|---|
| 색·간격 값 바꾸기 | `packages/tokens/src/*.ts` → `npm run build` 하면 CSS·Tailwind 파일이 다시 생성됩니다 |
| 컴포넌트 모양 바꾸기 | `packages/styles/src/components/*.css` |
| 컴포넌트 동작·props | `packages/react/src/components/*.tsx` |
| 새 컴포넌트 | CSS 파일 추가 → `packages/styles/scripts/build.mjs` 의 `COMPONENTS` 에 등록 → React 컴포넌트 → `apps/docs/src/pages.tsx` 에 페이지 → 스킬의 컴포넌트 표 |
| 에이전트 규칙 | `plugins/carol-design-system/skills/carol-design-system/SKILL.md` |

### 원칙

1. **값이 다르면 carol-web 이 기준입니다.** carol-web `globals.css` 를 바꿨다면 여기도 바꾸고, `packages/tokens/test` 의 기준 표도 같이 고칩니다.
2. **둘 이상의 앱이 쓰는 것만 올립니다.** 한 앱 전용 UI(ops 의 모달·알림 등)는 그 앱에 두었다가, 두 번째 앱이 필요해지면 올립니다.
3. **게임 색은 브랜드 색과 분리합니다** (`@team-carol/tokens/game`).
4. 이름 규칙: JS 는 camelCase(`surface2`), CSS 변수는 `--crl-kebab`(`--crl-surface-2`), 클래스는 BEM 식 `crl-block__elem--mod`.

## 릴리스

1. 세 패키지의 `version` 과 서로 의존하는 버전(`@team-carol/tokens: "0.2.0"` 등)을 함께 올립니다.
2. 스킬 플러그인을 바꿨다면 `plugins/carol-design-system/.claude-plugin/plugin.json` 의 `version` 도 올립니다.
3. 태그를 푸시합니다.

   ```bash
   git tag v0.2.0 && git push origin v0.2.0
   ```

`.github/workflows/release.yml` 이 빌드·테스트 후 GitHub Packages 에 배포합니다.

문서 사이트는 **main 에 푸시할 때마다** `.github/workflows/docs.yml` 이 GitHub Pages 에 올립니다 → <https://team-carol.github.io/carol-design-system/>
