export const mswUrl = (strings: TemplateStringsArray, ...values: string[]) => {
  const host = typeof window === "undefined" ? "http://localhost:3000" : ""

  const relativeUrl = values.reduce(
    (prev, cur, i) => `${prev}${cur}${strings[i + 1]}`,
    strings[0],
  )

  return `${host}${relativeUrl}`
}
