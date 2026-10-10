/* Desserts: their own section on the site, including the two served at Thanksgiving.
 * Field reference: ../recipes.js */

window.RECIPES = (window.RECIPES || []).concat([
  {
    id: "sweet-potatoes",
    name: "Candied sweet potatoes",
    group: "Desserts",
    section: "desserts",
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
    group: "Desserts",
    section: "desserts",
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
  },

  {
    id: "peanut-butter-cookies",
    name: "Gluten free peanut butter cookies",
    group: "Desserts",
    section: "desserts",
    tags: ["gf"],
    time: "8 to 10 minutes in the oven",
    equipment: ["Mixing bowl", "Non-stick cookie sheet", "Fork"],
    parts: [
      {
        items: [
          { q: 1, item: "jar (16 oz) separated, unsweetened peanut butter", pl: "jars (16 oz each) separated, unsweetened peanut butter", note: "or 2 cups home-made peanut butter per jar", ref: "peanut-butter" },
          { g: 400, q: 2, u: "cup", item: "sugar" },
          { q: 2, item: "egg", pl: "eggs" },
          { item: "Chocolate chips, as many as you want", note: "optional" }
        ]
      }
    ],
    steps: [
      {
        items: [
          "Drain the oil off the peanut butter and keep it.",
          "Mix the sugar and peanut butter together.",
          "Mix in the eggs.",
          "If the dough is too dry, add back some of the peanut oil. It should be like a smooth but thick cookie dough.",
          "Fold in the chocolate chips.",
          "Shape into balls on a prepared non-stick cookie sheet.",
          "Press each ball into a disk with a fork, which gives the classic peanut butter cookie hash marks.",
          "Bake at 350°F (180°C) for about 8 to 10 minutes. Check at 8: these burn easily. Take one out, let it cool and try it.",
          "Cool and enjoy."
        ]
      }
    ],
    notes: [
      "Home-made peanut butter has no separated oil to drain, so skip the first step. If the dough is dry, add a little neutral or peanut oil."
    ]
  },

  {
    id: "chocolate-mousse",
    name: "Vegan chocolate mousse",
    group: "Desserts",
    section: "desserts",
    tags: ["vegan", "gf"],
    time: "Overnight in the fridge",
    equipment: ["Double boiler", "Mixing bowl and whisk, or a stand mixer"],
    parts: [
      {
        items: [
          { q: 1, item: "can’s worth of aquafaba (the liquid from a can of chickpeas)", pl: "cans’ worth of aquafaba (the liquid from cans of chickpeas)", ref: "hummus" },
          { g: 100, q: 0.5, u: "cup", item: "sugar" },
          { q: 1, u: "tsp", item: "vanilla extract" },
          { g: 85, q: 0.5, u: "cup", item: "chocolate, chips or a bar chopped small" },
          { q: 2, u: "tsp", item: "soy milk" }
        ]
      }
    ],
    steps: [
      {
        items: [
          "Melt the chocolate in a double boiler, stirring slowly as it melts. Once melted, stir in the soy milk until smooth. Take it off the heat and set aside until cooled.",
          "Put the aquafaba in a mixing bowl or mixer and beat with a whisk or whisk attachment until thick.",
          "Pour in the sugar and vanilla and keep beating until it forms thick peaks. It should be firm; when in doubt, keep going until the peaks are thick and sturdy.",
          "Carefully fold the cooled chocolate into the whipped aquafaba until smooth and completely mixed.",
          "Pour into cups and refrigerate overnight. It sets into mousse."
        ]
      }
    ],
    notes: [
      "Make sure the chocolate has cooled before folding it in. If it is still warm, the mousse turns gritty."
    ]
  }
]);
