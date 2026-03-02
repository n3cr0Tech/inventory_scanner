import { Item } from "../data/datamodels";

// Fuzzy match: returns true if all chars of needle appear in order in haystack
export function fuzzyMatch(needle: string, haystack: string): boolean {
  const n = needle.toLowerCase();
  const h = haystack.toLowerCase();
  let ni = 0;
  for (let hi = 0; hi < h.length && ni < n.length; hi++) {
    if (h[hi] === n[ni]) ni++;
  }
  return ni === n.length;
}

export function filterItems(items: Item[], query: string): Item[] {
  if (!query.trim()) return items;
  return items.filter((item) =>
    fuzzyMatch(query, item.name) ||
    fuzzyMatch(query, item.id) ||
    fuzzyMatch(query, item.category)
  );
}