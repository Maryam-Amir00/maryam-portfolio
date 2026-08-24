export function accessibleMetricValue(value: string) {
  return value
    .replaceAll("~", "approximately ")
    .replaceAll("%", " percent")
    .replaceAll("+", " or more")
    .replace(/\s+/g, " ")
    .trim()
}
