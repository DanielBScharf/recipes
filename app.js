/* Thanksgiving recipe book: the page logic.
 * Plain script, no build step. Open index.html directly or host the folder anywhere. */
(function () {
  "use strict";

  var RECIPES = window.RECIPES || [];
  var GROUPS = window.GROUPS || [];
  var TAGS = window.TAGS || {};
  var PLAN = window.PLAN || [];
  var app = document.getElementById("app");

  var byId = {};
  RECIPES.forEach(function (r) { byId[r.id] = r; });

  /* ---------- small helpers ---------- */

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function load(key, fallback) {
    try {
      var v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* private mode: keep going */ }
  }

  /* ---------- amounts ---------- */

  var FRACTIONS = [
    [0, ""], [1 / 8, "⅛"], [1 / 4, "¼"], [1 / 3, "⅓"], [3 / 8, "⅜"], [1 / 2, "½"],
    [5 / 8, "⅝"], [2 / 3, "⅔"], [3 / 4, "¾"], [7 / 8, "⅞"], [1, ""]
  ];

  function fmtNumber(n) {
    if (n >= 20) return String(Math.round(n));
    var whole = Math.floor(n + 1e-9);
    var rest = n - whole;
    var best = FRACTIONS[0], gap = Infinity;
    FRACTIONS.forEach(function (f) {
      var d = Math.abs(rest - f[0]);
      if (d < gap) { gap = d; best = f; }
    });
    if (gap > 0.045) return String(Math.round(n * 10) / 10);
    if (best[0] === 1) return String(whole + 1);
    if (!best[1]) return String(whole);
    return (whole ? whole : "") + best[1];
  }

  var UNITS = {
    tsp: ["tsp", "tsp"], tbsp: ["tbsp", "tbsp"], cup: ["cup", "cups"], quart: ["quart", "quarts"],
    lb: ["lb", "lb"], oz: ["oz", "oz"], g: ["g", "g"], kg: ["kg", "kg"],
    stick: ["stick", "sticks"], can: ["can", "cans"], packet: ["packet", "packets"],
    clove: ["clove", "cloves"], loaf: ["loaf", "loaves"], bunch: ["bunch", "bunches"],
    sheet: ["sheet", "sheets"], "package": ["package", "packages"]
  };
  var IN_TSP = { tsp: 1, tbsp: 3, cup: 48 };

  function isNice(x, denominators) {
    return denominators.some(function (d) { return Math.abs(x * d - Math.round(x * d)) < 0.02; });
  }

  /* Pick the spoon or cup a cook would actually reach for. */
  function pickVolumeUnit(tsp) {
    var cups = tsp / 48, tbsp = tsp / 3;
    if (cups >= 0.25 && isNice(cups, [4, 3])) return "cup";
    if (tbsp > 8 && isNice(cups, [8])) return "cup";
    if (tbsp >= 1 && isNice(tbsp, [2])) return "tbsp";
    if (tsp < 3) return "tsp";
    if (cups >= 1) return "cup";
    return "tbsp";
  }

  /* Returns { amount: "1½ cups", many: true } or null when the line has no amount. */
  function amountFor(item, k) {
    if (item.q == null) return null;
    var range = Array.isArray(item.q) ? item.q.slice() : [item.q];
    var unit = item.u || "";
    var factor = item.fixed ? 1 : k;
    range = range.map(function (v) { return v * factor; });

    if (factor !== 1 && IN_TSP[unit]) {
      var tsp = range.map(function (v) { return v * IN_TSP[unit]; });
      unit = pickVolumeUnit(tsp[0]);
      range = tsp.map(function (v) { return v / IN_TSP[unit]; });
    }
    if (unit === "oz" && range[0] >= 16 && isNice(range[0] / 16, [4])) { unit = "lb"; range = range.map(function (v) { return v / 16; }); }
    if (unit === "quart" && range[0] < 1) { unit = "cup"; range = range.map(function (v) { return v * 4; }); }

    var many = range[range.length - 1] > 1.001;
    if (units === "metric" && item.g) {
      return { amount: fmtGrams(item.g * factor, null), many: many };
    }
    if (units === "metric" && TO_G[unit]) {
      return { amount: fmtGrams(range[0] * TO_G[unit], range.length > 1 ? range[1] * TO_G[unit] : null), many: many };
    }
    if (units === "metric" && TO_ML[unit]) {
      return { amount: fmtMl(range[0] * TO_ML[unit], range.length > 1 ? range[1] * TO_ML[unit] : null), many: many };
    }
    if (units === "us" && (unit === "kg" || unit === "g")) {
      var perLb = unit === "kg" ? 2.2046 : 0.0022046;
      range = range.map(function (v) { return v * perLb; });
      if (range[0] >= 1) { unit = "lb"; range = range.map(function (v) { return roundTo(v, 0.5); }); }
      else { unit = "oz"; range = range.map(function (v) { return Math.round(v * 16); }); }
    }

    var text = fmtNumber(range[0]);
    if (range.length > 1) {
      var hi = fmtNumber(range[1]);
      if (hi !== text) text += "–" + hi;
    }
    many = range[range.length - 1] > 1.001;
    if (unit) text += " " + (UNITS[unit] || [unit, unit])[many ? 1 : 0];
    return { amount: text, many: many };
  }

  /* ---------- metric and US units ---------- */

  var units = load("tg-units", "us") === "metric" ? "metric" : "us";
  var TO_G = { lb: 453.6, oz: 28.35, stick: 113.4 };
  var TO_ML = { cup: 240, quart: 946 };

  function plain(n) { return String(Math.round(n * 10) / 10); }
  function roundTo(n, step) { return Math.round(n / step) * step; }

  function fmtGrams(lo, hi) {
    var big = lo >= 1000;
    function one(g) { return big ? plain(g / 1000) : String(roundTo(g, g < 250 ? 5 : 25)); }
    var a = one(lo), b = hi == null ? a : one(hi);
    return a + (b !== a ? "–" + b : "") + (big ? " kg" : " g");
  }
  function fmtMl(lo, hi) {
    var big = lo >= 1000;
    function one(ml) { return big ? plain(ml / 1000) : String(roundTo(ml, ml < 100 ? 5 : 10)); }
    var a = one(lo), b = hi == null ? a : one(hi);
    return a + (b !== a ? "–" + b : "") + (big ? " L" : " ml");
  }

  var GLYPH = { "¼": 0.25, "½": 0.5, "¾": 0.75 };
  var NUM = "(\\d+[¼½¾]?|[¼½¾])";
  function parseNum(t) {
    var m = /^(\d+)?([¼½¾])?$/.exec(t);
    return (m[1] ? parseInt(m[1], 10) : 0) + (m[2] ? GLYPH[m[2]] : 0);
  }
  function proseRule(unitPattern, convert) {
    return [new RegExp(NUM + "(?: (to|or) " + NUM + ")? " + unitPattern, "g"), function (all, a, joiner, b) {
      var lo = parseNum(a), hi = b ? parseNum(b) : null;
      var out = convert(lo, hi);
      return joiner ? out.replace("–", " " + joiner + " ") : out;
    }];
  }
  var PROSE = [
    [/(\d+)°F \((\d+)°C\)/g, "$2°C ($1°F)"],
    [/9×13 inch/g, "23×33 cm"],
    proseRule("inch(?:es)?\\b", function (lo, hi) {
      var a = plain(roundTo(lo * 2.54, 0.5)), b = hi == null ? a : plain(roundTo(hi * 2.54, 0.5));
      return a + (b !== a ? "–" + b : "") + " cm";
    }),
    proseRule("lb\\b", function (lo, hi) { return fmtGrams(lo * TO_G.lb, hi == null ? null : hi * TO_G.lb); }),
    proseRule("oz\\b", function (lo, hi) { return fmtGrams(lo * TO_G.oz, hi == null ? null : hi * TO_G.oz); }),
    proseRule("cups?\\b", function (lo, hi) { return fmtMl(lo * TO_ML.cup, hi == null ? null : hi * TO_ML.cup); })
  ];

  /* Sentences are written in US units; in metric mode the measurements inside them are swapped. */
  function loc(text) {
    text = String(text);
    if (units !== "metric") return text;
    PROSE.forEach(function (rule) { text = text.replace(rule[0], rule[1]); });
    return text;
  }
  function L(text) { return esc(loc(text)); }

  function unitSwitch() {
    return '<div class="units" role="group" aria-label="Units">' +
      '<button type="button" data-units="us" aria-pressed="' + (units === "us") + '">US</button>' +
      '<button type="button" data-units="metric" aria-pressed="' + (units === "metric") + '">Metric</button></div>';
  }

  function makesText(r, k) {
    if (!r.makes) return "";
    var m = r.makes;
    var lo = m.n[0] * k, hi = m.n[1] * k;
    var num = fmtNumber(lo) + (fmtNumber(hi) !== fmtNumber(lo) ? "–" + fmtNumber(hi) : "");
    var what = hi > 1.001 && m.pl ? m.pl : m.what;
    return loc("Makes " + (m.what === "servings" ? "about " : "") + num + " " + what);
  }

  /* ---------- per-visit state ---------- */

  var scale = load("tg-scale", {});       // recipe id -> batches
  var ticks = {};                         // recipe id -> { key: true }, forgotten on reload
  var planDone = load("tg-plan", {});     // task key -> true
  var turkey = load("tg-turkey", { lb: 14, eat: "16:00" });
  var swaps = load("tg-swaps", {});       // recipe id -> { line key: chosen alternative index }
  var listState = { q: "", tag: "" };

  /* Tags can change with the swaps: a recipe with dairy lines counts as
   * vegan once every one of them is switched to its alternative. */
  function tagsFor(r) {
    var tags = (r.tags || []).slice();
    if (!r.veganSwap) return tags;
    var chosen = swaps[r.id] || {}, all = true;
    r.parts.forEach(function (p, pi) {
      p.items.forEach(function (it, ii) { if (it.swaps && !chosen["i" + pi + "-" + ii]) all = false; });
    });
    return all ? ["vegan"].concat(tags) : tags.concat(["dairy", "veganopt"]);
  }

  var STEPS = [0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24, 30];

  function batchesFor(id) { return scale[id] || 1; }
  function batchLabel(k) { return fmtNumber(k) + (k === 1 ? " batch" : k < 1 ? " batch" : " batches"); }

  /* ---------- screen wake lock ---------- */

  var wake = null, wantWake = false;
  function requestWake() {
    if (!("wakeLock" in navigator)) return;
    navigator.wakeLock.request("screen").then(function (lock) {
      wake = lock;
      lock.addEventListener("release", function () { wake = null; });
    }).catch(function () { wantWake = false; render(); });
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && wantWake && !wake) requestWake();
  });

  /* ---------- views ---------- */

  function tagDots(tags, withText) {
    return (tags || []).map(function (t) {
      return '<span class="tag tag-' + esc(t) + '">' + (withText ? esc(TAGS[t] || t) : '<span class="sr">' + esc(TAGS[t] || t) + "</span>") + "</span>";
    }).join("");
  }

  function viewList() {
    var q = listState.q.trim().toLowerCase();
    var tag = listState.tag;

    function matches(r) {
      var mine = tagsFor(r);
      if (tag && mine.indexOf(tag) < 0 && !(tag === "vegan" && mine.indexOf("veganopt") >= 0)) return false;
      if (!q) return true;
      var hay = r.name.toLowerCase() + " " + r.parts.map(function (p) {
        return p.items.map(function (i) { return i.item; }).join(" ");
      }).join(" ").toLowerCase();
      return hay.indexOf(q) >= 0;
    }

    var html = '<div class="topbar">' + unitSwitch() + "</div>" + '<header class="masthead">' +
      "<h1>Thanksgiving dinner</h1>" +
      "<p>" + RECIPES.length + " recipes, each written as one batch for a family table. Open one to scale it up or down.</p>" +
      "</header>";

    html += '<div class="finder">' +
      '<label class="sr" for="search">Search recipes and ingredients</label>' +
      '<input id="search" type="search" inputmode="search" autocomplete="off" placeholder="Search recipes or ingredients" value="' + esc(listState.q) + '">' +
      '<div class="filters" role="group" aria-label="Filter by diet">' +
      ["", "vegan", "gf"].map(function (t) {
        return '<button type="button" data-filter="' + t + '" aria-pressed="' + (tag === t) + '">' +
          (t ? '<span class="tag tag-' + t + '"></span>' + esc(TAGS[t]) : "Everything") + "</button>";
      }).join("") +
      "</div></div>";

    var shown = 0;
    GROUPS.forEach(function (g) {
      var rows = RECIPES.filter(function (r) { return r.group === g && matches(r); });
      if (!rows.length) return;
      shown += rows.length;
      html += '<section class="group"><h2>' + esc(g) + "</h2><ul>";
      rows.forEach(function (r) {
        var k = batchesFor(r.id);
        html += '<li><a class="row" href="#/r/' + esc(r.id) + '">' +
          '<span class="row-name">' + esc(r.name) + "</span>" +
          '<span class="row-meta">' + tagDots(tagsFor(r), true) +
          (k !== 1 ? '<span class="row-scale">set to ' + esc(batchLabel(k)) + "</span>" : "") +
          "</span></a></li>";
      });
      html += "</ul></section>";
    });

    if (!shown) {
      html += '<p class="empty">No recipe matches that. Try a shorter word, or <button type="button" class="link" data-clear>show everything</button>.</p>';
    }

    html += '<p class="footnote">Store bought: rolls and whipped cream. The original book also lists callaloo, white rice, black beans and vegan cookies, but has no recipes for them yet.</p>';
    return html;
  }

  function viewRecipe(r) {
    var k = batchesFor(r.id);
    var done = ticks[r.id] || (ticks[r.id] = {});
    var from = trail[trail.length - 1];
    var html = '<div class="topbar"><a class="back" href="' + (from ? esc(from.href) : "#/") + '"><span>' +
      (from ? "Back to " + esc(from.label) : "All recipes") + "</span></a>" + unitSwitch() + "</div>";

    html += '<header class="recipe-head"><h1>' + esc(r.name) + "</h1>";
    var tags = tagsFor(r);
    var chosen = swaps[r.id] || {};
    if (tags.length) html += '<p class="tags">' + tagDots(tags, true) + "</p>";
    var facts = [];
    if (r.makes) facts.push(makesText(r, k));
    if (r.time) facts.push(r.time);
    if (facts.length) html += '<p class="facts">' + facts.map(L).join("<br>") + "</p>";
    html += "</header>";

    if ("wakeLock" in navigator) {
      html += '<button type="button" class="wake" data-wake aria-pressed="' + wantWake + '">' +
        (wantWake ? "Screen stays on" : "Keep the screen on while cooking") + "</button>";
    }

    html += '<section class="block"><h2>Ingredients</h2>';
    r.parts.forEach(function (part, pi) {
      if (part.title) html += "<h3>" + esc(part.title) + "</h3>";
      html += '<ul class="ingredients">';
      part.items.forEach(function (it, ii) {
        var key = "i" + pi + "-" + ii;
        var a = amountFor(it, k);
        var name = a && a.many && it.pl ? it.pl : it.item;
        var picker = "";
        if (it.swaps) {
          var choices = [it.item].concat(it.swaps);
          var pick = chosen[key] < choices.length ? chosen[key] || 0 : 0;
          name = choices[pick];
          picker = '<label class="swap' + (pick ? " on" : "") + '">' + (pick ? "Swapped" : "Swap") +
            '<select data-swap="' + key + '" aria-label="Use instead of ' + esc(it.item) + '">' +
            choices.map(function (c, ci) {
              return '<option value="' + ci + '"' + (ci === pick ? " selected" : "") + ">" + esc(c.charAt(0).toUpperCase() + c.slice(1)) + "</option>";
            }).join("") + "</select></label>";
        }
        var link = it.ref && byId[it.ref] ? ' <a class="ref" href="#/r/' + esc(it.ref) + '">recipe</a>' : "";
        html += '<li class="' + (done[key] ? "done" : "") + '">' +
          '<button type="button" class="line" data-tick="' + key + '" aria-pressed="' + !!done[key] + '">' +
          '<span class="qty">' + (a ? esc(a.amount) : "") + "</span>" +
          '<span class="what">' + L(name) + (it.note && !(it.base && k !== 1) && !(it.usOnly && units === "metric") ? ' <span class="note">' + L(it.note) + "</span>" : "") + "</span>" +
          "</button>" + picker + link + "</li>";
      });
      html += "</ul>";
    });
    html += "</section>";

    if (r.equipment && r.equipment.length) {
      html += '<section class="block"><h2>You will need</h2><p class="equipment">' + r.equipment.map(L).join(", ") + ".</p></section>";
    }

    html += '<section class="block"><h2>Method</h2>';
    if (k !== 1) {
      html += '<p class="scaled-warning">Amounts are shown for ' + esc(batchLabel(k)) +
        ". Cooking times, temperatures and pan sizes are still written for one batch, so judge by the cues in each step.</p>";
    }
    var n = 0;
    r.steps.forEach(function (sec, si) {
      if (sec.title) html += "<h3>" + esc(sec.title) + "</h3>";
      html += '<ol class="steps" start="' + (n + 1) + '">';
      sec.items.forEach(function (s, ii) {
        n += 1;
        var key = "s" + si + "-" + ii;
        html += '<li class="' + (done[key] ? "done" : "") + '">' +
          '<button type="button" class="line" data-tick="' + key + '" aria-pressed="' + !!done[key] + '">' +
          '<span class="num" aria-hidden="true">' + n + "</span><span>" + L(s) + "</span></button></li>";
      });
      html += "</ol>";
    });
    html += "</section>";

    (r.links || []).forEach(function (l) {
      html += '<a class="outlink" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' +
        "<strong>" + esc(l.label) + "</strong>" +
        "<span>Opens " + esc(l.site || "another site") + " in a new tab</span></a>";
    });

    if (r.notes && r.notes.length) {
      html += '<section class="block"><h2>Notes</h2><ul class="notes">' +
        r.notes.map(function (t) { return "<li>" + L(t) + "</li>"; }).join("") + "</ul></section>";
    }
    if (r.confirm && r.confirm.length) {
      html += '<section class="block confirm"><h2>Worth checking</h2>' +
        "<p>Places where the original recipe was unclear or the amounts were adjusted.</p><ul class=\"notes\">" +
        r.confirm.map(function (t) { return "<li>" + L(t) + "</li>"; }).join("") + "</ul></section>";
    }

    if (from) {
      html += '<a class="return" href="' + esc(from.href) + '">Back to ' + esc(from.label) + "</a>";
    }
    if (Object.keys(done).length) {
      html += '<button type="button" class="reset" data-untick>Clear the check marks</button>';
    }

    // The scaler: fixed above the tab bar so amounts can be changed mid-recipe.
    var hasAmounts = r.parts.some(function (p) { return p.items.some(function (i) { return i.q != null; }); });
    if (hasAmounts) {
      html += '<div class="scaler" role="group" aria-label="Batch size">' +
        '<button type="button" data-step="-1" aria-label="Fewer batches"' + (k <= STEPS[0] ? " disabled" : "") + ">−</button>" +
        '<div class="scaler-read" aria-live="polite"><strong>' + esc(batchLabel(k)) + "</strong>" +
        (r.makes ? "<span>" + esc(makesText(r, k)) + "</span>" : "") + "</div>" +
        '<button type="button" data-step="1" aria-label="More batches"' + (k >= STEPS[STEPS.length - 1] ? " disabled" : "") + ">+</button>" +
        (r.crowd && r.crowd !== k
          ? '<button type="button" class="crowd" data-set="' + r.crowd + '">Big dinner<br>×' + r.crowd + "</button>"
          : (k !== 1 ? '<button type="button" class="crowd" data-set="1">Back to<br>1 batch</button>' : "")) +
        "</div>";
    }
    return html;
  }

  function clock(mins) {
    mins = ((Math.round(mins) % 1440) + 1440) % 1440;
    var h = Math.floor(mins / 60), m = mins % 60;
    var ap = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    return h + ":" + (m < 10 ? "0" : "") + m + " " + ap;
  }

  function turkeyTimes() {
    var lb = parseFloat(turkey.lb);
    var parts = String(turkey.eat || "").split(":");
    if (!(lb > 0) || parts.length < 2) return "";
    var eat = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    var roast = lb * 15, rest = 30, carve = 15;
    var out = eat - carve - rest;
    var inAt = out - roast;
    return "<dl>" +
      "<div><dt>" + clock(inAt - 20) + "</dt><dd>Turn the oven on</dd></div>" +
      "<div><dt>" + clock(inAt) + "</dt><dd>Turkey in, about " + fmtNumber(Math.round(roast / 15) / 4) + " hours</dd></div>" +
      "<div><dt>" + clock(out) + "</dt><dd>Turkey out to rest. Vegan roast, mac and cheese and stuffing go in</dd></div>" +
      "<div><dt>" + clock(eat - carve) + "</dt><dd>Carve</dd></div>" +
      "<div><dt>" + clock(eat) + "</dt><dd>Dinner</dd></div>" +
      "</dl>";
  }

  function viewPlan() {
    var html = '<div class="topbar">' + unitSwitch() + '</div><header class="masthead"><h1>Prep plan</h1>' +
      "<p>Spread the work over three days so Thanksgiving itself is mostly cooking, reheating and serving. Check marks are remembered on this phone.</p></header>";

    html += '<section class="turkey-clock"><h2>When does the turkey go in?</h2>' +
      '<div class="fields">' +
      (units === "metric"
        ? '<label>Turkey weight, kg<input type="number" inputmode="decimal" min="2" max="18" step="0.1" data-turkey="kg" value="' + esc(plain(parseFloat(turkey.lb) / 2.2046)) + '"></label>'
        : '<label>Turkey weight, lb<input type="number" inputmode="decimal" min="4" max="40" step="0.5" data-turkey="lb" value="' + esc(turkey.lb) + '"></label>') +
      '<label>Dinner time<input type="time" data-turkey="eat" value="' + esc(turkey.eat) + '"></label>' +
      '</div><div id="turkey-times">' + turkeyTimes() + "</div>" +
      '<p class="small">' + (units === "metric"
        ? "Based on about 33 minutes per kilo at 180°C, 30 minutes resting and 15 to carve. The thermometer decides: 74°C in the thigh."
        : "Based on 15 minutes per pound at 350°F, 30 minutes resting and 15 to carve. The thermometer decides: 165°F in the thigh.") + "</p></section>";

    PLAN.forEach(function (day) {
      var left = day.tasks.filter(function (t, i) { return !planDone[day.id + "-" + i]; }).length;
      html += '<section class="day"><h2>' + esc(day.when) + '<span class="count">' +
        (left ? left + " to do" : "All done") + "</span></h2><p class=\"aim\">" + esc(day.aim) + '</p><ul class="tasks">';
      day.tasks.forEach(function (t, i) {
        var key = day.id + "-" + i;
        html += '<li class="' + (planDone[key] ? "done" : "") + '">' +
          '<button type="button" class="line" data-plan="' + key + '" aria-pressed="' + !!planDone[key] + '">' +
          '<span class="box" aria-hidden="true"></span><span>' + L(t.t) + "</span></button>" +
          (t.r && byId[t.r] ? '<a class="ref" href="#/r/' + esc(t.r) + '">recipe</a>' : "") + "</li>";
      });
      html += "</ul></section>";
    });

    if (Object.keys(planDone).length) html += '<button type="button" class="reset" data-plan-reset>Start the plan over</button>';
    return html;
  }

  /* ---------- routing and rendering ---------- */

  var current = null;

  /* Where you came from, so a recipe opened from another recipe (or from the
   * prep plan) can offer a way back to the same spot. Emptied on the recipe list. */
  var trail = [];

  function keyOf(r) { return r.view === "recipe" ? "r/" + r.recipe.id : r.view; }

  function navigate() {
    var prev = current, next = route();
    var y = window.scrollY, restore = 0;
    var top = trail[trail.length - 1];

    if (prev && keyOf(prev) !== keyOf(next)) {
      if (top && top.key === keyOf(next)) {
        restore = top.y;                      // going back: return to where you were reading
        trail.pop();
      } else if (next.view === "recipe" && prev.view !== "list") {
        trail.push({
          key: keyOf(prev),
          href: "#/" + (prev.view === "plan" ? "plan" : keyOf(prev)),
          label: prev.view === "plan" ? "the prep plan" : prev.recipe.name,
          y: y
        });
      } else {
        trail = [];
      }
    }
    if (next.view === "list") trail = [];

    render(false);
    if (restore) window.scrollTo(0, restore);
  }

  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    if (h === "plan") return { view: "plan" };
    if (h.indexOf("r/") === 0 && byId[h.slice(2)]) return { view: "recipe", recipe: byId[h.slice(2)] };
    return { view: "list" };
  }

  function render(keepScroll) {
    var r = route();
    var y = window.scrollY;
    current = r;
    document.body.dataset.view = r.view;
    if (r.view === "recipe") {
      app.innerHTML = viewRecipe(r.recipe);
      document.title = r.recipe.name + " · Thanksgiving";
    } else if (r.view === "plan") {
      app.innerHTML = viewPlan();
      document.title = "Prep plan · Thanksgiving";
    } else {
      app.innerHTML = viewList();
      document.title = "Thanksgiving recipes";
    }
    Array.prototype.forEach.call(document.querySelectorAll(".tabs a"), function (a) {
      var on = (a.dataset.tab === "plan") === (r.view === "plan");
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    window.scrollTo(0, keepScroll ? y : 0);
  }

  window.addEventListener("hashchange", navigate);

  app.addEventListener("click", function (e) {
    var t = e.target.closest("button");
    if (!t) return;
    var r = current && current.recipe;

    if (t.dataset.units) {
      units = t.dataset.units === "metric" ? "metric" : "us";
      save("tg-units", units);
      return render(true);
    }

    if (t.dataset.tick && r) {
      var d = ticks[r.id];
      if (d[t.dataset.tick]) delete d[t.dataset.tick]; else d[t.dataset.tick] = true;
      return render(true);
    }
    if (t.hasAttribute("data-untick") && r) { ticks[r.id] = {}; return render(true); }

    if (t.dataset.step && r) {
      var k = batchesFor(r.id), i = STEPS.indexOf(k);
      if (i < 0) i = STEPS.indexOf(1);
      i = Math.max(0, Math.min(STEPS.length - 1, i + parseInt(t.dataset.step, 10)));
      scale[r.id] = STEPS[i];
      save("tg-scale", scale);
      return render(true);
    }
    if (t.dataset.set && r) {
      var v = parseFloat(t.dataset.set);
      if (STEPS.indexOf(v) < 0) { STEPS.push(v); STEPS.sort(function (a, b) { return a - b; }); }
      scale[r.id] = v;
      save("tg-scale", scale);
      return render(true);
    }
    if (t.hasAttribute("data-wake")) {
      wantWake = !wantWake;
      if (wantWake) requestWake(); else if (wake) wake.release();
      return render(true);
    }

    if (t.dataset.plan) {
      if (planDone[t.dataset.plan]) delete planDone[t.dataset.plan]; else planDone[t.dataset.plan] = true;
      save("tg-plan", planDone);
      return render(true);
    }
    if (t.hasAttribute("data-plan-reset")) { planDone = {}; save("tg-plan", planDone); return render(true); }

    if (t.dataset.filter !== undefined) { listState.tag = t.dataset.filter; return render(true); }
    if (t.hasAttribute("data-clear")) { listState = { q: "", tag: "" }; return render(true); }
  });

  app.addEventListener("change", function (e) {
    var t = e.target, r = current && current.recipe;
    if (!t.dataset.swap || !r) return;
    var mine = swaps[r.id] || (swaps[r.id] = {});
    var v = parseInt(t.value, 10);
    if (v) mine[t.dataset.swap] = v; else delete mine[t.dataset.swap];
    save("tg-swaps", swaps);
    render(true);
  });

  app.addEventListener("input", function (e) {
    var t = e.target;
    if (t.id === "search") {
      listState.q = t.value;
      var pos = t.selectionStart;
      render(true);
      var box = document.getElementById("search");
      box.focus();
      try { box.setSelectionRange(pos, pos); } catch (err) { /* some browsers refuse on type=search */ }
    } else if (t.dataset.turkey) {
      if (t.dataset.turkey === "kg") turkey.lb = plain(parseFloat(t.value) * 2.2046);
      else turkey[t.dataset.turkey] = t.value;
      save("tg-turkey", turkey);
      document.getElementById("turkey-times").innerHTML = turkeyTimes();
    }
  });

  render(false);
})();
