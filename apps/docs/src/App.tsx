import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Brand, Footer, TopBar, TopBarLink } from "@team-carol/react";
import { PAGES, NAV } from "./pages";

const GITHUB = "https://github.com/team-carol/carol-design-system";

function currentSlug() {
  const s = window.location.hash.replace(/^#\/?/, "");
  return s in PAGES ? s : "overview";
}

export function App() {
  const [slug, setSlug] = useState(currentSlug);

  useEffect(() => {
    const on = () => {
      setSlug(currentSlug());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const page = PAGES[slug];
  useEffect(() => {
    document.title = `${page.title} · Carol Design System`;
  }, [page]);

  return (
    <>
      <TopBar brand={<Brand name="Carol Design System" href="#overview" />}>
        <TopBarLink href={GITHUB} target="_blank" rel="noopener">
          GitHub
        </TopBarLink>
      </TopBar>
      <div className="docs">
        <nav className="docs-nav" aria-label="문서">
          {NAV.map((group) => (
            <Group key={group.label} label={group.label}>
              {group.slugs.map((s) => (
                <a key={s} href={`#${s}`} aria-current={s === slug ? "page" : undefined}>
                  {PAGES[s].title}
                </a>
              ))}
            </Group>
          ))}
        </nav>
        <main className="docs-main">{page.render()}</main>
      </div>
      <Footer>
        <span>team carol</span>
        <span className="crl-topbar__spacer" />
        <a href={GITHUB}>GitHub</a>
      </Footer>
    </>
  );
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <div className="docs-nav__group">{label}</div>
      {children}
    </>
  );
}
