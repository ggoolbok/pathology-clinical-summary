/**
 * Single shared sorting rule for every clinical timeline in the app:
 * newest first, oldest last. Components and services should call this
 * rather than writing their own `.sort((a, b) => ...)` comparator, so the
 * ordering rule stays consistent everywhere and only needs to change here.
 */
export function sortByDateDesc<T>(items: T[], getDate: (item: T) => string): T[] {
  return items.slice().sort((a, b) => getDate(b).localeCompare(getDate(a)));
}
