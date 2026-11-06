import { useState } from "react";
import type { ReactNode } from "react";
import {
  Brand,
  Button,
  Card,
  CardBody,
  CardTitle,
  Chip,
  Footer,
  Select,
  Stat,
  StatGrid,
  Tabs,
  Tag,
  TextArea,
  TextInput,
  TopBar,
  TopBarLink,
} from "@team-carol/react";
import { accent, background, border, cssVarName, focus, radius, status, text, typeScale } from "@team-carol/tokens";
import { clearColor, difficultyColor, gameAccent } from "@team-carol/tokens/game";
import type { GameId } from "@team-carol/tokens/game";

interface Page {
  title: string;
  render: () => ReactNode;
}

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-z])([0-9])/g, "$1-$2").toLowerCase();

function Example({ children, code, block }: { children: ReactNode; code: string; block?: boolean }) {
  return (
    <div className="docs-example">
      <div className={`docs-example__stage${block ? " docs-example__stage--block" : ""}`}>{children}</div>
      <pre>
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}

function Header({ title, lead }: { title: string; lead: ReactNode }) {
  return (
    <>
      <h1 className="crl-heading-2">{title}</h1>
      <p className="docs-lead">{lead}</p>
    </>
  );
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="docs-table-wrap">
      <table className="docs-table">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ───────── 시작하기 ───────── */

function Overview() {
  return (
    <>
      <Header
        title="Carol Design System"
        lead="team carol 의 색, 타이포그래피, 컴포넌트. 어두운 캔버스 위 코랄 강조색 하나로 이루어진 시스템이다."
      />
      <div className="docs-cards">
        {[
          ["@team-carol/tokens", "색·타이포·간격 토큰. JS/TS, CSS 변수(--crl-*), Tailwind v4 테마로 나간다."],
          ["@team-carol/styles", "프레임워크 없는 컴포넌트 CSS(crl-* 클래스). 서버에서 만든 HTML 에도 쓴다."],
          ["@team-carol/react", "styles 클래스를 렌더하는 React 18/19 컴포넌트."],
        ].map(([name, desc]) => (
          <Card key={name}>
            <CardTitle>
              <code>{name}</code>
            </CardTitle>
            <CardBody>{desc}</CardBody>
          </Card>
        ))}
      </div>

      <h2>환경별로 쓰는 것</h2>
      <Table
        head={["환경", "가져오는 것"]}
        rows={[
          ["Tailwind v4", <><code>@team-carol/tokens/tailwind.css</code> (+ <code>@team-carol/styles/components.css</code>)</>],
          ["일반 CSS", <><code>@team-carol/styles/carol.css</code> 또는 <code>@team-carol/tokens/tokens.css</code></>],
          ["React", <><code>@team-carol/react</code> + <code>@team-carol/styles/carol.css</code></>],
          ["서버에서 만드는 HTML", <><code>carolCss</code> 문자열 (<code>@team-carol/styles</code>) + <code>crl-*</code> 클래스</>],
          ["Canvas · 이미지 렌더 · Discord", <><code>color</code>, <code>toInt()</code> (<code>@team-carol/tokens</code>)</>],
        ]}
      />

      <h2>설치</h2>
      <p>
        GitHub Packages 에 배포된다. 프로젝트 루트에 <code>.npmrc</code> 를 두고 필요한 패키지만 설치한다. 토큰 설정과 환경별 예시는 저장소 README 에 있다.
      </p>
      <Example
        block
        code={`# .npmrc
@team-carol:registry=https://npm.pkg.github.com

npm install @team-carol/tokens @team-carol/styles @team-carol/react`}
      >
        <p className="crl-caption">
          <a href="https://github.com/team-carol/carol-design-system#readme" target="_blank" rel="noopener">
            README 의 설치 · 사용법 보기
          </a>
        </p>
      </Example>

      <h2>원칙</h2>
      <ul>
        <li>색은 직접 쓰지 않는다. 토큰(또는 --crl-* 변수, Tailwind 클래스)만 쓴다.</li>
        <li>여러 프로젝트가 함께 쓰는 것만 여기 둔다. 한 곳에서만 쓰는 UI 는 그 프로젝트에 둔다.</li>
        <li>게임 고유 색(난이도·랭크)은 브랜드 색과 섞지 않고 <code>@team-carol/tokens/game</code> 에 둔다.</li>
      </ul>
    </>
  );
}

/* ───────── Elements ───────── */

function ColorPage() {
  const groups: [string, Record<string, string>][] = [
    ["Background", background],
    ["Border", border],
    ["Text", text],
    ["Accent", accent],
    ["Status", status],
    ["Focus", focus],
  ];
  return (
    <>
      <Header title="Color" lead="어두운 캔버스 위 코랄 강조색 하나. 면은 canvas → surface → surface-2 순으로 밝아진다." />
      {groups.map(([name, tokens]) => (
        <section key={name}>
          <h2>{name}</h2>
          <Table
            head={["", "토큰 (JS)", "CSS 변수", "Tailwind", "값"]}
            rows={Object.entries(tokens).map(([k, v]) => [
              <div className="docs-swatch" style={{ background: v }} />,
              <code>color.{k}</code>,
              <code>{cssVarName(k)}</code>,
              <code>*-{kebab(k)}</code>,
              <code>{v}</code>,
            ])}
          />
        </section>
      ))}
      <h2>Discord 임베드</h2>
      <Example code={`import { color, toInt } from "@team-carol/tokens";\n\nnew ContainerBuilder().setAccentColor(toInt(color.accent)); // 0xff9294`}>
        <div className="docs-swatch" style={{ background: accent.accent }} />
        <code>toInt(color.accent) === 0xff9294</code>
      </Example>
    </>
  );
}

function TypographyPage() {
  return (
    <>
      <Header
        title="Typography"
        lead="Pretendard(한글) + Noto Sans JP(일본어 곡명) + JetBrains Mono(코드). 제목은 굵게 하지 않고 500(medium)을 쓴다."
      />
      <Table
        head={["역할", "클래스", "크기", "예시"]}
        rows={Object.entries(typeScale).map(([k, v]) => [
          <code>{k}</code>,
          <code>.crl-{kebab(k)}</code>,
          <code>{v.fontSize}</code>,
          <span style={{ fontSize: v.fontSize, lineHeight: v.lineHeight, fontWeight: v.fontWeight, color: "var(--crl-ink)" }}>
            캐롤봇 maimai
          </span>,
        ])}
      />
      <h2>폰트 불러오기</h2>
      <Example
        block
        code={`import { fontUrls } from "@team-carol/tokens";
// <link rel="stylesheet" href={fontUrls.pretendard}>
// <link rel="stylesheet" href={fontUrls.googleFonts}>`}
      >
        <p style={{ fontFamily: "var(--crl-font-mono)" }}>JetBrains Mono — /프로필 @user</p>
      </Example>
    </>
  );
}

function SpacingPage() {
  return (
    <>
      <Header title="Radius & Layout" lead="모서리는 용도 이름으로 부른다. Tailwind 기본 rounded-xl 등과 겹치지 않게 하기 위해서다." />
      <h2>Radius</h2>
      <Table
        head={["토큰", "Tailwind", "값", ""]}
        rows={Object.entries(radius).map(([k, v]) => [
          <code>radius.{k}</code>,
          <code>rounded-{k}</code>,
          <code>{v}</code>,
          <div style={{ width: 64, height: 40, background: "var(--crl-surface-2)", border: "1px solid var(--crl-border-strong)", borderRadius: v }} />,
        ])}
      />
      <h2>Layout</h2>
      <Table
        head={["토큰", "CSS 변수", "Tailwind", "값"]}
        rows={[
          [<code>layout.container</code>, <code>--crl-container</code>, <code>max-w-page</code>, <code>1200px</code>],
          [<code>layout.containerNarrow</code>, <code>--crl-container-narrow</code>, <code>max-w-narrow</code>, <code>880px</code>],
          [<code>layout.gutter</code>, <code>--crl-gutter</code>, <code>px-gutter</code>, <code>clamp(20px, 4vw, 40px)</code>],
          [<code>layout.sectionY</code>, <code>--crl-section-y</code>, <code>py-section</code>, <code>clamp(64px, 8vw, 104px)</code>],
        ]}
      />
    </>
  );
}

function GamePage() {
  const games = Object.keys(difficultyColor) as GameId[];
  return (
    <>
      <Header
        title="Game colors"
        lead="게임 고유 색. 난이도·랭크·클리어 마크는 플레이어가 이미 아는 색이라 브랜드 팔레트와 별개로 둔다."
      />
      <Example block code={`import { difficultyColor, clearColor } from "@team-carol/tokens/game";\n\ndifficultyColor.maimai.MASTER; // "#9333ea"`}>
        {games.map((g) => (
          <section key={g} style={{ marginBottom: 24 }}>
            <p className="crl-eyebrow" style={{ color: gameAccent[g] }}>
              {g}
            </p>
            <p style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {Object.entries(difficultyColor[g]).map(([k, v]) => (
                <span key={k} className="crl-tag" style={{ background: v, color: "#fff" }}>
                  {k}
                </span>
              ))}
            </p>
            <p style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
              {Object.entries(clearColor[g]).map(([k, v]) => (
                <span key={k} style={{ color: v, fontWeight: 800, fontSize: 13 }}>
                  {k}
                </span>
              ))}
            </p>
          </section>
        ))}
      </Example>
    </>
  );
}

/* ───────── Components ───────── */

function ButtonPage() {
  return (
    <>
      <Header title="Button" lead="primary 는 화면당 하나(초대하기·저장). 나머지 동작은 secondary." />
      <Example
        code={`<Button>디스코드에 추가</Button>
<Button variant="secondary">명령어 보기</Button>
<Button size="sm">저장</Button>
<Button href="/commands" variant="secondary" size="lg">링크 버튼</Button>
<Button disabled>비활성</Button>

{/* Next.js <Link> 에 입힐 때 */}
<Link href="/commands" className={buttonClassName({ variant: "secondary" })}>…</Link>

<!-- HTML -->
<a class="crl-btn crl-btn--primary" href="…">디스코드에 추가</a>`}
      >
        <Button>디스코드에 추가</Button>
        <Button variant="secondary">명령어 보기</Button>
        <Button size="sm">저장</Button>
        <Button href="#button" variant="secondary" size="lg">
          링크 버튼
        </Button>
        <Button disabled>비활성</Button>
      </Example>
      <Table
        head={["prop", "값", "기본"]}
        rows={[
          [<code>variant</code>, <code>"primary" | "secondary"</code>, <code>"primary"</code>],
          [<code>size</code>, <code>"sm" | "md" | "lg"</code>, <code>"md"</code>],
          [<code>href</code>, "주면 <a> 로 렌더", "—"],
        ]}
      />
    </>
  );
}

function CardPage() {
  return (
    <>
      <Header title="Card" lead="surface 면 + 1px 테두리 + 16px 모서리. 정보 묶음의 기본 상자." />
      <Example
        block
        code={`<Card>
  <CardTitle>레이팅 카드</CardTitle>
  <CardBody>B50 을 한 장의 이미지로 만들어 줍니다.</CardBody>
</Card>

<!-- HTML -->
<div class="crl-card">
  <h3 class="crl-card__title">레이팅 카드</h3>
  <p class="crl-card__body">…</p>
</div>`}
      >
        <div className="docs-cards">
          <Card>
            <CardTitle>레이팅 카드</CardTitle>
            <CardBody>B50 을 한 장의 이미지로 만들어 줍니다.</CardBody>
          </Card>
          <Card>
            <CardTitle>기록 동기화</CardTitle>
            <CardBody>북마클릿 한 번으로 DX NET 기록을 가져옵니다.</CardBody>
          </Card>
        </div>
      </Example>
    </>
  );
}

function TagPage() {
  return (
    <>
      <Header title="Tag & Chip" lead="Tag 는 작은 상태 배지, Chip 은 크고 둥근 표시용 라벨." />
      <h2>Tag</h2>
      <Example
        code={`<Tag>stopped</Tag>
<Tag tone="accent">NEW</Tag>
<Tag tone="success">running</Tag>
<Tag tone="danger">error</Tag>

<!-- HTML -->
<span class="crl-tag crl-tag--success">running</span>`}
      >
        <Tag>stopped</Tag>
        <Tag tone="accent">NEW</Tag>
        <Tag tone="success">running</Tag>
        <Tag tone="danger">error</Tag>
      </Example>
      <h2>Chip</h2>
      <Example code={`<Chip>/프로필</Chip>\n\n<!-- HTML -->\n<span class="crl-chip">/프로필</span>`}>
        <Chip>/프로필</Chip>
        <Chip>/레이팅</Chip>
        <Chip>/추천</Chip>
      </Example>
    </>
  );
}

function FieldPage() {
  const [v, setV] = useState("");
  return (
    <>
      <Header title="Text input" lead="라벨은 항상 보인다. 오류는 입력 아래에 적고 aria-invalid 를 켠다." />
      <Example
        block
        code={`<TextInput label="곡 별명" placeholder="예: 매드니스" />
<TextInput label="키" error="이미 있는 키입니다" />
<Select label="게임"><option>maimai</option></Select>
<TextArea label="봇 문구" />

<!-- HTML -->
<div class="crl-field">
  <label class="crl-label" for="alias">곡 별명</label>
  <input class="crl-input" id="alias">
</div>`}
      >
        <div style={{ display: "grid", gap: 16, maxWidth: 420 }}>
          <TextInput label="곡 별명" placeholder="예: 매드니스" value={v} onChange={(e) => setV(e.target.value)} helperText="쉼표로 여러 개" />
          <TextInput label="키" defaultValue="DISCORD_TOKEN" error="이미 있는 키입니다" />
          <Select label="게임" defaultValue="maimai">
            <option value="maimai">maimai DX</option>
            <option value="chunithm">CHUNITHM</option>
          </Select>
          <TextArea label="봇 문구" placeholder="{user} 님의 레이팅" />
        </div>
      </Example>
    </>
  );
}

function TabsPage() {
  const [a, setA] = useState("status");
  const [b, setB] = useState("aliases");
  return (
    <>
      <Header title="Tabs" lead="underline 은 한 화면 안에서 내용을 바꿀 때, contained 는 여러 페이지를 묶은 메뉴로 쓴다." />
      <Example
        block
        code={`<Tabs
  value={tab}
  onChange={setTab}
  items={[{ value: "status", label: "상태" }, { value: "containers", label: "컨테이너" }]}
/>
<Tabs variant="contained" … />

<!-- HTML (페이지 이동용 링크 탭) -->
<nav class="crl-tabs crl-tabs--contained">
  <a class="crl-tab is-active" href="/admin/aliases">곡 별명</a>
</nav>`}
      >
        <Tabs
          aria-label="대시보드"
          value={a}
          onChange={setA}
          items={[
            { value: "status", label: "상태" },
            { value: "containers", label: "컨테이너" },
            { value: "config", label: "설정" },
          ]}
        />
        <div style={{ height: 24 }} />
        <Tabs
          aria-label="관리"
          variant="contained"
          value={b}
          onChange={setB}
          items={[
            { value: "aliases", label: "곡 별명" },
            { value: "names", label: "이름 번역" },
            { value: "messages", label: "봇 문구" },
          ]}
        />
      </Example>
    </>
  );
}

function StatPage() {
  return (
    <>
      <Header title="Stat" lead="라벨 + 큰 수치. hero 는 큰 코랄 숫자를 가운데에 둔다." />
      <Example
        block
        code={`<StatGrid>
  <Stat variant="hero" label="사용자" value="1,024" />
</StatGrid>

<StatGrid>
  <Stat label="CPU" value="12%" />
</StatGrid>`}
      >
        <StatGrid>
          <Stat variant="hero" label="사용자" value="1,024" />
          <Stat variant="hero" label="서버" value="128" />
          <Stat variant="hero" label="버전" value="v2.4" />
        </StatGrid>
        <div style={{ height: 32 }} />
        <Card>
          <StatGrid>
            <Stat label="CPU" value="12%" />
            <Stat label="메모리" value="1.2 GB" />
            <Stat label="가동 시간" value="3일 4시간" />
          </StatGrid>
        </Card>
      </Example>
    </>
  );
}

function ShellPage() {
  return (
    <>
      <Header title="TopBar & Footer" lead="모든 페이지가 같은 상단바와 푸터를 쓴다. 브랜드 이미지는 쓰는 쪽의 경로를 markSrc 로 넘긴다." />
      <Example
        block
        code={`<TopBar brand={<Brand name="캐롤봇" markSrc="/carolbot-avatar.png" href="/" />}>
  <TopBarLink href="/commands" active>명령어</TopBarLink>
  <Button size="sm">디스코드에 추가</Button>
</TopBar>

{/* 스크롤과 함께 흐르는 헤더 */}
<TopBar variant="static" brand={<Brand name="캐롤봇 운영" />} />

<Footer>
  <span>team carol</span><span className="crl-topbar__spacer" />
  <a href="/terms">이용약관</a>
</Footer>`}
      >
        <div style={{ border: "1px solid var(--crl-border)", borderRadius: 12, overflow: "hidden" }}>
          <TopBar brand={<Brand name="캐롤봇" href="#shell" />} style={{ position: "static" }}>
            <TopBarLink href="#shell" active>
              명령어
            </TopBarLink>
            <Button size="sm">디스코드에 추가</Button>
          </TopBar>
          <div style={{ height: 60 }} />
          <Footer>
            <span>team carol</span>
            <span className="crl-topbar__spacer" />
            <a href="#shell">이용약관</a>
            <a href="#shell">개인정보처리방침</a>
          </Footer>
        </div>
      </Example>
    </>
  );
}

export const PAGES: Record<string, Page> = {
  overview: { title: "시작하기", render: () => <Overview /> },
  color: { title: "Color", render: () => <ColorPage /> },
  typography: { title: "Typography", render: () => <TypographyPage /> },
  spacing: { title: "Radius & Layout", render: () => <SpacingPage /> },
  game: { title: "Game colors", render: () => <GamePage /> },
  button: { title: "Button", render: () => <ButtonPage /> },
  card: { title: "Card", render: () => <CardPage /> },
  tag: { title: "Tag & Chip", render: () => <TagPage /> },
  field: { title: "Text input", render: () => <FieldPage /> },
  tabs: { title: "Tabs", render: () => <TabsPage /> },
  stat: { title: "Stat", render: () => <StatPage /> },
  shell: { title: "TopBar & Footer", render: () => <ShellPage /> },
};

export const NAV: { label: string; slugs: string[] }[] = [
  { label: "시작하기", slugs: ["overview"] },
  { label: "Elements", slugs: ["color", "typography", "spacing", "game"] },
  { label: "Components", slugs: ["button", "card", "tag", "field", "tabs", "stat", "shell"] },
];
