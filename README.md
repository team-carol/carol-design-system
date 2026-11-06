# Carol Design System

team carol 의 색, 타이포그래피, 컴포넌트를 담은 디자인 시스템입니다.

- 문서 사이트: <https://team-carol.github.io/carol-design-system/>
- 패키지: `@team-carol/tokens` · `@team-carol/styles` · `@team-carol/react`

## 목차

1. [패키지 구성](#패키지-구성)
2. [설치](#설치)
3. [사용법](#사용법) — Tailwind · CSS · React · 서버에서 만드는 HTML · Canvas/Discord
4. [토큰](#토큰)
5. [컴포넌트](#컴포넌트)
6. [에이전트 스킬](#에이전트-스킬)
7. [개발](#개발)
8. [릴리스](#릴리스)

---

## 패키지 구성

```
carol-design-system/
├─ packages/
│  ├─ tokens/   @team-carol/tokens   색·타이포·간격 토큰 → JS/TS, CSS 변수, Tailwind v4 테마
│  ├─ styles/   @team-carol/styles   프레임워크 없는 컴포넌트 CSS (crl-* 클래스)
│  └─ react/    @team-carol/react    styles 클래스를 렌더하는 React 18/19 컴포넌트
├─ apps/docs/                        문서 사이트
└─ plugins/carol-design-system/      에이전트 스킬 (Claude Code 플러그인)
```

| 가져오는 경로 | 내용 |
|---|---|
| `@team-carol/tokens` | `color`, `typeScale`, `radius`, `layout`, `fontFamily`, `toInt()`, `withAlpha()`, `toCssVars()` |
| `@team-carol/tokens/game` | 게임 고유 색 — `difficultyColor`, `clearColor`, `trophy`, `circle` … |
| `@team-carol/tokens/tokens.css` | `:root { --crl-* }` CSS 변수 |
| `@team-carol/tokens/tailwind.css` | Tailwind v4 `@theme` + `px-gutter` · `py-section` 유틸리티 |
| `@team-carol/styles/carol.css` | 토큰 + 리셋 + 컴포넌트 CSS |
| `@team-carol/styles/components.css` | 토큰 + 컴포넌트 CSS (리셋 없음) |
| `@team-carol/styles` | 위 CSS 를 문자열로(`carolCss`, `componentsCss`), `buttonClassName()`, `cx()` |
| `@team-carol/react` | `Button`, `Card`, `Tag`, `Chip`, `TextInput`, `TextArea`, `Select`, `Tabs`, `Stat`, `TopBar`, `Footer` … |

모든 패키지는 **ESM + CJS** 로 나가고, `"module": "commonjs"` 인 TypeScript 프로젝트에서도 하위 경로(`/game`)까지 타입이 잡힙니다.

## 설치

패키지는 **GitHub Packages** (`npm.pkg.github.com`) 에 배포됩니다. GitHub Packages 는 공개 패키지라도 설치할 때 토큰이 필요합니다.

**1. 토큰 (사람마다 한 번)** — GitHub → Settings → Developer settings → Personal access tokens (classic) 에서 `read:packages` 권한으로 발급해 홈 디렉터리의 `~/.npmrc` 에 넣습니다. 커밋하지 않습니다.

```ini
# ~/.npmrc
//npm.pkg.github.com/:_authToken=ghp_xxxxxxxxxxxx
```

**2. 프로젝트 `.npmrc` (프로젝트마다 한 번, 커밋)**

```ini
@team-carol:registry=https://npm.pkg.github.com
```

**3. 설치** — 필요한 것만 받습니다.

```bash
npm install @team-carol/tokens                      # 토큰만
npm install @team-carol/tokens @team-carol/styles   # + 컴포넌트 CSS
npm install @team-carol/react @team-carol/styles    # + React 컴포넌트
```

### CI · Docker

- **GitHub Actions** — `actions/setup-node` 에 `registry-url: https://npm.pkg.github.com`, `scope: "@team-carol"` 를 주고 `npm ci` 에 `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}` 를 넘깁니다. 다른 저장소에서 읽으려면 패키지 설정의 *Manage Actions access* 에 그 저장소를 추가합니다.
- **Docker** — 토큰은 빌드 시크릿으로 넘겨 이미지에 남기지 않습니다.

  ```dockerfile
  RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci
  ```
  ```bash
  docker build --secret id=npmrc,src=$HOME/.npmrc .
  ```

### 배포 전에 로컬에서 써 보기

```bash
npm install && npm run build
npm pack -w @team-carol/tokens -w @team-carol/styles -w @team-carol/react --pack-destination ../carol-packs
# 쓰는 쪽에서
npm install ../carol-packs/team-carol-tokens-0.1.0.tgz
```

---

## 사용법

### Tailwind v4

```css
/* globals.css */
@import "tailwindcss";
@import "@team-carol/tokens/tailwind.css";
@import "@team-carol/styles/components.css" layer(components);   /* crl-* 클래스도 쓸 때 */
```

```tsx
<section className="bg-canvas-alt py-section">
  <div className="mx-auto max-w-page px-gutter">
    <div className="rounded-card border border-border bg-surface p-7 text-ink-soft">…</div>
  </div>
</section>
```

- `components.css` 는 **`tailwindcss` 다음에** 불러옵니다. 앞에 두면 `components` 레이어가 먼저 선언돼 Tailwind preflight 가 버튼 배경 등을 지웁니다. 이 순서면 `theme → base → components → utilities` 가 되어 유틸리티 클래스로 `crl-*` 를 덮어쓸 수 있습니다.
- 모서리는 용도 이름(`rounded-card`, `rounded-button` …)이라 Tailwind 기본 `rounded-xl` 등과 겹치지 않습니다.

### 일반 CSS

```css
@import "@team-carol/styles/carol.css";   /* 토큰 + 리셋 + 컴포넌트 */
/* 또는 변수만: @import "@team-carol/tokens/tokens.css"; */

.my-panel {
  background: var(--crl-surface);
  border: 1px solid var(--crl-border);
  border-radius: var(--crl-radius-card);
  color: var(--crl-ink-soft);
}
```

### React

```tsx
// 진입 파일에서 한 번
import "@team-carol/styles/carol.css";

import { Button, Card, CardTitle, Tabs, Tag } from "@team-carol/react";

<Card>
  <CardTitle>컨테이너</CardTitle>
  <Tag tone="success">running</Tag>
</Card>
<Tabs value={tab} onChange={setTab} items={[{ value: "a", label: "상태" }, { value: "b", label: "설정" }]} />
<Button>저장</Button>
<Button href="/docs" variant="secondary">문서</Button>
```

- `@team-carol/react` 는 `"use client"` 가 붙어 나가서 Next.js App Router 에서 그대로 렌더됩니다.
- 서버 컴포넌트에서 `buttonClassName()` 같은 함수를 **호출**하려면 `"use client"` 가 없는 `@team-carol/styles` 에서 import 합니다.

  ```tsx
  import Link from "next/link";
  import { buttonClassName } from "@team-carol/styles";

  <Link href="/commands" className={buttonClassName({ variant: "secondary", size: "lg" })}>명령어</Link>
  ```

### 서버에서 만드는 HTML (빌드 도구 없이)

CSS 를 문자열로 받아 `<style>` 에 넣고, 마크업에는 `crl-*` 클래스를 씁니다.

```ts
import { carolCss } from "@team-carol/styles";

const html = `<!doctype html><html><head><style>${carolCss}</style></head><body>
  <header class="crl-topbar"><div class="crl-topbar__inner">
    <a class="crl-brand" href="/">캐롤봇</a><span class="crl-topbar__spacer"></span>
  </div></header>
  <main class="crl-container crl-section">
    <div class="crl-field">
      <label class="crl-label" for="q">곡 별명</label>
      <input class="crl-input" id="q">
    </div>
    <button class="crl-btn crl-btn--primary">저장</button>
  </main>
</body></html>`;
```

### Canvas · 이미지 렌더(satori 등) · Discord

CSS 변수를 못 쓰는 곳에서는 JS 값을 씁니다.

```ts
import { color, toInt, withAlpha } from "@team-carol/tokens";
import { difficultyColor } from "@team-carol/tokens/game";

el("div", { background: color.surface, border: `1px solid ${color.border}`, borderRadius: 16 });
withAlpha(color.canvas, 0.9);                                  // "rgba(26, 26, 28, 0.9)"
embed.setAccentColor(toInt(difficultyColor.maimai.MASTER));    // 0x9333ea
```

---

## 토큰

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

- **모서리** `radius`: `inline 6` · `small 8` · `control 10` · `button 12` · `card 16` · `hero 32` · `pill 999` (Tailwind `rounded-card` 등)
- **레이아웃** `layout`: `container 1200px` · `containerNarrow 880px` · `gutter clamp(20px, 4vw, 40px)` · `sectionY clamp(64px, 8vw, 104px)` (Tailwind `max-w-page` · `max-w-narrow` · `px-gutter` · `py-section`)
- **글꼴** `fontFamily`: Pretendard → Noto Sans JP → 시스템 / JetBrains Mono. 웹 폰트 주소는 `fontUrls`
- **타입 스케일** `typeScale`: `display` · `heading1–4` · `bodyLg` · `body` · `bodySm` · `label` · `caption` · `legal` (Tailwind `text-heading-1`, 클래스 `crl-heading-1` 등). 제목 굵기는 500
- **게임 색** `@team-carol/tokens/game`: 난이도·랭크·클리어 마크·칭호·서클 색. 브랜드 색과 섞지 않습니다

## 컴포넌트

예시와 코드는 [문서 사이트](https://team-carol.github.io/carol-design-system/)에 있습니다.

| 컴포넌트 | React | HTML 클래스 |
|---|---|---|
| Button | `<Button variant size href>` · `buttonClassName()` | `crl-btn crl-btn--primary\|secondary [crl-btn--sm\|--lg]` |
| Card | `<Card>` `<CardTitle>` `<CardBody>` | `crl-card` `crl-card__title` `crl-card__body` |
| Tag | `<Tag tone="neutral\|accent\|success\|danger">` | `crl-tag [crl-tag--success …]` |
| Chip | `<Chip>` | `crl-chip` |
| Text input | `<TextInput>` `<TextArea>` `<Select>` (`label` `helperText` `error`) | `crl-field` > `crl-label` + `crl-input` + `crl-helper` |
| Tabs | `<Tabs items value onChange variant="underline\|contained">` | `crl-tabs [crl-tabs--contained]` > `crl-tab [is-active]` |
| Stat | `<StatGrid>` `<Stat label value variant="default\|hero">` | `crl-stat-grid` > `crl-stat` |
| TopBar | `<TopBar brand variant="sticky\|static">` `<Brand>` `<TopBarLink>` | `crl-topbar` > `crl-topbar__inner` |
| Footer | `<Footer>` | `crl-footer` > `crl-footer__inner` |
| 타이포 · 레이아웃 | — | `crl-display` `crl-heading-1..4` `crl-body-lg` `crl-caption` `crl-eyebrow` `crl-container` `crl-section` |

---

## 에이전트 스킬

에이전트(Claude Code 등)가 이 디자인 시스템을 쓰는 프로젝트에서 UI 를 고칠 때 규칙을 따르도록 스킬을 함께 배포합니다. 색 hex 를 직접 쓰지 않을 것, 토큰·컴포넌트 표, 예전 이름 대응표가 들어 있습니다.

원본: [`plugins/carol-design-system/skills/carol-design-system/SKILL.md`](plugins/carol-design-system/skills/carol-design-system/SKILL.md)

**플러그인으로 설치 (권장)** — 이 저장소가 Claude Code 플러그인 마켓플레이스를 겸합니다.

```text
/plugin marketplace add team-carol/carol-design-system
/plugin install carol-design-system@team-carol
```

팀 전체에 켜려면 쓰는 프로젝트의 `.claude/settings.json` 에 넣고 커밋합니다.

```json
{
  "extraKnownMarketplaces": {
    "team-carol": { "source": { "source": "github", "repo": "team-carol/carol-design-system" } }
  },
  "enabledPlugins": { "carol-design-system@team-carol": true }
}
```

**파일 복사** — 플러그인 없이 쓰려면 프로젝트에 복사해 커밋합니다.

```bash
mkdir -p .claude/skills/carol-design-system
curl -fsSL https://raw.githubusercontent.com/team-carol/carol-design-system/main/plugins/carol-design-system/skills/carol-design-system/SKILL.md \
  -o .claude/skills/carol-design-system/SKILL.md
```

**AGENTS.md 를 읽는 다른 도구** — 프로젝트 `AGENTS.md` 에 추가합니다.

```md
## 디자인 시스템
UI·색·글꼴을 다룰 때는 @team-carol/* 디자인 시스템을 따른다. 색 hex 를 직접 쓰지 않는다.
규칙: https://github.com/team-carol/carol-design-system/blob/main/plugins/carol-design-system/skills/carol-design-system/SKILL.md
```

---

## 개발

```bash
npm install
npm run build       # tokens → styles → react 순서로 빌드
npm test
npm run typecheck
npm run docs        # 빌드 후 문서 사이트 (http://localhost:5173)
```

| 하고 싶은 일 | 고칠 곳 |
|---|---|
| 색·간격 값 | `packages/tokens/src/*.ts` (빌드하면 CSS·Tailwind 파일이 다시 생성됨) |
| 컴포넌트 모양 | `packages/styles/src/components/*.css` |
| 컴포넌트 동작·props | `packages/react/src/components/*.tsx` |
| 새 컴포넌트 | CSS 추가 → `packages/styles/scripts/build.mjs` 의 `COMPONENTS` 등록 → React 컴포넌트 → `apps/docs/src/pages.tsx` 페이지 → 스킬의 컴포넌트 표 |
| 에이전트 규칙 | `plugins/carol-design-system/skills/carol-design-system/SKILL.md` |

**원칙**

1. 값의 원본은 `packages/tokens/src` 하나입니다. `dist/` 는 생성물이라 고치지 않습니다.
2. 여러 프로젝트가 함께 쓰는 것만 넣습니다. 한 곳에서만 쓰는 UI 는 그 프로젝트에 둡니다.
3. 게임 색은 브랜드 색과 분리합니다.
4. 이름: JS camelCase(`surface2`) · CSS 변수 `--crl-surface-2` · Tailwind `surface-2` · 클래스 `crl-block__elem--mod`.

## 릴리스

1. 세 패키지의 `version` 과 서로 의존하는 버전을 함께 올립니다. 스킬을 바꿨다면 `plugins/carol-design-system/.claude-plugin/plugin.json` 의 `version` 도 올립니다.
2. 태그를 푸시하면 `.github/workflows/release.yml` 이 빌드·테스트 후 GitHub Packages 에 배포합니다.

   ```bash
   git tag v0.2.0 && git push origin v0.2.0
   ```

문서 사이트는 `main` 에 푸시할 때마다 `.github/workflows/docs.yml` 이 GitHub Pages 에 올립니다.
