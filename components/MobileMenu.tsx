"use client";

import { useState } from "react";
import { nav } from "@/lib/site";
import { IconMenu, IconClose } from "@/components/icons";
import { SearchBar } from "@/components/SearchBar";

/** Mobile navigation drawer (Phase 2 §1.6.9) — full-width overlay, focus-managed, Esc closes. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="btn btn--ghost !min-h-10 !px-3 md:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(true)}
      >
        <IconMenu className="h-5 w-5" aria-hidden="true" />
      </button>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 flex flex-col bg-brand-paper md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="container-site flex items-center justify-between py-3">
            <a href="/" className="font-display text-h4 font-bold no-underline text-brand-ink-900">
              Home Storage Guide
            </a>
            <button
              type="button"
              className="btn btn--ghost !min-h-10 !px-3"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              autoFocus
            >
              <IconClose className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="container-site py-4">
            <SearchBar />
          </div>
          <nav className="container-site flex-1 py-2" aria-label="Mobile">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block rounded-control px-3 py-3 font-display text-h4 font-semibold no-underline text-brand-ink-900 hover:bg-brand-paper-soft"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="container-site border-t border-brand-line py-4 text-small text-brand-ink-500">
            <a href="/about/" className="no-underline hover:underline">
              About
            </a>
            {" · "}
            <a href="/contact/" className="no-underline hover:underline">
              Contact
            </a>
            {" · "}
            <a href="/about/editorial-policy/" className="no-underline hover:underline">
              Editorial policy
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
