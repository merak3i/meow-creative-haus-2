export const disciplines = [
  "Websites",
  "Products",
  "Social",
  "Motion",
  "Editorial",
  "Concepts",
] as const;
export interface WorkSearchParams {
  q?: string | string[];
  discipline?: string | string[];
  page?: string | string[];
}
const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;
export function normalizeWorkQuery(params: WorkSearchParams) {
  const requested = Number(first(params.page));
  return {
    q: (first(params.q) ?? "").trim().slice(0, 100),
    discipline: disciplines.find((d) => d === first(params.discipline)),
    page: Number.isSafeInteger(requested) && requested > 0 ? requested : 1,
  };
}
export function workQueryHref(q = "", discipline?: string, page = 1) {
  const query = new URLSearchParams();
  if (q) query.set("q", q);
  if (discipline) query.set("discipline", discipline);
  if (page > 1) query.set("page", String(page));
  return `/work${query.size ? `?${query}` : ""}`;
}
