/* Everyday recipes: everything that is not a dessert and not part of Thanksgiving dinner.
 * Field reference: ../recipes.js */

window.RECIPES = (window.RECIPES || []).concat([
  {
    id: "banana-pancakes",
    name: "Daniel’s banana pancakes",
    group: "Breakfast",
    tags: [],
    equipment: ["Blender or masher", "Two mixing bowls", "Frying pan"],
    parts: [
      {
        items: [
          { q: 4, item: "banana", pl: "bananas" },
          { q: 3, item: "egg", pl: "eggs" },
          { q: [1, 2], u: "cup", item: "flour", note: "wheat, whole wheat, soba, etc." },
          { q: 1, u: "cup", item: "milk", swaps: ["soy milk", "almond milk", "coconut milk", "yogurt"] },
          { q: 1.5, u: "tbsp", item: "baking powder" },
          { q: 2, u: "tsp", item: "vanilla extract" },
          { q: 1, u: "tsp", item: "cinnamon" },
          { item: "Salt, a pinch" },
          { item: "Butter or oil, for the pan" },
          { item: "Maple syrup, for serving" }
        ]
      },
      {
        title: "Optional",
        items: [
          { item: "Chia seeds" },
          { item: "Peanut butter" },
          { item: "Berries" },
          { item: "Shredded coconut" }
        ]
      }
    ],
    steps: [
      {
        items: [
          "Blend or mash the bananas.",
          "Mix in the milk, vanilla and cinnamon. If you are adding peanut butter, add it here.",
          "Blend until smooth. A few small banana lumps are fine.",
          "Pour into a mixing bowl and beat in the eggs.",
          "In a separate bowl, mix the flour, baking powder and a pinch of salt.",
          "Add the dry ingredients to the wet and mix only until just combined. Do not overmix: the batter should be slightly lumpy and still a little thin.",
          "Fold in any other optional ingredients.",
          "Melt a bit of butter in a frying pan over medium heat.",
          "Pour in large spoonfuls of batter, sized to the pancakes you want.",
          "Cook until large bubbles form and the underside is firm, then flip.",
          "Cook the other side until the center is no longer raw.",
          "Serve with maple syrup, jelly, butter, or all three."
        ]
      }
    ]
  },

  {
    id: "baked-tofu",
    name: "Daniel’s baked tofu",
    group: "Mains",
    tags: ["vegan"],
    time: "50 to 65 minutes in the oven",
    equipment: ["Large mixing bowl", "Baking sheets"],
    parts: [
      {
        items: [
          { q: 2, u: "package", item: "extra or super firm tofu (14 oz each), or fried tofu" },
          { q: 4, u: "tbsp", item: "olive oil" },
          { q: 2, u: "tbsp", item: "soy sauce" },
          { q: 1, u: "tsp", item: "lemon juice" },
          { q: 1, u: "tbsp", item: "liquid smoke", note: "or a cheap smoky scotch" },
          { q: 2, u: "tbsp", item: "miso paste" },
          { q: 0.5, u: "cup", item: "nutritional yeast, or more" },
          { q: 0.25, u: "cup", item: "scotch, whiskey, tequila, shochu, vodka or similar" },
          { q: 3, u: "tbsp", item: "cumin" },
          { item: "Garlic, to taste" },
          { item: "Black pepper, to taste" }
        ]
      },
      {
        title: "Optional but really good",
        items: [
          { item: "Mayonnaise, yogurt, or both" }
        ]
      },
      {
        title: "Optional",
        items: [
          { item: "Pepper flakes" },
          { item: "Peanut butter" },
          { item: "Sesame oil" },
          { item: "Other spices" }
        ]
      }
    ],
    steps: [
      {
        items: [
          "Mix the olive oil, liquid smoke, lemon juice and miso in a large mixing bowl until the miso is smooth.",
          "Add the soy sauce, nutritional yeast, cumin, garlic and pepper, plus any optional ingredients and spices.",
          "Add the alcohol until the sauce is thick but wet enough to coat the tofu. If it is too dry, or there is too little for the tofu, add more alcohol and a pinch more of the other ingredients. If it is too runny, add a pinch more yeast. It bakes better with less liquid.",
          "Slice the tofu to the size you want. Small cubes are the usual; smaller pieces give crunchier tofu.",
          "Fold the tofu into the sauce until coated. If you have time, let it marinate for a while.",
          "Spread it out on baking sheets, with a little space between the pieces so they crisp up.",
          "Bake at 350°F (180°C) for 30 to 45 minutes.",
          "Check and flip the tofu, then bake another 20 minutes.",
          "It is done when the small chunks and the edges look slightly burned and the smaller pieces are chewy.",
          "Let it sit until slightly cooled. The softer pieces get chewier."
        ]
      }
    ],
    notes: [
      "The amounts are eyeballed, and it is fine to improvise if you are missing something. The tofu, miso, cumin and yeast matter most.",
      "A mix of firm tofu and fried silken tofu comes out more like meat, with chewy bits and soft, crunchy “fat” bits.",
      "A little mayonnaise or yogurt adds fat, which adds a lot of flavor and makes it meatier. With either one it is no longer vegan unless you use a vegan version.",
      "Smaller pieces come out crispier. Larger pieces baked for longer come out meatier and juicier.",
      "Japanese tofu packages are smaller: use 4 instead of 2.",
      "Keeps in the fridge for a few days. It is best the day it is made and the day after; later it goes soggy and loses its crispness."
    ]
  },

  {
    id: "yeast-dressing",
    name: "Daniel’s yeast dressing",
    group: "Sauces, dips and spreads",
    tags: ["vegan"],
    parts: [
      {
        items: [
          { q: 1, u: "tsp", item: "sesame oil" },
          { q: 2, u: "tbsp", item: "olive oil" },
          { q: 1, u: "tsp", item: "apple cider vinegar" },
          { q: 2, u: "tbsp", item: "soy sauce" },
          { q: 2, u: "tbsp", item: "lemon or lime juice" },
          { item: "Nutritional yeast, to consistency" },
          { item: "Sesame seeds, to consistency" }
        ]
      },
      {
        title: "Optional",
        items: [
          { item: "Chia seeds" },
          { item: "Flax seeds" },
          { item: "Garlic powder" },
          { item: "Oregano" },
          { item: "Basil" }
        ]
      }
    ],
    steps: [
      {
        items: [
          "Mix the oils together.",
          "Add the vinegar, soy sauce and juice.",
          "Mix in the sesame seeds.",
          "Mix in the nutritional yeast.",
          "Mix well and adjust. Too runny: add more yeast and seeds. Too thick: add more vinegar, juice or oil, to taste. It should be thick enough to coat a salad but loose enough to mix in."
        ]
      }
    ],
    notes: [
      "Use nutritional yeast, NOT baking yeast.",
      "Goes very well on a kale salad."
    ]
  },

  {
    id: "hummus",
    name: "Hummus",
    group: "Sauces, dips and spreads",
    tags: ["vegan", "gf"],
    equipment: ["Food processor"],
    parts: [
      {
        items: [
          { q: 1, u: "can", item: "chickpeas (15 oz)", pl: "chickpeas (15 oz each)" },
          { q: 2, u: "tbsp", item: "tahini" },
          { q: 0.25, item: "onion", pl: "onions" },
          { q: [2, 3], u: "clove", item: "garlic" },
          { q: 1, u: "tbsp", item: "olive oil" },
          { q: 1, u: "tbsp", item: "lemon or lime juice" },
          { item: "Spices, to taste" }
        ]
      },
      {
        title: "Optional",
        items: [
          { item: "Sundried tomatoes" },
          { item: "Cilantro" },
          { item: "Roasted peppers" },
          { item: "Olives" },
          { item: "Anything else you like" }
        ]
      }
    ],
    steps: [
      {
        items: [
          "Drain the chickpeas and keep the liquid for another recipe.",
          "Put everything in a food processor and blend until smooth."
        ]
      }
    ],
    notes: [
      "The liquid from the can is aquafaba, which is what the vegan chocolate mousse is made from."
    ],
    related: ["chocolate-mousse"]
  },

  {
    id: "peanut-butter",
    name: "Home-made peanut butter",
    group: "Sauces, dips and spreads",
    tags: ["vegan", "gf"],
    time: "About 10 minutes in the food processor",
    equipment: ["Food processor"],
    parts: [
      {
        items: [
          { q: 3, u: "cup", item: "unsalted shelled peanuts", note: "about" }
        ]
      }
    ],
    steps: [
      {
        items: [
          "If the peanuts are unroasted, spread them in a thin layer on a pan and roast at 350°F (180°C) for 15 minutes.",
          "Put the peanuts in a food processor and run it on high until they turn into a thick powder.",
          "Keep going until it turns into peanut butter. This can take a while, around 10 minutes. You may need to stop and let the motor cool, but it will end up smooth and creamy."
        ]
      }
    ],
    notes: [
      "The papery skins can stay on. Taking them off gives a lighter, slightly smoother peanut butter, but they add a lot of vitamins and minerals.",
      "Keeps in the fridge for about a month."
    ],
    related: ["peanut-butter-cookies"]
  }
]);
