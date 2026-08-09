/**
 * Menu data — scraped verbatim from enjoysteamers.com/menu (live, 2026-06 revision).
 *
 * Source of truth notes:
 *  - Prices here are CURRENT. Third-party mirrors (allmenus.com, SinglePlatform)
 *    carry a ~2019 price list roughly 35% lower — deliberately NOT used.
 *  - Descriptions preserve the house pipe-delimited style verbatim. Only
 *    unambiguous typos were corrected ("baquette" -> "baguette").
 *  - `raw: true` marks items the restaurant flags with an asterisk, which the
 *    kitchen's own disclaimer covers.
 *  - NO gluten-free flags are recorded. The live menu does not carry per-item GF
 *    marks (only two GF dressings are named). Inventing allergen data would be
 *    unsafe, so the UI points guests to staff instead.
 */

export type MenuItem = {
  name: string;
  price: string | null; // null => Market Price
  desc: string;
  raw?: boolean;
  variants?: { label: string; price: string }[];
};

export type MenuSection = {
  id: string;
  title: string;
  blurb: string;
  note?: string;
  items: MenuItem[];
};

export const MENU: MenuSection[] = [
  {
    id: "appetizers",
    title: "Appetizers",
    blurb: "How the table starts. Crab, tuna and Grandma D's red sauce.",
    items: [
      { name: "Crab Dip", price: "15.00", desc: "crab meat | cream cheese mixture | toasted baguette" },
      { name: "Peppers & Oil", price: "9.00", desc: "marinated hot & sweet peppers extra virgin olive oil | garlic herbs | crostini bread" },
      { name: "#1 Yellowfin Tuna", price: "19.50", raw: true, desc: "fresh center cut yellowfin tuna seared rare | black sesame wasabi | pickled ginger | ginger soy | seaweed salad (we serve only the highest grade tuna)" },
      { name: "Italian Greens", price: "8.00", desc: "escarole | garlic & oil" },
      { name: "Sesame Thai Calamari", price: "15.00", desc: "fresh calamari | thai sauce white sesame seed" },
      { name: "Blackened Tuna Bites", price: "15.00", raw: true, desc: "blackened ahi tuna | cajun remoulade sauce" },
      { name: "Crabmeat Portabella", price: "21.00", desc: "grilled portabella mushroom jumbo lump crab cake | tomato basil cream sauce" },
      { name: "Spinach Artichoke Dip", price: "12.50", desc: "artichoke hearts | chopped spinach | cream cheese cheddar cheese | pita chips" },
      { name: "Bairdi Crab Cluster", price: "31.00", desc: "1LB bairdi crab | old bay seasoned | hot drawn butter" },
      { name: "Tiger Shrimp", price: "11.00", desc: "cold shrimp | bed of lettuce creamy horseradish sauce" },
      { name: "Honey Pecan Brie", price: "13.50", desc: "honey glazed brie | pecans | pita" },
      { name: "Stuffed Hungarians", price: "17.00", desc: "sausage stuffed hot hungarian peppers | Grandma D's red sauce mozzarella cheese" },
      { name: "Taste of Steamers", price: "60.00", desc: "filet tips | crab dip | tiger shrimp blackened tuna bites | cajun remoulade | toasted baguette" },
    ],
  },
  {
    id: "steamed",
    title: "Steamed at the Bar",
    blurb: "The steamer behind the bar. It is what the place is named for.",
    note: "Place any dish over pasta — add $3.00",
    items: [
      { name: "Steamed Clams", price: "17.00", desc: "dozen fresh clams | hot drawn butter" },
      { name: "Clams Ala DeNapoli", price: "17.50", desc: "dozen fresh clams | olive oil butter | garlic | green onion white wine" },
      { name: "Hot & Spicy Shrimp", price: "16.00", desc: "shrimp | olive oil | butter | garlic in-house spicy seasoning | beer french baguette" },
      { name: "Peel & Eat Shrimp", price: "13.50", desc: "shrimp | old bay | seasoning cocktail sauce | lemon" },
      { name: "Mussels Marinara", price: "13.50", desc: "P.E.I. mussels | olive oil | butter garlic | white wine | marinara sauce" },
      { name: "Mussels ala DeNapoli", price: "13.00", desc: "P.E.I. mussels | olive oil | butter garlic | green onion | white wine" },
      { name: "Shrimp Scampi", price: "14.00", desc: "shrimp | olive oil | butter | garlic dry vermouth" },
    ],
  },
  {
    id: "seafood",
    title: "Seafood",
    blurb: "Flown in, cut in house, and the reason people drive out here.",
    note: "Served with a tossed salad",
    items: [
      { name: "Crab Cakes", price: "34.00", desc: "in-house jumbo lump blue crab Maryland style pan-fried crab cakes | remoulade sauce | choice of side" },
      { name: "#1 Ichiban Tuna", price: "36.00", raw: true, desc: "#1 grade yellowfin tuna | seared rare | spicy crab & shrimp topping | sticky rice | ponzu sauce | spicy mango" },
      { name: "Seafood Pink Pasta", price: "34.00", desc: "shrimp | scallops | spinach | cherry tomato | in-house pink sauce | penne pasta" },
      { name: "Orange Salmon", price: "24.00", desc: "char-grilled wild caught salmon orange glaze | rice" },
      { name: "Dill Salmon", price: "23.00", desc: "char-grilled wild caught salmon dill compound butter | choice of side" },
      { name: "Sweet Potato Scallops", price: "34.00", desc: "seared scallops | roasted sweet potato puree | sweet & spicy nuts | choice of side" },
      { name: "Broiled Scallops", price: "32.00", desc: "sea scallops | light wine butter sauce | choice of side" },
      { name: "Panko Haddock", price: "19.50", desc: "deep-fried panko encrusted haddock | choice of side coleslaw | tartar sauce" },
      { name: "King Crab", price: null, desc: "16 oz. king crab | hot drawn butter | choice of side" },
      { name: "Deadly Catch", price: null, desc: "32 oz. king crab | hot drawn butter | choice of side" },
    ],
  },
  {
    id: "steaks",
    title: "Steaks & Chop",
    blurb: "Char-grilled over open flame. Black angus and bone-in Berkshire.",
    note: "Served with a tossed salad",
    items: [
      { name: "Bleu Balsamic Filet", price: "36.00", desc: "char-grilled filet | balsamic reduction | melted bleu cheese crumbles | choice of side" },
      { name: "Boursin NY Strip", price: "34.00", desc: "12 oz. char-grilled chef's choice black angus strip | hot pepper boursin cheese | choice of side" },
      { name: "Dijon Bourbon NY Strip", price: "32.00", desc: "12 oz. char-grilled chef's choice black angus strip | dijon bourbon glaze | choice of side" },
      { name: "Italian BBQ Chop", price: "26.50", desc: "10 oz. char-grilled prime bone-in berkshire pork chop in-house italian balsamic bbq sauce | choice of side" },
      { name: "Japanese Flank Bowl", price: "25.00", desc: "in-house marinated flank mushroom | onion | peas | sticky rice | spicy aioli drizzle" },
    ],
  },
  {
    id: "poultry-pastas",
    title: "Poultry & Pastas",
    blurb: "Grandma D's recipes, carried up from the family's first kitchen.",
    items: [
      { name: "Asiago Chicken Pasta", price: "24.00", desc: "montreal seasoned chicken bacon | spinach | asiago cream sauce | asiago garnish spaghetti" },
      { name: "Baked Penne", price: "17.50", desc: "penne pasta | mushrooms sausage | Grandma D's red sauce | mozzarella cheese" },
      { name: "Chicken Parmesan", price: "22.00", desc: "hand-breaded chicken breast Grandma D's red sauce mozzarella cheese | spaghetti" },
      { name: "Imperial Chicken", price: "32.00", desc: "pan-seared chicken | baked jumbo lump crab | sherry wine sauce | swiss cheese | fresh herb | choice of side" },
      { name: "Scampi Chicken", price: "22.00", desc: "sautéed chicken | spinach | onion | tomato | scampi butter wine sauce | asiago cheese | choice of side" },
      { name: "Spaghetti & Meatballs", price: "17.00", desc: "Grandma D's red sauce & meatballs | spaghetti" },
      {
        name: "Fire-Roasted Tomato Gnocchi",
        price: null,
        desc: "fire-roasted tomato sauce | fresh mozzarella | olive oil | garlic",
        variants: [
          { label: "Vegetarian", price: "22.00" },
          { label: "Chicken", price: "22.00" },
          { label: "Sirloin", price: "23.00" },
          { label: "Shrimp", price: "23.00" },
        ],
      },
    ],
  },
  {
    id: "salads",
    title: "Salads",
    blurb: "Field greens and iceberg, sugared walnuts, house cajun dressing.",
    note: "Add chicken breast $9 · choice sirloin $10 · salmon fillet $14 · ahi tuna fillet $15 · peeled shrimp $9 · U10 scallop $6.50. Dressings: italian, raspberry walnut, ranch, 1000 island, cajun, french, and gluten-free citrus or balsamic vinaigrette.",
    items: [
      { name: "Side Salad", price: "3.50", desc: "iceberg lettuce | spring mix tomato | cucumber | mozzarella cheese | croutons" },
      { name: "Tavern Salad", price: "8.50", desc: "field greens & iceberg | tomato cucumbers | black olives shredded mozzarella | croutons" },
      { name: "Steamers' Toss", price: "10.50", desc: "field greens & iceberg | sugared walnuts | dried cranberries cinnamon croutons | bleu cheese crumbles | raspberry vinaigrette" },
      { name: "Caesar", price: "11.00", desc: "crisp romaine | asiago cheese hard boiled egg | black olives croutons | caesar dressing" },
      { name: "Wedge", price: "13.00", desc: "tomato | bacon | sugared walnuts | red onion | black olives | bleu cheese dressing balsamic drizzle" },
      { name: "Chicken Salad", price: "16.50", desc: "char-grilled chicken breast tavern salad | fries" },
      { name: "Steak Salad", price: "18.00", desc: "char-grilled sirloin | tavern salad fries" },
      { name: "Blackened Tuna Salad", price: "18.50", desc: "char-grilled yellow fin tuna | field greens & iceberg | tomato cucumbers | black olives mozzarella cheese | croutons in-house cajun dressing" },
      { name: "Salmon Salad", price: "21.00", desc: "char-grilled wild caught salmon field greens & iceberg | tomato black olives | feta cheese | citrus vinaigrette" },
    ],
  },
  {
    id: "350",
    title: "350 Degrees",
    blurb: "Hand-cut, hand-breaded, straight out of the fryer.",
    items: [
      { name: "Fresh Buffalo Wings", price: "10.50", desc: "3/4 LB fresh wings | in-house buffalo sauce" },
      { name: "Fried Cheese", price: "8.50", desc: "panko breaded provolone cheese | Grandma D's red sauce" },
      { name: "Chicken Tenders", price: "10.50", desc: "fresh hand-breaded panko chicken tenders | peppercorn parmesan ranch sauce" },
      { name: "Fries", price: "4.50", desc: "hand-cut idaho potato fries" },
      { name: "Sweet Wedges", price: "6.50", desc: "sweet potato wedges cinnamon & honey butter" },
      { name: "Steak-Cut Onion Rings", price: "7.00", desc: "8-large onion rings | cajun sauce" },
    ],
  },
  {
    id: "sandwiches",
    title: "Sandwiches",
    blurb: "Eight ounces, char-grilled, with hand-cut fries.",
    items: [
      { name: "BBQ Pulled Pork", price: "14.50", desc: "slow smoked pork shoulder coleslaw | sweet potato wedges" },
      { name: "Buffalo Chicken", price: "15.50", desc: "8 oz. char-grilled chicken breast in-house buffalo sauce | lettuce tomato | bleu cheese dressing fries" },
      { name: "Reuben", price: "15.50", desc: "sliced corned beef | sauerkraut | rye pumpernickel swirl | swiss cheese | 1000 island | fries" },
      { name: "Haddock Sandwich", price: "18.50", desc: "12 oz. lightly panko breaded haddock | lettuce | tomato tartar sauce | fries" },
      { name: "Bacon Jam Burger", price: "16.50", desc: "8 oz. fresh char-grilled burger in-house bacon jam | smoked gouda | fries" },
      { name: "Pittsburgh Cheeseburger", price: "16.00", desc: "8 oz. fresh char-grilled burger american cheese | coleslaw fries | thousand island" },
      { name: "Burger", price: "15.00", raw: true, desc: "8 oz. fresh char-grilled burger grilled kaiser | LTO | fries" },
    ],
  },
];

export const RAW_DISCLAIMER =
  "Consuming raw or undercooked meats, poultry, seafood, shellfish, or eggs may increase your risk of foodborne illness.";

export const MENU_ITEM_COUNT = MENU.reduce((n, s) => n + s.items.length, 0);
