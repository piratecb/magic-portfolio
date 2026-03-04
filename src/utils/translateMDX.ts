import fs from "fs";
import path from "path";

const CACHE_FILE = path.join(process.cwd(), ".translation-cache.json");

// Load persisted cache from disk on startup
const cache: Map<string, string> = (() => {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
      return new Map(Object.entries(data));
    }
  } catch {
    // ignore corrupt cache
  }
  return new Map<string, string>();
})();

function persistCache() {
  try {
    const obj = Object.fromEntries(cache);
    fs.writeFileSync(CACHE_FILE, JSON.stringify(obj, null, 2), "utf-8");
  } catch {
    // non-fatal — next request will try again
  }
}

/**
 * Translates a text chunk via MyMemory free API (no key required).
 * Limit: 500 chars per request.
 */
async function translateChunk(text: string, langPair: string): Promise<string> {
  if (!text.trim()) return text;
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`,
      { next: { revalidate: 86400 } } // cache at fetch level for 24h
    );
    if (!res.ok) return text;
    const data = await res.json();
    return data.responseData?.translatedText ?? text;
  } catch {
    return text;
  }
}

/**
 * Splits text into chunks of at most `maxLen` characters, breaking on newlines
 * or sentence boundaries so markdown structure is preserved.
 */
function splitIntoChunks(text: string, maxLen = 450): string[] {
  if (text.length <= maxLen) return [text];

  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > maxLen) {
    // Try to break at a newline within the limit
    let breakAt = remaining.lastIndexOf("\n", maxLen);
    if (breakAt <= 0) {
      // Fall back to last sentence boundary (. ! ?)
      breakAt = Math.max(
        remaining.lastIndexOf(". ", maxLen),
        remaining.lastIndexOf("! ", maxLen),
        remaining.lastIndexOf("? ", maxLen),
      );
      if (breakAt > 0) breakAt += 1; // include the punctuation
    }
    if (breakAt <= 0) breakAt = maxLen; // hard cut as last resort

    chunks.push(remaining.slice(0, breakAt));
    remaining = remaining.slice(breakAt);
  }
  if (remaining) chunks.push(remaining);
  return chunks;
}

/**
 * Translates MDX source content to the target language.
 * Splits on double-newlines (paragraph boundaries) to preserve markdown structure,
 * then further chunks long paragraphs as needed.
 * Results are cached in memory for the lifetime of the server process.
 */
export async function translateMDX(content: string, locale: string): Promise<string> {
  if (locale === "en") return content;

  const langPair = locale === "pt" ? "en|pt-PT" : `en|${locale}`;
  const cacheKey = `${langPair}::${Buffer.from(content).toString("base64").slice(0, 64)}`;

  if (cache.has(cacheKey)) return cache.get(cacheKey)!;

  // Preserve paragraph structure
  const paragraphs = content.split(/\n\n/);

  const translatedParagraphs = await Promise.all(
    paragraphs.map(async (para) => {
      const chunks = splitIntoChunks(para);
      const translatedChunks = await Promise.all(
        chunks.map((c) => translateChunk(c, langPair))
      );
      return translatedChunks.join("");
    })
  );

  const result = translatedParagraphs.join("\n\n");
  cache.set(cacheKey, result);
  persistCache();
  return result;
}
