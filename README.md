# Daniel's Recipe Book

A phone-friendly recipe book: 22 recipes Daniel experimented with and adapted, including a full Thanksgiving dinner with a three-day prep plan. It is a plain static web page with no build step, no dependencies and no server.

The Thanksgiving recipes started as a cookbook for cooking in bulk for 100 to 150 people. Here each one is written as a single home batch, and the page scales it back up when you need more.

## What it does

- **Recipe list** for the whole book, grouped by type, with search (by recipe or ingredient) and vegan and gluten-free filters.
- **Sections** with their own page, home-screen button and tab: Thanksgiving dinner (with the prep plan and the turkey calculator) and Desserts.
- **Batch scaling** from ½ batch to 30 batches. Amounts are rewritten in sensible kitchen units as they change (3 tsp becomes 1 tbsp, 16 oz becomes 1 lb). A "Big dinner" button jumps to the batch count the original bulk cookbook used.
- **US and metric units.** Metric shows grams and millilitres, leads with Celsius, and converts the measurements inside the steps and notes too.
- **Ingredient swaps.** Dairy lines in some recipes have a drop-down of one-for-one vegan alternatives. A recipe is tagged vegan once every swap is made.
- **Cooking aids:** tap an ingredient or a step to cross it off, and keep the screen awake while you cook (on browsers that support it).
- **Links between recipes** (ingredients that are recipes themselves, and related recipes), with a button back to the recipe you came from at the same scroll position.
- **Thanksgiving prep plan** with checklists for two days before, the day before and Thanksgiving day, plus a calculator for when the turkey goes in the oven.
- Light and dark themes that follow the phone's setting.

Batch sizes, unit choice, swaps and prep plan check marks are saved in the browser's local storage, so they stay on that phone only.

## Running it

Open `index.html` in a browser. That's all.

To use it on a phone, host the folder on any static host. With GitHub Pages: push this repository to GitHub, then in the repository's **Settings → Pages** choose the main branch and the root folder. The site will be published at `https://<your-username>.github.io/<repository-name>/`.

The page loads two typefaces from Google Fonts. Without a connection it falls back to the phone's own fonts and everything else still works.

## Files

| File | What it holds |
|---|---|
| `index.html` | The page shell. |
| `recipes.js` | Shared setup: the groups, the tags, the sections and the field reference. |
| `recipes/thanksgiving.js` | The Thanksgiving section (mains, sides, sauces, leftover soup) and the prep plan. |
| `recipes/everyday.js` | Everything else that is not a dessert. |
| `recipes/desserts.js` | The Desserts section, including the two served at Thanksgiving. |
| `app.js` | The page logic: views, scaling, unit conversion, swaps, navigation. |
| `styles.css` | The design, including dark mode and print styles. |

## Editing recipes

Recipes live in the `recipes/` folder, one file per section. To add a section, create another file like them and add a `<script>` line for it in `index.html`, after `recipes.js` and before `app.js`. Amounts are written once, for one batch, in US units; the page does the scaling and the metric conversion.

A recipe looks like this:

```js
{
  id: "green-beans",                  // used in the page address; keep it unique
  name: "Garlic green beans",
  group: "Sides",                     // must match a name in window.GROUPS
  section: "thanksgiving",            // the section it belongs to, from window.SECTIONS (optional)
  tags: ["vegan", "gf"],              // keys from window.TAGS
  makes: { n: [8, 8], what: "servings" },
  crowd: 10,                          // batches for the big dinner (optional)
  equipment: ["Large pan or wok", "Mixing bowl"],
  parts: [
    {
      title: "Optional heading for this group of ingredients",
      items: [
        { q: 2, u: "lb", item: "fresh green beans, washed and trimmed" },
        { q: 6, u: "clove", item: "garlic, minced" },
        { item: "Salt and pepper" }
      ]
    }
  ],
  steps: [
    { title: "Optional heading", items: ["First step.", "Second step."] }
  ],
  notes: ["Anything worth knowing."],
  related: ["turkey"],                // ids of recipes to point to at the end (optional)
  links: [{ label: "How to trim beans", site: "example.com", url: "https://example.com/" }]
}
```

Ingredient fields:

| Field | Meaning |
|---|---|
| `q` | Amount for one batch: a number, or `[low, high]` for a range. Leave it out for "to taste" lines. |
| `u` | Unit: `tsp`, `tbsp`, `cup`, `quart`, `lb`, `oz`, `g`, `kg`, `stick`, `can`, `packet`, `clove`, `loaf`, `bunch`, `sheet`, `package`. Leave it out for counted items such as apples. |
| `item` | The ingredient. `pl` is its plural, used when the amount is more than 1. |
| `note` | Small print shown after the ingredient. |
| `g` | Grams for one batch. Shown in metric mode in place of cups or spoons; use it for dry goods, cheese and butter. |
| `swaps` | One-for-one alternatives offered in a drop-down, for example `["vegan butter"]`. |
| `ref` | The `id` of another recipe, which adds a link to it. |
| `fixed` | `true` keeps the line from scaling. |
| `base` | `true` hides the note when the recipe is scaled, for notes that quote an amount. |
| `usOnly` | `true` shows the note in US mode only. |

Two more recipe fields: `time` is a line of text under the title, and `veganSwap: true` marks a recipe that becomes vegan once all of its swaps are made.

Write steps and notes in US units with the temperature in both scales, like `350°F (180°C)`. In metric mode the page swaps the order and converts any `lb`, `oz`, `cups` and `inch` measurements it finds in the text.

The prep plan is the `window.PLAN` list at the bottom of `recipes/thanksgiving.js`. Each task can carry an `r` field with a recipe `id` to link to it.

## Things to know

- Scaling changes amounts only. Cooking times, temperatures and pan sizes stay as written for one batch, and the page says so whenever a recipe is scaled.
- Some recipes do not scale in a straight line, rice and seasoning packets most of all. Their notes say where to adjust.
- Metric amounts are rounded to practical numbers, and the gram weights for dry goods are standard kitchen equivalents.
- The turkey calculator assumes 15 minutes per pound at 350°F, 30 minutes of resting and 15 minutes to carve. A meat thermometer has the final say: 165°F (74°C) in the thigh.
