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

/**
 * Returns the last element of an array
 * @param array The array from which to return the last element
 * @returns The last element of the array, or `undefined` if the array is empty
 */
export function last<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}

/**
 * Returns the number of decimal places in a number
 * @param num
 * @returns number of decimals places
 * @example countDecimals(1) => 0
 * @example countDecimals(1.0) => 0
 * @example countDecimals(1.1) => 1
 * @example countDecimals(0.01) => 2
 * @example countDecimals(3456.78) => 2
 */
// https://stackoverflow.com/a/64876394/660896
export function countDecimals(num: number) {
  if (Number.isInteger(num) === true) {
    return 0;
  }

  const text = num.toString(); // Convert back to string and check for "1e-8" numbers

  if (text.indexOf('e-') > -1) {
    const [, trail] = text.split('e-');
    const deg = parseInt(trail, 10);
    return deg;
  }

  const index = text.indexOf(".");
  return text.length - index - 1; // Otherwise use simple string function to count
}

/**
 * Rounds a number to the given multiple
 * @param num The number to round
 * @param multiple The multiple to round by
 * @returns num rounded according to the given multiple
 */
// https://stackoverflow.com/a/10728943/660896
export function roundMultiple(num: number, multiple: number) {
  return Math.round(num / multiple) * multiple;
}
