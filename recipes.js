/* Thanksgiving recipe book: the data.
 *
 * Every recipe is written as ONE home batch. The page scales quantities
 * from here, so edit amounts in this file only.
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
 *   crowd    how many of these batches the big dinner used (from the original book).
 *   links    outside pages, shown as buttons after the method: { label, site, url }.
 *   veganSwap  true = the recipe becomes vegan once every swap line is switched.
 */

window.GROUPS = ["Mains", "Sides", "Sauces and basics", "Dessert"];

window.TAGS = {
  vegan: "Vegan",
  gf: "Gluten free",
  pork: "Contains pork",
  dairy: "Contains dairy",
  veganopt: "Vegan option"
};

window.RECIPES = [
  {
    id: "turkey",
    name: "Roast turkey",
    group: "Mains",
    tags: [],
    makes: { n: [8, 10], what: "servings" },
    time: "About 15 minutes per pound, plus 30 minutes resting",
    equipment: ["Roasting pan with rack", "Ladle or baster", "Aluminum foil", "Meat thermometer"],
    parts: [
      {
        items: [
          { q: 1, item: "turkey, 12 to 14 lb, fully thawed", pl: "turkeys, 12 to 14 lb each, fully thawed" },
          { item: "Herb and garlic butter, for rubbing", ref: "herb-butter" },
          { item: "Turkey basting mix", ref: "basting-mix" },
          { item: "Apple stuffing, for the cavity", ref: "stuffing" }
        ]
      },
      {
        title: "Vegetables for the pan",
        items: [
          { item: "Potatoes or sweet potatoes, rough chopped" },
          { item: "Carrots" },
          { item: "Onions" },
          { item: "Whole peeled garlic cloves" },
          { item: "Optional: leek, cabbage or squash" }
        ]
      }
    ],
    steps: [
      {
        items: [
          "Heat the oven to 350°F (180°C).",
          "Remove the neck and giblets from the bird and put them in the bottom of the roasting pan.",
          "Rub the herb and garlic butter onto and under the skin until the whole outside is covered.",
          "Fill the cavity with finished stuffing.",
          "Set the turkey in the pan and surround it with the washed, rough-chopped vegetables and whole garlic cloves.",
          "Roast until the thickest part of the thigh reads 165°F (74°C), basting once or twice an hour.",
          "When the skin turns golden brown, tent the bird with foil.",
          "Take it out, keep it covered in foil, and rest 20 to 30 minutes before carving."
        ]
      }
    ],
    notes: [
      "Use enough vegetables to surround the bird in one layer.",
      "A 12 lb turkey takes about 3 hours. A 22 lb turkey takes about 5½ hours and can rest the full 30 minutes.",
      "The oven is free once the turkey is resting: that is when the vegan roast, the mac and cheese and the pan of stuffing go in.",
      "Stuffing cooked inside the bird should also reach 165°F (74°C) in the center before serving."
    ],
    links: [
      { label: "How to carve the turkey", site: "delish.com", url: "https://www.delish.com/holiday-recipes/thanksgiving/g743/how-to-carve-turkey/" }
    ]
  },

  {
    id: "vegan-roast",
    name: "Vegan “turkey” roast",
    group: "Mains",
    tags: ["vegan"],
    makes: { n: [1, 1], what: "large loaf, 8 to 10 servings", pl: "large loaves, 8 to 10 servings each" },
    crowd: 2,
    time: "1 hour steaming, overnight chill, 40 minutes baking",
    equipment: ["Food processor", "Steamer", "Aluminum foil", "Shallow pan for soaking rice paper"],
    parts: [
      {
        title: "For the roast",
        items: [
          { q: 2, u: "package", item: "silken tofu", note: "about 700 g", base: true },
          { q: 2, u: "tbsp", item: "white miso paste" },
          { g: 370, q: 3, u: "cup", item: "vital wheat gluten", note: "360 to 380 g", base: true, usOnly: true },
          { q: 6, u: "tbsp", item: "nutritional yeast" },
          { q: 2, u: "tsp", item: "sea salt" },
          { q: 2, u: "tsp", item: "rice, apple cider or white wine vinegar" },
          { q: 2, u: "tsp", item: "garlic powder" },
          { q: 4, u: "tsp", item: "onion powder" },
          { q: 0.5, u: "tsp", item: "sage" },
          { q: 1, u: "tsp", item: "thyme" },
          { q: 3, u: "tsp", item: "vegetable broth powder" }
        ]
      },
      {
        title: "For the skin",
        items: [
          { q: [3, 4], u: "sheet", item: "rice paper" },
          { item: "Herb and garlic butter, made with vegan butter", ref: "herb-butter" }
        ]
      }
    ],
    steps: [
      {
        title: "One or two days ahead",
        items: [
          "Blend the tofu, nutritional yeast, vinegar, miso, onion powder, broth powder, salt and all the spices in a food processor until smooth.",
          "Add the vital wheat gluten and blend until it comes together in a ball. If it is dry and stiff, add water a tablespoon at a time. If it won't form a ball, bring it together by hand, but do not knead it.",
          "Put the dough on a sheet of foil and pat it into a loaf. Wrap it securely but not tightly, in a double layer of foil so it doesn't split.",
          "Steam for 1 hour, until the inside reaches 160°F (71°C). The loaf expands and goes tight in the foil.",
          "Refrigerate overnight, still wrapped."
        ]
      },
      {
        title: "On the day",
        items: [
          "Heat the oven to 400°F (200°C). Unwrap the cold loaf and rub it all over with vegan herb and garlic butter.",
          "Soak each rice paper sheet in a shallow pan of water for about 30 seconds, until soft. Drape the sheets over the loaf and tuck the ends underneath. Bubbles and wrinkles are fine; they turn into the crispiest bits.",
          "Bake for 15 minutes.",
          "Rub with herb butter again, getting some over and under the rice paper. Bake another 15 to 20 minutes, until golden brown with crisp skin.",
          "Rest 10 minutes before slicing."
        ]
      }
    ],
    notes: [
      "Wrap the roast in its skin while the turkey finishes, and put it in the oven as soon as the turkey comes out to rest."
    ]
  },

  {
    id: "mashed-potatoes",
    name: "Garlic mashed potatoes",
    group: "Sides",
    tags: ["gf"],
    veganSwap: true,
    makes: { n: [12, 14], what: "servings" },
    crowd: 6,
    equipment: ["Large pot", "Potato masher"],
    parts: [
      {
        items: [
          { q: 3, u: "kg", item: "potatoes" },
          { q: 2, u: "stick", item: "butter", swaps: ["vegan butter"] },
          { q: 2, u: "clove", item: "garlic, minced", note: "or 2 tbsp garlic powder; optional", base: true },
          { q: 1, u: "quart", item: "milk", swaps: ["unsweetened oat milk", "unsweetened soy milk"], note: "you may not need it all" },
          { q: 4, u: "tbsp", item: "herbs" },
          { item: "Salt, to taste" },
          { item: "Black pepper, to taste" }
        ]
      }
    ],
    steps: [
      {
        title: "The day before, if you like",
        items: [
          "Wash the potatoes and peel them if you want to.",
          "Cut into even 1½ to 2 inch chunks.",
          "Put them straight into a clean container and cover completely with cold water.",
          "Cover and refrigerate overnight. Do not leave cut potatoes out at room temperature."
        ]
      },
      {
        title: "Cooking",
        items: [
          "Drain the potatoes and throw away the soaking water.",
          "Put them in a large pot, cover with fresh water and salt the water.",
          "Boil until completely tender and easy to pierce with a fork.",
          "Drain thoroughly.",
          "Mash with a masher, spoon or fork.",
          "Work in the butter, garlic and herbs, then add the milk gradually until the texture is where you want it.",
          "Season with salt and pepper.",
          "Stop mixing as soon as they are smooth."
        ]
      }
    ],
    notes: [
      "Keep a little hot milk and melted butter nearby while serving. If the potatoes tighten up as they sit, loosen them with warm liquid instead of letting them dry out."
    ]
  },

  {
    id: "stuffing",
    name: "Apple stuffing",
    group: "Sides",
    tags: ["vegan"],
    makes: { n: [12, 16], what: "servings" },
    crowd: 5,
    equipment: ["Large skillet", "Large heatproof mixing bowl", "Greased baking dish"],
    parts: [
      {
        items: [
          { q: 2, u: "loaf", item: "bread, cubed", note: "or the same amount of stuffing mix" },
          { q: 6, item: "apple", pl: "apples" },
          { q: 5, u: "cup", item: "vegetable stock" },
          { q: 1, u: "cup", item: "apple cider" },
          { q: 1, u: "bunch", item: "celery" },
          { q: 3, item: "onion", pl: "onions" },
          { q: 2, item: "carrot", pl: "carrots" },
          { g: 170, q: 12, u: "tbsp", item: "vegan butter", note: "1½ sticks", base: true },
          { q: 0.25, u: "cup", item: "minced garlic" },
          { item: "Herbs, or Italian seasoning" }
        ]
      }
    ],
    steps: [
      {
        items: [
          "Cube the bread and chop the apples into a large heatproof bowl.",
          "Chop the celery, onions and carrots.",
          "Melt the butter in a large skillet over medium-high heat. Add the onion, celery, carrots and garlic and cook until tender.",
          "Add the stock, cider and herbs and bring to a boil.",
          "Pour the hot mixture over the bread and apples and mix well.",
          "Stuff the turkey with as much as it needs. Spread the rest in a greased baking dish.",
          "Bake the dish at 350°F (180°C) until the top is golden brown."
        ]
      }
    ],
    notes: [
      "The pan of stuffing goes in the oven as soon as the turkey comes out.",
      "Only the stuffing baked in its own dish is vegan. Anything cooked inside the turkey is not.",
      "If you are using fresh bread, cube it a day or two ahead and let it dry out.",
      "A full batch is two loaves of bread. Half a batch fills a 9×13 inch dish."
    ]
  },

  {
    id: "green-beans",
    name: "Garlic green beans",
    group: "Sides",
    tags: ["vegan", "gf"],
    makes: { n: [8, 8], what: "servings" },
    crowd: 10,
    equipment: ["Large pan or wok", "Mixing bowl"],
    parts: [
      {
        items: [
          { q: 2, u: "lb", item: "fresh green beans, washed and trimmed" },
          { q: 6, u: "clove", item: "garlic, minced" },
          { q: 3, u: "tbsp", item: "olive oil" },
          { item: "Salt and pepper" }
        ]
      }
    ],
    steps: [
      {
        items: [
          "Toss the beans in a bowl with about two thirds of the olive oil, salt and pepper.",
          "Heat the rest of the oil in a large pan and cook the garlic for one to two minutes.",
          "Add the beans and cook over medium heat, stirring constantly, until slightly soft."
        ]
      }
    ],
    notes: [
      "Wash and trim the beans the day before, but cook them shortly before serving. They are much better fresh.",
      "Cook in batches no bigger than your pan can hold in a shallow layer; a crowded pan steams instead of sautéing."
    ]
  },

  {
    id: "mac-and-cheese",
    name: "Baked mac and cheese",
    group: "Sides",
    tags: ["dairy"],
    makes: { n: [10, 12], what: "servings" },
    crowd: 4,
    time: "About 30 minutes in the oven",
    equipment: ["Large saucepan", "Whisk", "Deep 9×13 inch baking dish"],
    parts: [
      {
        items: [
          { q: 1, u: "lb", item: "dried elbow pasta" },
          { g: 115, q: 0.5, u: "cup", item: "unsalted butter" },
          { g: 60, q: 0.5, u: "cup", item: "all-purpose flour" },
          { q: 1.5, u: "cup", item: "whole milk" },
          { q: 2.5, u: "cup", item: "half and half" },
          { g: 450, q: 4, u: "cup", item: "sharp cheddar, shredded" },
          { g: 115, q: 1, u: "cup", item: "Gouda, shredded" },
          { g: 115, q: 1, u: "cup", item: "Swiss, shredded" },
          { q: 0.5, u: "tbsp", item: "salt" },
          { q: 0.5, u: "tsp", item: "black pepper" },
          { q: 0.25, u: "tsp", item: "smoked paprika" },
          { q: 1, u: "tbsp", item: "ground mustard" },
          { item: "Olive oil, for the cooked pasta" }
        ]
      },
      {
        title: "Topping",
        items: [
          { g: 90, q: 1.5, u: "cup", item: "panko crumbs" },
          { q: 4, u: "tsp", item: "butter, melted" },
          { g: 45, q: 0.5, u: "cup", item: "Parmesan, shredded" },
          { q: 1, item: "handful of the cheese mix", pl: "handfuls of the cheese mix" }
        ]
      }
    ],
    steps: [
      {
        items: [
          "Mix the cheddar, Gouda and Swiss together and set aside. Mix the topping ingredients in a separate bowl.",
          "Grease the baking dish.",
          "Cook the pasta until al dente: not quite soft but not crunchy. Drain, coat in a little olive oil so it doesn't stick, and set aside.",
          "Melt the butter in a large saucepan.",
          "Whisk in the flour over medium heat until golden brown.",
          "Gradually whisk in the milk and half and half until thick and smooth. Keep going until you see bubbles on top, then whisk two minutes more. Whisk in the salt, pepper, paprika and mustard. Turn off the heat.",
          "While the sauce is still warm, whisk in a third of the cheese mix until smooth, then another third. Whisk until smooth, thick and creamy.",
          "Stir in the cooked, cooled pasta until fully coated.",
          "Put half the pasta in the dish. Cover with the remaining cheese mix, holding back a handful for the topping. Pour the rest of the pasta over it and finish with the topping.",
          "Bake at 350°F (180°C) for about 30 minutes, until the cheese is melted and the topping is golden brown."
        ]
      }
    ],
    notes: [
      "Assemble it the day before, cover and refrigerate. Bake it when the turkey comes out of the oven."
    ]
  },

  {
    id: "arroz-con-gandules",
    name: "Arroz con gandules",
    group: "Sides",
    tags: ["vegan"],
    makes: { n: [8, 10], what: "servings" },
    crowd: 20,
    time: "About 40 minutes",
    equipment: ["Heavy pot or caldero with a tight lid"],
    parts: [
      {
        items: [
          { g: 400, q: 2, u: "cup", item: "dry medium-grain white rice" },
          { q: 1, u: "can", item: "gandules (15 oz), drained", pl: "gandules (15 oz each), drained" },
          { q: 0.25, u: "cup", item: "sofrito" },
          { q: 0.25, u: "cup", item: "tomato sauce" },
          { q: 1, u: "packet", item: "sazón with achiote" },
          { q: 0.5, u: "tsp", item: "adobo" },
          { q: 0.25, u: "tsp", item: "dried oregano" },
          { q: 2, u: "tbsp", item: "green olives, sliced" },
          { q: 1.5, u: "tsp", item: "capers", note: "optional" },
          { q: 1, u: "tbsp", item: "olive oil" },
          { q: 2.5, u: "cup", item: "vegetable broth", note: "starting point; see notes" },
          { item: "Salt and pepper, as needed" }
        ]
      }
    ],
    steps: [
      {
        items: [
          "Heat the olive oil in a heavy pot.",
          "Add the sofrito and sauté 3 to 4 minutes.",
          "Add the tomato sauce, sazón, adobo, oregano, olives and capers. Cook another 2 minutes.",
          "Add the gandules and broth and bring to a boil.",
          "Taste the broth now and adjust the seasoning before the rice goes in.",
          "Add the rice and stir thoroughly.",
          "Cook uncovered until most of the liquid is absorbed and small holes appear across the surface.",
          "Stir once from the bottom, cover tightly, turn the heat to low and cook 20 to 25 minutes.",
          "Check and fluff. Cook another 5 to 10 minutes if it needs it."
        ]
      }
    ],
    notes: [
      "Rice does not scale in a straight line. The crowd-size batch was 10 cups of rice to 11 or 12 cups of broth and 3 cans of gandules. When you multiply this recipe, start with a little less broth than the page shows and add more only if the rice needs it.",
      "To make ahead: cool it quickly and refrigerate. To reheat, sprinkle a little broth over the rice and keep it tightly covered so the steam brings the moisture back."
    ]
  },

  {
    id: "habichuelas",
    name: "Habichuelas guisadas with ham",
    group: "Sides",
    tags: ["pork"],
    makes: { n: [6, 8], what: "servings" },
    crowd: 24,
    time: "Overnight soak, then about 2 hours",
    equipment: ["Large pot", "Heavy-bottomed pot"],
    parts: [
      {
        title: "Beans",
        items: [
          { q: 0.5, u: "lb", item: "dried pink beans (habichuelas rosadas)", note: "about 1¼ cups", base: true },
          { item: "Water for soaking" },
          { item: "Fresh water for cooking" }
        ]
      },
      {
        title: "Stewed bean base",
        items: [
          { q: 6, u: "oz", item: "smoked ham, in small cubes" },
          { q: 0.3333, u: "cup", item: "sofrito" },
          { q: 0.6667, u: "cup", item: "tomato sauce" },
          { q: 1, u: "packet", item: "sazón with achiote" },
          { q: 0.5, u: "tsp", item: "adobo seasoning" },
          { q: 0.25, u: "tsp", item: "dried oregano", note: "a generous ¼", base: true },
          { q: 1, item: "medium potato, peeled, in ½ inch cubes", pl: "medium potatoes, peeled, in ½ inch cubes" },
          { q: 3, u: "tbsp", item: "green olives, sliced or roughly chopped" },
          { q: [1.5, 2], u: "cup", item: "reserved bean cooking liquid", note: "as needed" },
          { item: "Olive oil, if the ham is lean" },
          { item: "Black pepper, to taste" },
          { item: "More adobo or salt, only after tasting" }
        ]
      }
    ],
    steps: [
      {
        title: "The night before: soak",
        items: [
          "Spread the dried beans out and pick out any stones or damaged beans. Rinse under cold running water.",
          "Put them in a large container and cover with at least 3 inches of cold water. They swell a lot, so leave room.",
          "Cover and refrigerate overnight, 8 to 12 hours."
        ]
      },
      {
        title: "Cook the beans",
        items: [
          "Drain the soaking water and rinse the beans.",
          "Put them in a large pot and cover with fresh water by about 2 inches.",
          "Bring to a boil, then lower to a steady simmer.",
          "Cook until tender but still holding their shape, usually 60 to 90 minutes. Start checking early; older beans take longer. Stir now and then and top up with hot water to keep them covered.",
          "Drain, keeping the cooking liquid. You need at least the amount listed above."
        ]
      },
      {
        title: "Make the habichuelas",
        items: [
          "Heat a heavy-bottomed pot over medium heat. Add the ham and cook until it starts to brown and render some fat. Add a little olive oil if the ham is lean.",
          "Add the sofrito and sauté with the ham for 3 to 5 minutes.",
          "Add the tomato sauce, sazón, adobo, oregano and olives. Cook 2 to 3 minutes, stirring often.",
          "Add the cooked beans, the diced potato and the smaller amount of bean liquid.",
          "Stir gently and bring to a simmer.",
          "Simmer 30 to 45 minutes, stirring from time to time so the bottom doesn't scorch. Add more bean liquid as it needs it."
        ]
      },
      {
        title: "Finish",
        items: [
          "Check the consistency. These should be saucy: thick enough to coat the beans, loose enough to ladle over the rice. Too thick, add bean liquid. Too thin once the potatoes are cooked, simmer uncovered.",
          "Season last. The ham, sazón, adobo and olives are all salty. Taste, add black pepper, and add more adobo or salt only if it needs it."
        ]
      }
    ],
    notes: [
      "The beans cook further in the stew, so don't let them fall apart in the first cooking.",
      "A small pot can be ready in closer to 30 minutes than 45. Go by the potatoes: when they are tender, it is done.",
      "These hold well. Make them the day before, refrigerate, and reheat gently, stirring so they heat evenly. Loosen with a little bean liquid, water or broth if they thickened overnight."
    ]
  },

  {
    id: "gravy",
    name: "Vegan gravy",
    group: "Sauces and basics",
    tags: ["vegan", "gf"],
    makes: { n: [4, 4], what: "cups" },
    crowd: 2,
    time: "About 1 hour, mostly roasting",
    equipment: ["Roasting tray", "Blender or food processor", "Large pot"],
    parts: [
      {
        items: [
          { q: 2, item: "medium potato, in chunks", pl: "medium potatoes, in chunks" },
          { q: 2, item: "carrot, in chunks", pl: "carrots, in chunks" },
          { q: 1, item: "onion, quartered", pl: "onions, quartered" },
          { q: 4, u: "clove", item: "garlic, minced" },
          { q: 2, u: "tbsp", item: "olive oil" },
          { q: [3, 4], u: "cup", item: "vegan, gluten-free vegetable or mushroom stock" },
          { q: [1, 2], u: "tbsp", item: "cornstarch", note: "only if needed" }
        ]
      }
    ],
    steps: [
      {
        items: [
          "Heat the oven to 400°F (200°C). Toss the potatoes, carrots and onion with half the olive oil and roast on their own tray for 30 to 40 minutes, until soft and browned.",
          "Blend the roasted vegetables until smooth, adding stock if it needs liquid.",
          "Heat the rest of the oil and the garlic in a large pot.",
          "Add the blended vegetables, then stock a little at a time, and cook until thick.",
          "If the gravy is too thin, mix the cornstarch into a little warm water and whisk it in."
        ]
      }
    ],
    notes: [
      "Roast these vegetables on their own tray. The ones under the turkey sit in turkey drippings, so they would make the gravy not vegan."
    ]
  },

  {
    id: "cranberry-sauce",
    name: "Cranberry sauce",
    group: "Sauces and basics",
    tags: ["vegan", "gf"],
    makes: { n: [16, 20], what: "servings" },
    crowd: 6,
    equipment: ["Saucepan"],
    parts: [
      {
        items: [
          { q: 2, u: "lb", item: "cranberries" },
          { q: 0.25, u: "cup", item: "orange or pineapple juice" },
          { g: 150, q: 0.75, u: "cup", item: "sugar" },
          { q: 0.75, u: "cup", item: "water" },
          { q: 1, u: "tsp", item: "orange zest" },
          { q: 0.5, u: "tsp", item: "vanilla extract" }
        ]
      }
    ],
    steps: [
      {
        items: [
          "Put the cranberries, juice, sugar and water in a saucepan.",
          "Bring to a boil, then lower to medium.",
          "Simmer until the cranberries start popping and breaking down.",
          "Keep simmering, stirring often, until it is as smooth as you like. Smash the berries with a spoon or spatula for a smoother sauce. Stir in the zest and vanilla.",
          "It thickens as it cooks and again as it cools."
        ]
      }
    ],
    notes: [
      "Make it two days ahead. It needs nothing on the day except a serving bowl.",
      "This is a tart sauce. Taste near the end and add more sugar if you want it sweeter.",
      "Half a batch (1 lb of cranberries) is plenty for 8 to 10 people."
    ]
  },

  {
    id: "herb-butter",
    name: "Herb and garlic butter",
    group: "Sauces and basics",
    tags: ["gf"],
    veganSwap: true,
    makes: { n: [1.25, 1.25], what: "cups" },
    equipment: ["Small pan"],
    parts: [
      {
        items: [
          { q: 2, u: "stick", item: "butter", swaps: ["vegan butter"] },
          { q: 0.25, u: "cup", item: "olive oil" },
          { q: 6, u: "clove", item: "garlic, minced" },
          { q: 0.5, u: "tsp", item: "sea salt" },
          { q: 0.5, u: "tbsp", item: "thyme" },
          { q: 0.5, u: "tbsp", item: "rosemary" },
          { q: 1, u: "tsp", item: "sage" },
          { q: 0.5, u: "tsp", item: "onion powder" },
          { q: 1.5, u: "tsp", item: "black pepper" }
        ]
      }
    ],
    steps: [
      {
        items: [
          "Put everything in a small pan and heat until the butter is melted and blended with the oil."
        ]
      }
    ],
    notes: [
      "Make it up to two days early and refrigerate. Rewarm it gently so it stays melted while you work.",
      "Switch to vegan butter if any of it is going on the vegan roast, or make a separate vegan batch.",
      "One batch makes about 1¼ cups. The basting mix alone uses 1 cup, and the turkey and the vegan roast both need a rub, so plan on two batches for a full dinner."
    ]
  },

  {
    id: "basting-mix",
    name: "Turkey basting mix",
    group: "Sauces and basics",
    tags: ["gf"],
    makes: { n: [1, 1], what: "turkey", pl: "turkeys" },
    equipment: ["Small pan"],
    parts: [
      {
        items: [
          { q: 1, u: "cup", item: "apple cider" },
          { q: 0.25, u: "cup", item: "dark molasses" },
          { q: 1, u: "cup", item: "herb and garlic butter", ref: "herb-butter" }
        ]
      }
    ],
    steps: [
      {
        items: [
          "Heat everything together in a pan and stir until blended."
        ]
      }
    ],
    notes: [
      "Measure the cider and molasses the day before, but combine and heat it on the day."
    ]
  },

  {
    id: "sweet-potatoes",
    name: "Candied sweet potatoes",
    group: "Dessert",
    tags: ["vegan", "gf"],
    makes: { n: [8, 10], what: "servings" },
    crowd: 14,
    time: "About 1 hour in the oven",
    equipment: ["Saucepan", "9×13 inch baking dish", "Aluminum foil"],
    parts: [
      {
        items: [
          { q: 2.5, u: "lb", item: "sweet potatoes" },
          { g: 85, q: 6, u: "tbsp", item: "vegan butter, melted" },
          { g: 110, q: 0.5, u: "cup", item: "dark brown sugar, packed" },
          { q: 0.25, u: "cup", item: "maple syrup" },
          { q: 0.25, u: "cup", item: "orange juice" },
          { q: 0.5, u: "tsp", item: "ground cinnamon" },
          { q: 0.25, u: "tsp", item: "ground nutmeg" },
          { q: 0.5, u: "tsp", item: "vanilla extract" },
          { q: 0.25, u: "tsp", item: "salt" }
        ]
      },
      {
        title: "Optional",
        items: [
          { q: 0.125, u: "tsp", item: "ground ginger" },
          { q: 0.125, u: "tsp", item: "allspice" }
        ]
      }
    ],
    steps: [
      {
        title: "Prepare",
        items: [
          "Wash and peel the sweet potatoes.",
          "Cut into ¾ to 1 inch thick rounds or large chunks. Keep them about the same size so they cook evenly.",
          "Lightly grease the baking dish with vegan butter or cooking spray and spread the sweet potatoes in it."
        ]
      },
      {
        title: "Make the sauce",
        items: [
          "Melt the vegan butter in a saucepan.",
          "Add the brown sugar, maple syrup, orange juice, cinnamon, nutmeg, vanilla and salt.",
          "Heat over medium, stirring, until the sugar dissolves. It does not need to become a thick syrup; it reduces in the oven."
        ]
      },
      {
        title: "Bake",
        items: [
          "Pour the warm sauce over the sweet potatoes and toss gently to coat.",
          "Cover the dish tightly with foil.",
          "Bake at 350°F (180°C) for about 40 minutes, until a fork goes in with a little resistance.",
          "Take off the foil and gently turn the potatoes so the sauce is redistributed.",
          "Bake uncovered another 20 to 30 minutes, until tender and the sauce has reduced. They should be fully tender but still hold their shape."
        ]
      }
    ],
    notes: [
      "No marshmallows: they make it much sweeter, and most contain gelatin, so the dish would no longer be vegan.",
      "Fine to make the day before. Reheat covered, then uncover near the end if the sauce needs to reduce. Add a splash of orange juice if it gets too thick."
    ]
  },

  {
    id: "pumpkin-pie",
    name: "Vegan pumpkin pie",
    group: "Dessert",
    tags: ["vegan"],
    makes: { n: [1, 1], what: "pie, 8 slices", pl: "pies, 8 slices each" },
    crowd: 12,
    time: "60 minutes baking, then chilling",
    equipment: ["Food processor or mixer"],
    parts: [
      {
        items: [
          { q: 1, u: "can", item: "pumpkin puree (15 oz)", pl: "pumpkin puree (15 oz each)" },
          { q: 0.75, u: "cup", item: "vegan heavy cream" },
          { g: 30, q: 0.25, u: "cup", item: "cornstarch" },
          { g: 110, q: 0.5, u: "cup", item: "brown sugar" },
          { q: 0.25, u: "cup", item: "maple syrup" },
          { q: 1, u: "tsp", item: "vanilla extract" },
          { q: 2, u: "tsp", item: "pumpkin pie spice" },
          { q: 0.5, u: "tsp", item: "ground cinnamon" },
          { q: 0.5, u: "tsp", item: "salt" },
          { q: 1, item: "vegan pie crust", pl: "vegan pie crusts" }
        ]
      }
    ],
    steps: [
      {
        items: [
          "Blend the pumpkin, cream, sugar, cornstarch, maple syrup, vanilla, spices and salt in a food processor or mixer until well mixed.",
          "Pour into the pie crust and smooth the top.",
          "Bake for 60 minutes at 350°F (180°C).",
          "Cool, then chill until set."
        ]
      }
    ],
    notes: [
      "Bake it the day before so it has time to chill and set."
    ]
  }
];

