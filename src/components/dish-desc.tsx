import { Fragment } from "react";

/**
 * Renders a menu description in the restaurant's own house style.
 *
 * Steamers writes its menu with pipes:
 *   "crab meat | cream cheese mixture | toasted baguette"
 *
 * Rather than normalise that away into prose, the pipe is treated as the
 * brand's punctuation — tinted carmine and given air, so each line reads as
 * an ingredient rhythm. The text itself is never altered.
 */
export function DishDesc({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split("|").map((p) => p.trim());

  return (
    <p className={`dish-desc ${className}`}>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <span className="pipe" aria-hidden>
              |
            </span>
          )}
          {part}
        </Fragment>
      ))}
    </p>
  );
}
