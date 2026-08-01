"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IconSearch } from "@/components/icons";

/** Header search box (Phase 2 §4.1). Real URL results via /search/?q=; "/" focuses input on desktop. */
export function SearchBar({
  placeholder = "Try 'how long does milk last'",
  autoFocus = false,
  big = false,
}: {
  placeholder?: string;
  autoFocus?: boolean;
  big?: boolean;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const q = String(data.get("q") ?? "").trim();
    if (q) router.push(`/search/?q=${encodeURIComponent(q)}`);
  }

  return (
    <form role="search" onSubmit={onSubmit} className={big ? "w-full" : "w-full max-w-xs"}>
      <label className="sr-only" htmlFor="site-search">
        Search Home Storage Guide
      </label>
      <div className="relative">
        <IconSearch
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-ink-300"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id="site-search"
          name="q"
          type="search"
          placeholder={placeholder}
          autoComplete="off"
          autoFocus={autoFocus}
          className={`w-full rounded-control border border-brand-line bg-brand-paper pl-10 pr-4 text-body text-brand-ink-900 placeholder:text-brand-ink-300 ${big ? "min-h-12" : "min-h-10"}`}
        />
      </div>
    </form>
  );
}