/* The prep plan, rewritten from the book's Monday / Tuesday / Wednesday
 * schedule for one home dinner. `r` links a task to a recipe. */
window.PLAN = [
  {
    id: "d2",
    when: "Two days before",
    aim: "Anything that improves with sitting or needs an overnight step.",
    tasks: [
      { t: "Check every ingredient against the recipes, and confirm the vegan ingredients really are vegan." },
      { t: "Check the turkey is thawing. In the fridge it needs about a day for every 4 to 5 lb.", r: "turkey" },
      { t: "Make the cranberry sauce. Done until dinner.", r: "cranberry-sauce" },
      { t: "Make the herb and garlic butter.", r: "herb-butter" },
      { t: "Make and steam the vegan roast. Chill it wrapped. No rice paper yet.", r: "vegan-roast" },
      { t: "Cube the bread for the stuffing and leave it to dry.", r: "stuffing" },
      { t: "Sort, rinse and soak the pink beans overnight in the fridge.", r: "habichuelas" },
      { t: "Measure out the dry spices for each recipe and label them." }
    ]
  },
  {
    id: "d1",
    when: "The day before",
    aim: "Finish everything that doesn't need to be made fresh.",
    tasks: [
      { t: "Cook the beans and finish the habichuelas. Cool and refrigerate.", r: "habichuelas" },
      { t: "Bake the candied sweet potatoes. Cool and refrigerate.", r: "sweet-potatoes" },
      { t: "Bake the pumpkin pie. Cool completely, cover and refrigerate.", r: "pumpkin-pie" },
      { t: "Assemble the mac and cheese with its topping. Cover and refrigerate.", r: "mac-and-cheese" },
      { t: "Peel and cut the potatoes for mashing. Keep them under cold water in the fridge. Do not cook them yet.", r: "mashed-potatoes" },
      { t: "Wash and trim the green beans and mince their garlic. Do not cook them yet.", r: "green-beans" },
      { t: "Chop the celery and onions, and measure the stock, cider and butter for the stuffing. Leave the apples whole.", r: "stuffing" },
      { t: "Measure the arroz con gandules ingredients into one kit.", r: "arroz-con-gandules" },
      { t: "Confirm the turkey is fully thawed and work out when it goes in the oven.", r: "turkey" },
      { t: "Wash and chop the vegetables for the turkey pan.", r: "turkey" },
      { t: "Measure the cider and molasses for the basting mix.", r: "basting-mix" },
      { t: "Set out the stock, garlic, oil and cornstarch for the gravy.", r: "gravy" }
    ]
  },
  {
    id: "d0",
    when: "Thanksgiving day",
    aim: "Cook, bake, reheat and serve.",
    tasks: [
      { t: "Chop the apples and make the stuffing.", r: "stuffing" },
      { t: "Heat the basting mix.", r: "basting-mix" },
      { t: "Butter, stuff and roast the turkey. Baste once or twice an hour.", r: "turkey" },
      { t: "Roast a separate tray of vegetables for the vegan gravy.", r: "gravy" },
      { t: "Wrap the vegan roast in its rice paper skin while the turkey finishes.", r: "vegan-roast" },
      { t: "Boil and mash the potatoes.", r: "mashed-potatoes" },
      { t: "Cook the arroz con gandules.", r: "arroz-con-gandules" },
      { t: "Turkey out to rest. Straight into the oven: vegan roast, mac and cheese, and the pan of stuffing.", r: "turkey" },
      { t: "Blend and finish the gravy.", r: "gravy" },
      { t: "Reheat the habichuelas and the candied sweet potatoes.", r: "habichuelas" },
      { t: "Cook the green beans last.", r: "green-beans" },
      { t: "Warm the rolls. Set out cranberry sauce, pie and whipped cream." }
    ]
  }
];
