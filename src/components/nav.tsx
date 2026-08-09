"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SITE } from "@/data/site";
import { OpenStatus } from "./open-status";

const LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/#steamer", label: "The Steamer" },
  { href: "/#story", label: "Story" },
  { href: "/#events", label: "Events" },
  { href: "/#visit", label: "Visit" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        solid ? "border-b border-ink-3 bg-ink/92 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${SITE.name} — home`}>
          <Image
            src="/brand/steamers-logo.png"
            alt={SITE.name}
            width={2877}
            height={1257}
            priority
            // Without this Next has only the intrinsic 2877px to go on and
            // asks for the 3840 variant — 67 KB for a mark drawn 36px tall.
            sizes="120px"
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-limestone transition-colors hover:text-steam"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <OpenStatus className="hidden xl:inline-flex" />
          <a
            href={SITE.phoneHref}
            className="hidden min-h-10 items-center rounded-full bg-carmine px-5 text-sm font-semibold text-steam transition-colors hover:bg-carmine-bright sm:inline-flex"
          >
            {SITE.phone}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex size-10 items-center justify-center rounded-full border border-ink-3 text-steam lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden fill="none">
              <path
                d={open ? "M2 2l14 8M16 2L2 10" : "M0 1h18M0 6h18M0 11h18"}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-ink-3 bg-ink/98 backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Primary mobile" className="flex flex-col px-5 py-4">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink-3 py-4 font-display text-2xl text-steam last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-5">
              <OpenStatus />
              <a
                href={SITE.phoneHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-carmine px-6 font-semibold text-steam"
              >
                Call {SITE.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
