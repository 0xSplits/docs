const fs = require("fs");
const path = require("path");

const PAGES_DIR = path.join(__dirname, "..", "pages");
const PUBLIC_DIR = path.join(__dirname, "..", "public");

// Public canonical base. Docs are served from splits.org/protocol/docs, which
// enforces trailing slashes, so page URLs carry one.
const DOCS_BASE_URL = "https://splits.org/protocol/docs";

// ponytail: Nextra serves page images under hashed /_next paths this script
// can't know, so twins link the public repo instead of copying 11 MB of
// images into public/. Swap for a copy step if the repo ever goes private.
const RAW_IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/0xSplits/docs/main/pages";

const IMAGE_RE = /\.(png|gif|jpe?g|svg|webp)$/i;

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

// Map a page slug ('' for the root) to its canonical URL
function pageUrl(slug) {
  return slug ? `${DOCS_BASE_URL}/${slug}/` : `${DOCS_BASE_URL}/`;
}

// Resolve a link target found in a page under `pageDir` (relative to pages/)
// to an absolute URL, so the twin reads correctly from any host.
function absolutize(target, pageDir) {
  if (/^(https?:|mailto:|#)/.test(target)) return target;

  const [p, hash] = target.split("#");
  const resolved = p.startsWith("/")
    ? p.slice(1)
    : path.posix.normalize(path.posix.join(pageDir, p));

  if (IMAGE_RE.test(resolved)) return `${RAW_IMAGE_BASE_URL}/${resolved}`;

  const slug = resolved.replace(/\.mdx$/, "").replace(/\/$/, "");
  return `${pageUrl(slug)}${hash ? `#${hash}` : ""}`;
}

// Apply `fn` to the prose between fenced code blocks, leaving code untouched
// (code samples legitimately contain imports, JSX and relative paths).
function transformProse(text, fn) {
  return text
    .split(/(```[\s\S]*?```)/)
    .map((part, i) => (i % 2 ? part : fn(part)))
    .join("");
}

// Strip JSX/MDX artifacts and convert to clean markdown
function cleanMdx(content, pageDir) {
  let text = content;
  let description = "";

  // Lift the frontmatter description out; it becomes the summary line below the H1
  text = text.replace(/^---\n([\s\S]*?)\n---\n/, (_, fm) => {
    const match = fm.match(/^description:\s*"?(.*?)"?\s*$/m);
    if (match) description = match[1];
    return "";
  });

  text = transformProse(text, (prose) =>
    prose
      .replace(/^import\s+.*from\s+['"].*$\n?/gm, "")
      // Inline SVG icons (Callout emoji props)
      .replace(/<svg[\s\S]*?<\/svg>/g, "")
      // A Toggle's title is the only visible heading for its content
      .replace(/<Toggle[^>]*title="([^"]*)"[^>]*>/g, "**$1**\n\n")
      // Self-closing JSX tags: <Component ... />
      .replace(/<\w+[^>]*\/>/g, "")
      // Wrapper tags whose children are plain markdown
      .replace(/<\/?(Toggle|Tabs|Tab|Callout|div)[^>]*>/g, "")
      // {/* JSX comments */}
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
      .replace(/\]\(([^)\s]+)\)/g, (_, t) => `](${absolutize(t, pageDir)})`)
  );

  if (description) {
    text = text.replace(/^(# .*)$/m, `$1\n\n> ${description}`);
  }

  // Collapse 3+ blank lines into 2
  return text.replace(/\n{3,}/g, "\n\n").trim();
}

function main() {
  const header = `# Protocol — Full Documentation

> Composable, open-source, audited smart contracts for managing onchain revenue. No protocol fees. Runs forever as a hyperstructure.

This file contains the complete protocol documentation concatenated into a single document.
For a curated index, see ${DOCS_BASE_URL}/llms.txt

---

`;

  const pages = collectPages(PAGES_DIR, "");
  const sections = [];

  for (const { file, relPath } of pages) {
    const raw = fs.readFileSync(file, "utf-8");
    const cleaned = cleanMdx(raw, path.posix.dirname(relPath).replace(/^\.$/, ""));
    const slug = relPath.replace(/\.mdx$/, "").replace(/^index$/, "");

    // Markdown twin at <page>.md (llmstxt.org shape); the root page is index.md
    const twin = path.join(PUBLIC_DIR, relPath.replace(/\.mdx$/, ".md"));
    fs.mkdirSync(path.dirname(twin), { recursive: true });
    fs.writeFileSync(twin, `${cleaned}\n`, "utf-8");

    sections.push(`Source: ${pageUrl(slug)}\n\n${cleaned}`);
  }

  const output = header + sections.join("\n\n---\n\n") + "\n";
  const fullPath = path.join(PUBLIC_DIR, "llms-full.txt");

  fs.writeFileSync(fullPath, output, "utf-8");
  console.log(
    `Generated ${fullPath} and ${sections.length} markdown twins (${output.length} bytes)`
  );
}

main();
