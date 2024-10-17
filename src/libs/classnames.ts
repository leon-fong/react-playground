export function cn(...args: Array<undefined | null | string | boolean>): string {
  return args
    .flat()
    .filter(x => typeof x === "string")
    .join(" ")
}
