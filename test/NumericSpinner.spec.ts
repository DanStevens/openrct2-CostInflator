import { NumericSpinner } from '../src/ui';

describe("NumericSpinner", () => {
  it("should implement SpinnerWidget", () => {});

  it("should have a constructor which requires position and dimentions", () => {
    const objUT = new NumericSpinner(10, 20, 60, 15);
    expect(objUT.x).toBe(10);
    expect(objUT.y).toBe(20);
    expect(objUT.width).toBe(60);
    expect(objUT.height).toBe(15);
  });

  test("'type' property should be 'spinner'", () => {
    const objUT = new NumericSpinner(0, 0, 0, 0);
    expect(objUT.type).toBe("spinner");
  });

  it("should have 'value' property, initialized to 0", () => {
    const objUT = new NumericSpinner(0, 0, 0, 0);
    expect(objUT.value).toBe(0);
  });

  test("'text' property should match 'value' property formatted to 2 decimal places", () => {
    const objUT = new NumericSpinner(0, 0, 0, 0);
    objUT.value = 12.3456;
    expect(objUT.text).toBe("12.35");
  });

  it("should have 'increment' method that increases 'value' property by 1", () => {
    const objUT = new NumericSpinner(0, 0, 0, 0);
    expect(objUT.value).toBe(0);
    objUT.increment();
    expect(objUT.value).toBe(1);
    expect(objUT.text).toBe("1.00");
    objUT.increment();
    expect(objUT.value).toBe(2);
    expect(objUT.text).toBe("2.00");
  });

  it("should have 'decrement' method that decreases 'value' property by 1", () => {
    const objUT = new NumericSpinner(0, 0, 0, 0);
    expect(objUT.value).toBe(0);
    objUT.decrement();
    expect(objUT.value).toBe(-1);
    expect(objUT.text).toBe("-1.00");
    objUT.decrement();
    expect(objUT.value).toBe(-2);
    expect(objUT.text).toBe("-2.00");
  });
});
