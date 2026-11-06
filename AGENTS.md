# carol-design-system

team carol 공용 디자인 시스템 모노레포. 사람용 설명은 README.md.

## 규칙

- 값의 원본은 `packages/tokens/src/*.ts` 하나다. `dist/` 의 CSS·Tailwind 파일은 생성물이라 직접 고치지 않는다. 브랜드 값을 바꾸면 `packages/tokens/test/tokens.test.mjs` 의 기준 표도 고친다.
- **여러 프로젝트가 함께 쓰는 것만 넣는다.** 한 곳에서만 쓰는 UI 는 넣지 않는다.
- 문서·주석·스킬에 이 시스템을 쓰는 특정 프로젝트 이름을 적지 않는다. 사용법은 환경(Tailwind, CSS, React, 서버 HTML, Canvas)으로 설명한다.
- 게임 고유 색은 `packages/tokens/src/game.ts` 에만 둔다. 브랜드 색과 섞지 않는다.
- CSS 는 토큰 변수(`var(--crl-*)`)만 쓴다. hex 를 박지 않는다 (예외: `.crl-brand__mark` 의 흰 바탕).
- 이름: JS camelCase(`surface2`) → CSS `--crl-surface-2` → Tailwind `surface-2`. 클래스는 `crl-block__elem--mod`.
- 패키지는 ESM + CJS 둘 다 낸다. `"module": "commonjs"` TypeScript 에서도 타입이 잡히도록 하위 경로를 추가하면 `typesVersions` 도 함께 추가한다.
- `@team-carol/react` 번들에는 `"use client"` 가 붙는다. 서버에서 호출할 순수 함수는 `@team-carol/styles` 에 둔다.

## 새 컴포넌트를 넣을 때

1. `packages/styles/src/components/<name>.css` 추가 → `packages/styles/scripts/build.mjs` 의 `COMPONENTS` 에 등록
2. `packages/react/src/components/<Name>.tsx` → `packages/react/src/index.ts` 에서 export
3. `apps/docs/src/pages.tsx` 에 페이지 추가 (`PAGES`, `NAV`)
4. README 컴포넌트 표, 스킬(`plugins/carol-design-system/skills/carol-design-system/SKILL.md`) 컴포넌트 표 갱신

## 확인

```bash
npm run build && npm test && npm run typecheck && npm run build -w carol-docs
```
