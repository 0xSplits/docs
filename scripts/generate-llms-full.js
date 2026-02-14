const fs = require("fs");
const path = require("path");

const PAGES_DIR = path.join(__dirname, "..", "pages");
const OUTPUT = path.join(__dirname, "..", "public", "llms-full.txt");

// Read a _meta.json and return ordered page slugs (skipping separators, external links, etc.)
function readMeta(dir) {
  const metaPath = path.join(dir, "_meta.json");
  if (!fs.existsSync(metaPath)) return [];

  const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
  const slugs = [];

  for (const [key, value] of Object.entries(meta)) {
    // Skip separators, external links, and non-page entries
    if (typeof value === "object" && value !== null) {
      if (value.type === "separator") continue;
      if (value.href) continue; // external link
    }
    slugs.push(key);
  }

  return slugs;
}

// Recursively collect MDX files in navigation order from _meta.json
function collectPages(dir, prefix) {
  const slugs = readMeta(dir);
  const pages = [];

  for (const slug of slugs) {
    const mdxFile = path.join(dir, `${slug}.mdx`);
    const subDir = path.join(dir, slug);
    const relPath = prefix ? `${prefix}/${slug}` : slug;

    // Add the page itself if it exists
    if (fs.existsSync(mdxFile)) {
      pages.push({ file: mdxFile, relPath: `${relPath}.mdx` });
    }

    // Recurse into subdirectory if it has a _meta.json
    if (fs.existsSync(path.join(subDir, "_meta.json"))) {
      pages.push(...collectPages(subDir, relPath));
    }
  }

  return pages;
}

// Map file paths to URL paths
function fileToUrl(relPath) {
  const slug = relPath.replace(/\.mdx$/, "").replace(/\/index$/, "");
  if (slug === "index") return "https://docs.splits.org";
  return `https://docs.splits.org/${slug}`;
}

// Strip JSX/MDX artifacts and convert to clean markdown
function cleanMdx(content) {
  let lines = content.split("\n");

  // Remove import lines at the top of the file
  lines = lines.filter((line) => !line.match(/^import\s+.*from\s+['"]/));

  let text = lines.join("\n");

  // Remove self-closing JSX tags: <Component ... />
  text = text.replace(/<\w+[^>]*\/>/g, "");

  // Remove opening JSX tags (Toggle, Tabs, Tab, Callout, div)
  text = text.replace(/<(Toggle|Tabs|Tab|Callout|div)[^>]*>/gs, "");

  // Remove closing JSX tags
  text = text.replace(/<\/(Toggle|Tabs|Tab|Callout|div)>/g, "");

  // Remove {/* JSX comments */}
  text = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");

  // Collapse 3+ blank lines into 2
  text = text.replace(/\n{3,}/g, "\n\n");

  return text.trim();
}

function main() {
  const header = `# Splits — Full Documentation

> Composable, open-source, audited smart contracts for managing onchain revenue. No protocol fees. Runs forever as a hyperstructure.

This file contains the complete Splits documentation concatenated into a single document.
For a curated index, see https://docs.splits.org/llms.txt

---

`;

  const pages = collectPages(PAGES_DIR, "");
  const sections = [];

  for (const { file, relPath } of pages) {
    const raw = fs.readFileSync(file, "utf-8");
    const cleaned = cleanMdx(raw);
    const url = fileToUrl(relPath);

    sections.push(`<!-- Source: ${url} -->\n\n${cleaned}`);
  }

  const output = header + sections.join("\n\n---\n\n") + "\n";

  fs.writeFileSync(OUTPUT, output, "utf-8");
  console.log(
    `Generated ${OUTPUT} (${sections.length} pages, ${output.length} bytes)`
  );
}

main();
