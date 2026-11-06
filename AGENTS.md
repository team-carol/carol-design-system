# carol-design-system

team carol 세 앱(carol-web · carol · carol-ops)의 공용 디자인 시스템 모노레포. 사람용 설명은 README.md.

## 규칙

- **기준은 carol-web.** 토큰 값이 앱마다 다르면 carol-web `app/globals.css` 값을 따른다. 기준 값을 바꾸면 `packages/tokens/test/tokens.test.mjs` 의 표도 고친다.
- **둘 이상의 앱이 쓰는 것만 올린다.** 한 앱 전용 UI 는 넣지 않는다.
- 게임 고유 색은 `packages/tokens/src/game.ts` 에만 둔다. 브랜드 색과 섞지 않는다.
- 값의 원본은 `packages/tokens/src/*.ts` 하나다. `dist/` 의 CSS·Tailwind 파일은 생성물이라 직접 고치지 않는다.
- CSS 는 토큰 변수(`var(--crl-*)`)만 쓴다. hex 를 박지 않는다 (예외: `.crl-brand__mark` 의 흰 바탕).
- 이름: JS camelCase(`surface2`) → CSS `--crl-surface-2` → Tailwind `surface-2`. 클래스는 `crl-block__elem--mod`.
- 패키지는 ESM + CJS 둘 다 낸다. carol 이 `"module": "commonjs"` 라서 하위 경로를 추가하면 `typesVersions` 도 함께 추가한다.
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
