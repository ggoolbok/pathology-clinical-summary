/**
 * Very small heuristic for "is this the same/related organ" comparisons
 * used throughout the relevance engine. Organ/site strings in the mock
 * data look like "Kidney (transplant allograft)" or "Colon, ascending" —
 * this extracts the leading organ word (before a comma or parenthesis) and
 * compares case-insensitively, falling back to substring containment.
 */
export function organRoot(organSite: string): string {
  return organSite
    .split(/[,(]/)[0]
    .trim()
    .toLowerCase();
}

export function isSameOrRelatedOrgan(a: string, b: string): boolean {
  const rootA = organRoot(a);
  const rootB = organRoot(b);
  if (!rootA || !rootB) return false;
  return rootA === rootB || rootA.includes(rootB) || rootB.includes(rootA);
}

export function textContainsKeyword(text: string, keyword: string): boolean {
  return text.toLowerCase().includes(keyword.toLowerCase());
}
