"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { siteConfig } from "@/config/site";
import type { InternalLink } from "@/config/types";
import { assetPath, routePath } from "@/lib/urls";
import styles from "./fixed-template-header.module.css";

export function FixedTemplateHeader({ links }: { links: InternalLink[] }) {
  const pathname = (usePathname() || "/").replace(/\/+$/, "") || "/";
  const menu = useRef<HTMLDetailsElement>(null);
  const entries = [{ label: "Home", slug: "" }, ...links];
  function closeMenu() { if (menu.current) menu.current.open = false; }
  function navigation(mobile = false) {
    return entries.map((link) => {
      const href = routePath(link.slug);
      const active = (href.replace(/\/+$/, "") || "/") === pathname;
      return <Link key={link.slug} href={href} className={active ? "active" : undefined}
        aria-current={active ? "page" : undefined} onClick={mobile ? closeMenu : undefined}>{link.label}</Link>;
    });
  }
  return (
    <header className={`top ${styles.header}`}>
      <div className={`wrap top-inner ${styles.row}`}>
        <Link className="brand" href={routePath("")} onClick={closeMenu} aria-label="Steal a Superpower home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-logo" src={assetPath(siteConfig.assets.logo)} alt="" width={38} height={38} />
          <strong>{siteConfig.shortName}</strong>
        </Link>
        <nav className={`site-nav ${styles.desktop}`} aria-label="Primary navigation">{navigation()}</nav>
        <details ref={menu} className={styles.mobile} onKeyDown={(event) => {
          if (event.key === "Escape") { closeMenu(); menu.current?.querySelector("summary")?.focus(); }
        }}>
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">{navigation(true)}</nav>
        </details>
      </div>
    </header>
  );
}
