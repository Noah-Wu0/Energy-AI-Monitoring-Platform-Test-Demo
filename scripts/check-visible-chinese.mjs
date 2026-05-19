import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL || "http://localhost:5177";
const routes = [
  "#/home",
  "#/overview",
  "#/scenario-1-1",
  "#/scenario-1-2",
  "#/scenario-2-1",
  "#/scenario-2-2",
  "#/scenario-3-1",
  "#/scenario-3-2",
  "#/scenario-4-1",
  "#/scenario-4-2",
  "#/drill-down-region",
  "#/drill-down-company",
];

const routeSources = {
  "#/home": "src/components/HomePage.tsx",
  "#/overview": "src/App.tsx",
  "#/scenario-1-1": "src/components/Scenario11Page.tsx",
  "#/scenario-1-2": "src/components/Scenario12Page.tsx",
  "#/scenario-2-1": "src/components/Scenario21Page.tsx",
  "#/scenario-2-2": "src/components/Scenario22Page.tsx",
  "#/scenario-3-1": "src/components/Scenario31Page.tsx",
  "#/scenario-3-2": "src/components/Scenario32Page.tsx",
  "#/scenario-4-1": "src/components/Scenario41Page.tsx",
  "#/scenario-4-2": "src/components/Scenario42Page.tsx",
  "#/drill-down-region": "src/components/DrillDownRegionPage.tsx",
  "#/drill-down-company": "src/components/DrillDownCompanyPage.tsx",
};

function snippet(text, matchStart, matchEnd) {
  const start = Math.max(0, matchStart - 36);
  const end = Math.min(text.length, matchEnd + 36);
  return text.slice(start, end).replace(/\s+/g, " ").trim();
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

const results = [];

for (const route of routes) {
  await page.goto(`${baseUrl}/${route}`, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    localStorage.setItem("lang", "en");
  });
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(250);

  const scan = await page.evaluate(() => {
    const chinese = /[\u4e00-\u9fff]/g;
    const bodyText = document.body.innerText || "";
    const matches = [];
    let match;
    while ((match = chinese.exec(bodyText)) && matches.length < 80) {
      matches.push({
        text: bodyText.slice(Math.max(0, match.index - 36), Math.min(bodyText.length, match.index + 72)).replace(/\s+/g, " ").trim(),
      });
    }

    const regions = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const seen = new Set();
    while (walker.nextNode() && regions.length < 80) {
      const node = walker.currentNode;
      const value = node.nodeValue || "";
      if (!/[\u4e00-\u9fff]/.test(value)) continue;
      const parent = node.parentElement;
      const near = parent?.closest("section, aside, header, footer, article, div, button, li, td, th, text, tspan") || parent;
      const area = near
        ? [near.tagName.toLowerCase(), near.className && String(near.className).trim()]
            .filter(Boolean)
            .join(".")
        : "unknown";
      const text = (near?.textContent || value).replace(/\s+/g, " ").trim();
      const key = `${area}|${text}`;
      if (seen.has(key)) continue;
      seen.add(key);
      regions.push({
        area,
        text: text.length > 180 ? `${text.slice(0, 180)}...` : text,
      });
    }

    return { bodyText, matches, regions };
  });

  const chineseMatches = [...scan.bodyText.matchAll(/[\u4e00-\u9fff]+/g)];
  const fragments = chineseMatches.slice(0, 30).map((m) => snippet(scan.bodyText, m.index, m.index + m[0].length));
  results.push({
    route,
    hasChinese: chineseMatches.length > 0,
    fragments: [...new Set(fragments)].slice(0, 16),
    regions: scan.regions.slice(0, 16),
    source: routeSources[route] || "unknown",
  });
}

await browser.close();

for (const result of results) {
  console.log(`\n## ${result.route}`);
  console.log(`hasChinese: ${result.hasChinese ? "YES" : "NO"}`);
  console.log(`source: ${result.source}`);
  if (result.hasChinese) {
    console.log("fragments:");
    result.fragments.forEach((item) => console.log(`- ${item}`));
    console.log("regions:");
    result.regions.forEach((item) => console.log(`- [${item.area}] ${item.text}`));
  }
}

console.log("\nJSON_RESULT_START");
console.log(JSON.stringify(results, null, 2));
