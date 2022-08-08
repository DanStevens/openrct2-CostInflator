import { clampMin, clampMax, clamp, last, countDecimals } from '../src/utils';

describe("clampMin function", () => {
  test.each([
    [0, 0, 0],
    [-1, 0, 0],
    [1, 0, 1],
    [1, 1, 1],
    [0, 1, 1],
    [2, 1, 2],
    [-1, -1, -1],
    [-2, -1, -1],
    [0, -1, 0],
  ])('given value of %i and min of %i should return %i', (value, min, expected) => {
    expect(clampMin(value, min)).toBe(expected);
  });

  test("given min is undefined then value is returned unchanged", () => {
    expect(clampMin(42, null)).toBe(42);
  });

  test("given min is null then value is returned unchanged", () => {
    expect(clampMin(42, undefined)).toBe(42);
  });
});

describe("clampMax function", () => {
  test.each([
    [0, 0, 0],
    [-1, 0, -1],
    [1, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
    [2, 1, 1],
    [-1, -1, -1],
    [-2, -1, -2],
    [0, -1, -1]
  ])('given value of %i and max of %i should return %i', (value, min, expected) => {
    expect(clampMax(value, min)).toBe(expected);
  });

  test("given max is undefined then value is returned", () => {
    expect(clampMax(42, null)).toBe(42);
  });

  test("given max is null then value is returned", () => {
    expect(clampMax(42, undefined)).toBe(42);
  });
});

describe("clamp function", () => {
  test.each([
    [0, 0, 0, 0],
    [0, -2, -1, -1],
    [0, 1, 2, 1],
    [1, 0, 2, 1],
    [3, 2, 2, 2],
    [-1, -2, -2, -2],
    [0.01, 0, 0.02, 0.01],
    [0.01, 0.01, 0.02, 0.01],
    [0.00, 0.01, 0.02, 0.01],
    [0.03, 0.01, 0.02, 0.02],
  ])('given value of %i, min of %i and max of %i should return %i', (value, min, max, expected) => {
    expect(clamp(value, min, max)).toBe(expected);
  });

  test.each([
    [0, 0, 0],
    [-1, 0, 0],
    [1, 0, 1],
    [1, 1, 1],
    [0, 1, 1],
    [2, 1, 2],
    [-1, -1, -1],
    [-2, -1, -1],
    [0, -1, 0],
  ])('given value of %i, min of %i and max of undefined or null should return %i', (value, min, expected) => {
    expect(clamp(value, min, undefined)).toBe(expected);
    expect(clamp(value, min, null)).toBe(expected);
  });

  test.each([
    [0, 0, 0],
    [-1, 0, -1],
    [1, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
    [2, 1, 1],
    [-1, -1, -1],
    [-2, -1, -2],
    [0, -1, -1]
  ])('given value of %i, min of undefined or null and max of %i should return %i', (value, max, expected) => {
    expect(clamp(value, undefined, max)).toBe(expected);
    expect(clamp(value, null, max)).toBe(expected);
  });

  it("should throw if min arg is greater than max arg", () => {
    expect(() => clamp(0, 1, 0)).toThrow('Invalid args: min must be less than or equal to max');
  });
});

describe("last function", () => {
  it("returns undefined when given empty array", () => {
    const emptyArray: unknown[] = [];
    expect(last(emptyArray)).toBeUndefined();
  });

  it("returns the element when given array of one item", () => {
    const oneItemArray = [1];
    expect(last(oneItemArray)).toBe(1);
  });

  it("returns the second item when given a two item array", () => {
    const twoItemArray = [1, 2];
    expect(last(twoItemArray)).toBe(2);
  });

  it("returns the third item when given a three item array", () => {
    const twoItemArray = [1, 2, 3];
    expect(last(twoItemArray)).toBe(3);
  });
});

describe("countDecimals function", () => {
  test.each([
    [0, 0],
    [1, 0],
    [-1, 0],
    [0.0, 0],
    [0.1, 1],
    [-0.1, 1],
    [0.2, 1],
    [0.23, 2],
    [0.01, 2],
    [0.001, 3],
    [1e-8, 8],
    [-1e-8, 8],
    [1e8, 0],
    [1.1, 1],
    [3456.78, 2]
  ])("given number '%i', should return %i", (num: number, expected: number) => {
    expect(countDecimals(num)).toBe(expected);
  });

  test.each([
    ["0", 0],
    ["1", 0],
    ["-1", 0],
    ["0.0", 0],
    ["0.1", 1],
    ["-0.1", 1],
    ["0.2", 1],
    ["0.23", 2],
    ["0.01", 2],
    ["0.001", 3],
    ["1e-8", 8],
    ["-1e-8", 8],
    ["1e8", 0],
    ["000", 0],
    ["100", 0],
    ["-100", 0],
    ["0.000", 0],
    ["0.100", 1],
    ["-0.100", 1],
    ["0.200", 1],
    ["0.2300", 2],
    ["0.0100", 2],
    ["0.00100", 3],
  ])("given string '%s', should return %s", (str: string, expected: number) => {
    expect(countDecimals(+str)).toBe(expected);
  });
});
