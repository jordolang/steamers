"use client";

import { useEffect, useState } from "react";
import { HOURS } from "@/data/site";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Reads the wall clock in North Lima regardless of the visitor's own zone. */
function nowInOhio() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  // Intl can emit "24" for midnight; normalise it to 0.
  const hour = Number(get("hour")) % 24;
  return { day: dayIndex, minutes: hour * 60 + Number(get("minute")) };
}

function fmt(minutes: number) {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${h24 < 12 ? "am" : "pm"}`;
}

function describe(): { open: boolean; label: string } {
  const { day, minutes } = nowInOhio();
  const today = HOURS[day];

  if (today && minutes >= today.open && minutes < today.close) {
    const left = today.close - minutes;
    return {
      open: true,
      label: left <= 60 ? `Open · closing at ${fmt(today.close)}` : `Open until ${fmt(today.close)}`,
    };
  }

  // Still today, but before service.
  if (today && minutes < today.open) {
    return { open: false, label: `Opens at ${fmt(today.open)}` };
  }

  // Find the next day that has service.
  for (let i = 1; i <= 7; i++) {
    const idx = (day + i) % 7;
    const next = HOURS[idx];
    if (!next) continue;
    const when = i === 1 ? "tomorrow" : DAY_NAMES[idx];
    return { open: false, label: `Closed · opens ${when} at ${fmt(next.open)}` };
  }

  return { open: false, label: "Closed" };
}

/**
 * Live open/closed pill. Renders a stable placeholder on the server so the
 * markup matches on hydration, then fills in the real state on the client.
 */
export function OpenStatus({ className = "inline-flex" }: { className?: string }) {
  const [state, setState] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    // The initial state is intentionally `null` so the server and the first
    // client render agree (the server cannot know the visitor's local time).
    // Filling it in here is the deliberate post-hydration hand-off, not a
    // cascading-render bug, so the rule is suppressed for this line only.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(describe());
    const id = window.setInterval(() => setState(describe()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!state) {
    // Reserve the same box so nothing shifts when the real state lands.
    // `className` owns `display` so a caller's `hidden` isn't fighting a
    // hardcoded `inline-flex` for specificity.
    return <span className={`h-5 w-40 ${className}`} aria-hidden />;
  }

  return (
    <span className={`items-center gap-2 ${className}`}>
      <span className="relative flex size-2">
        {state.open && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
        )}
        <span
          className={`relative inline-flex size-2 rounded-full ${
            state.open ? "bg-emerald-400" : "bg-limestone-dim"
          }`}
        />
      </span>
      <span className="font-mono text-xs tracking-wide text-limestone">{state.label}</span>
    </span>
  );
}
