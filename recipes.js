/* Daniel's Recipe Book: the data.
 *
 * This file holds the shared setup: the groups, the tags and the field reference.
 * The recipes themselves are in the recipes/ folder, one file per section:
 *   recipes/thanksgiving.js   Thanksgiving dinner and its prep plan
 *   recipes/everyday.js       everything else that is not a dessert
 *   recipes/desserts.js       all desserts, which have their own section on the site
 * To add a section, create a file like those and add a <script> line for it in
 * index.html, after this file and before app.js. Recipes appear within each group
 * in the order the files are loaded.
 *
 * Every recipe is written as ONE home batch. The page scales quantities
 * from there, so amounts are only ever written once.
 *
 * Ingredient fields
 *   q      amount for one batch: a number, or [low, high] for a range.
 *          Leave it out for "to taste" items.
 *   u      unit: tsp, tbsp, cup, quart, lb, oz, g, kg, stick, can, packet,
 *          clove, loaf, bunch, sheet, package. Leave out for counted items.
 *   item   what it is.   pl = plural form, used when the amount is over 1.
 *   note   small print after the item.
 *   base   true = the note quotes an amount, so hide it when the recipe is scaled.
 *   g      grams for one batch, shown instead of cups or spoons in metric mode
 *          (standard kitchen equivalents for dry goods, cheese and butter).
 *   usOnly true = show the note in US mode only.
 *   swaps  alternatives for this line, offered in a drop-down: ["vegan butter"].
 *          The amount stays the same, so list one-for-one swaps only.
 *   fixed  true = do not scale this line.
 *   ref    id of another recipe this line points to.
 *
 * Recipe fields
 *   section  id of the section it belongs to (see window.SECTIONS below); optional.
 *   related  ids of other recipes to point to at the end of this one.
 *   crowd    how many of these batches the big dinner used (from the original book).
 *   links    outside pages, shown as buttons after the method: { label, site, url }.
 *   veganSwap  true = the recipe becomes vegan once every swap line is switched.
 */

window.GROUPS = ["Breakfast", "Mains", "Sides", "Soups", "Sauces, dips and spreads", "Desserts"];

window.TAGS = {
  vegan: "Vegan",
  gf: "Gluten free",
  pork: "Contains pork",
  dairy: "Contains dairy",
  veganopt: "Vegan option"
};

/* Sections get their own page, a button on the home screen and a tab.
 * A recipe joins one with  section: "<id>".  Every recipe is also listed on the home screen. */
window.SECTIONS = [
  { id: "thanksgiving", name: "Thanksgiving dinner", tab: "Thanksgiving", plan: true,
    intro: "each written as one batch for a family table. Open one to scale it up for a crowd." },
  { id: "desserts", name: "Desserts", tab: "Desserts",
    intro: "including the two served at Thanksgiving dinner." }
];

window.RECIPES = [];
