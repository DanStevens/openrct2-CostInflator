function validateMinMax(min: number | null | undefined, max: number | null | undefined): boolean {
  if (min === undefined || min === null)
    return true;
  if (max === undefined || max === null)
    return true;
  return min <= max;
}

/**
 * Clamps a value to the given lower bound
 * @param value the value to clamp
 * @param min optional lower bound
 * @returns `min` if `value` is less than `min`, otherwise `value`
 */
export function clampMin(value: number, min: number | null | undefined): number {
  return min !== undefined && min !== null && value < min ? min : value;
}

/**
 * Clamps a value to the given upper bound
 * @param value the value to clamp
 * @param min optional upper bound
 * @returns `max` if `value` is greater than `max`, otherwise `value`
 */
export function clampMax(value: number, max: number | null | undefined): number {
  return max !== undefined && max !== null && value > max ? max : value;
}

/**
 * Clamps a value to an inclusive range
 * @param value the value to clamp
 * @param min optional lower bound
 * @param max optional upper bound
 * @returns `min` if `value` is less than `min`, `max` if `value` is less than `max`,
 * otherwise `value`
 * @throws if `min` argument is greater than `max`
 */
export function clamp(value: number, min: number | null | undefined, max: number | null | undefined): number {
  if (!validateMinMax(min, max))
    throw new Error('Invalid args: min must be less than or equal to max');

  return clampMax(clampMin(value, min), max);
}

export function last<T>(array: T[]) {
  return array[array.length - 1];
}
