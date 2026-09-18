/** Deterministic preprocessing: it does not infer meaning or learn from users. */
export function normalizeInput(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[!?.,;:]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
