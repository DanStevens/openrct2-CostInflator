export function increment(base: number, amount: number): number {
  return +(base + amount).toFixed(2);
}

export function decrement(base: number, amount: number): number {
  return +(base - amount).toFixed(2);
}
