import { NumericSpinner, NumericSpinnerImpl } from '../src/widgets';

function defaultNumericSpinner() : NumericSpinner {
  return {
    x: 0,
    y: 0,
    height: 0,
    width: 0
  };
}

describe("NumericSpinnerImpl", () => {
  it("should implement SpinnerWidget", () => {});

  test("constructor with requires object that implements 'NumericSpinner'", () => {
    const desc: NumericSpinner = {
      x: 10,
      y: 20,
      width: 60,
      height: 15,
      name: "NumericSpinner",
      value: 7,
    };
    const objUT = new NumericSpinnerImpl(desc);
    expect(objUT.x).toBe(10);
    expect(objUT.y).toBe(20);
    expect(objUT.width).toBe(60);
    expect(objUT.height).toBe(15);
    expect(objUT.name).toBe("NumericSpinner");
    expect(objUT.value).toBe(7);
    expect(objUT.text).toBe('7.00');
  });

  test("'type' property should be 'spinner'", () => {
    const objUT = new NumericSpinnerImpl(defaultNumericSpinner());
    expect(objUT.type).toBe("spinner");
  });

  it("should have 'value' property, initialized to 0", () => {
    const objUT = new NumericSpinnerImpl(defaultNumericSpinner());
    expect(objUT.value).toBe(0);
  });

  test("'text' property should match 'value' property formatted to 2 decimal places", () => {
    const objUT = new NumericSpinnerImpl(defaultNumericSpinner());
    objUT.value = 12.3456;
    expect(objUT.text).toBe("12.35");
  });

  it("should have 'increment' method that increases 'value' property by 1", () => {
    const objUT = new NumericSpinnerImpl(defaultNumericSpinner());
    expect(objUT.value).toBe(0);
    objUT.increment();
    expect(objUT.value).toBe(1);
    expect(objUT.text).toBe("1.00");
    objUT.increment();
    expect(objUT.value).toBe(2);
    expect(objUT.text).toBe("2.00");
  });

  it("should have 'decrement' method that decreases 'value' property by 1", () => {
    const objUT = new NumericSpinnerImpl(defaultNumericSpinner());
    expect(objUT.value).toBe(0);
    objUT.decrement();
    expect(objUT.value).toBe(-1);
    expect(objUT.text).toBe("-1.00");
    objUT.decrement();
    expect(objUT.value).toBe(-2);
    expect(objUT.text).toBe("-2.00");
  });

  it("should invoked 'onValueChanged' callback when 'increment' method is called'", () => {
    let wasInvoked = false;
    let toArg: number | undefined;
    let fromArg: number | undefined;

    const objUT = new NumericSpinnerImpl({
      x: 0,
      y: 0,
      height: 0,
      width: 0,
      value: 0,
      onValueChanged: (to, from) => {
        wasInvoked = true;
        toArg = to;
        fromArg = from;
      }
    });
    objUT.increment();
    expect(wasInvoked).toBe(true);
    expect(toArg).toBe(1);
    expect(fromArg).toBe(0);
  });

  it("should invoked 'onValueChanged' callback when 'decrement' method is called ", () => {
    let wasInvoked = false;
    let toArg: number | undefined;
    let fromArg: number | undefined;

    const objUT = new NumericSpinnerImpl({
      x: 0,
      y: 0,
      height: 0,
      width: 0,
      value: 0,
      onValueChanged: (to, from) => {
        wasInvoked = true;
        toArg = to;
        fromArg = from;
      }
    });
    objUT.decrement();
    expect(wasInvoked).toBe(true);
    expect(toArg).toBe(-1);
    expect(fromArg).toBe(0);
  });

  it("should invoked 'onValueChanged' callback when 'value' property is set", () => {
    let wasInvoked = false;
    let toArg: number | undefined;
    let fromArg: number | undefined;

    const objUT = new NumericSpinnerImpl({
      x: 0,
      y: 0,
      height: 0,
      width: 0,
      value: 3,
      onValueChanged: (to, from) => {
        wasInvoked = true;
        toArg = to;
        fromArg = from;
      }
    });
    objUT.value = 7;
    expect(wasInvoked).toBe(true);
    expect(toArg).toBe(7);
    expect(fromArg).toBe(3);
  });
});
