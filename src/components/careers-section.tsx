import { SITE } from "@/data/site";
import { Reveal } from "./reveal";

/**
 * Hiring. Role titles are the ones that actually appear on the restaurant's
 * Indeed profile — Line Cook, Prep Cook, Server, Hostess — not a generic list.
 *
 * The framing is drawn from a 2017 employee review describing a family-owned
 * business that treats staff like family. We do not claim wages, benefits or
 * current openings, because none of that is published.
 */
const ROLES = ["Server", "Hostess", "Line Cook", "Prep Cook"];

export function CareersSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative z-10 scroll-mt-[68px] border-t border-ink-3 bg-ink py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal>
            <div className="rule mb-6" />
            <p className="eyebrow mb-4">
              Hiring<span className="pipe">|</span>North Lima
            </p>
            <h2 id="work-title" className="display-md">
              Work here
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-limestone">
              Two owners, one family, and a kitchen that has been running since
              2003. Roles that come open are the ones you would expect in a
              tavern this size — front of house and back.
            </p>
          </Reveal>

          <Reveal stagger>
            <ul className="mb-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-ink-3 sm:grid-cols-4 lg:grid-cols-2">
              {ROLES.map((role) => (
                <li key={role} className="bg-ink-2 px-5 py-6">
                  <p className="font-display text-lg text-steam">{role}</p>
                </li>
              ))}
            </ul>

            <p className="text-sm leading-relaxed text-limestone-dim">
              Openings are not posted on a schedule. The way in is to call or
              stop by and ask for a manager.
            </p>

            <a
              href={SITE.phoneHref}
              className="mt-6 inline-flex min-h-12 items-center rounded-full border border-steam/30 px-7 text-sm font-semibold text-steam transition-colors hover:border-steam hover:bg-steam/10"
            >
              Ask about openings · {SITE.phone}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
