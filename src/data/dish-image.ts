import { DISH_IMAGE } from "./dish-images";
import { MENU } from "./menu";

/**
 * The generated map is keyed on the *raw* scraped dish names, which still carry
 * the menu's asterisk on cooked-to-order items ("Burger*"). `menu.ts` strips
 * that asterisk and records it as `raw: true` instead, so a direct lookup
 * silently misses those four dishes.
 *
 * Normalising both sides at lookup time keeps the generated file untouched and
 * regenerable.
 */
const normalize = (name: string) =>
  name
    .replace(/\*/g, "")
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const BY_NORMALIZED = new Map(
  Object.entries(DISH_IMAGE).map(([name, slug]) => [normalize(name), slug]),
);

/** Image slug for a dish, or undefined when we genuinely have no photograph. */
export function dishImage(name: string): string | undefined {
  return BY_NORMALIZED.get(normalize(name));
}

/** Dishes on the menu with no matching photograph. Used by the test. */
export function missingDishImages(): string[] {
  return MENU.flatMap((s) => s.items)
    .filter((i) => !dishImage(i.name))
    .map((i) => i.name);
}
