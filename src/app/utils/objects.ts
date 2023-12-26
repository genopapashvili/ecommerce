export function is<T>(variable: T | undefined | null): variable is T {
  return !(variable === undefined || variable === null);
}
