import widgets, { NumericSpinnerRecipe } from '../src/widgets';

function defaultNumericSpinner() : NumericSpinnerRecipe {
  return {
    x: 0,
    y: 0,
    height: 0,
    width: 0
  };
}

describe("NumericSpinner class", () => {
  it("should implement SpinnerWidget", () => {
    widgets.createNumericSpinner(defaultNumericSpinner()) as SpinnerWidget;
  });

  describe('constructor', () => {
    it("requires parameter object that implements 'NumericSpinner'", () => {
      const desc: NumericSpinnerRecipe = {
        x: 10,
        y: 20,
        width: 60,
        height: 15,
        name: "NumericSpinner",
        initialValue: 7,
        step: 0.01,
      };
      const objUT = widgets.createNumericSpinner(desc);
      expect(objUT.x).toBe(10);
      expect(objUT.y).toBe(20);
      expect(objUT.width).toBe(60);
      expect(objUT.height).toBe(15);
      expect(objUT.name).toBe("NumericSpinner");
      expect(objUT.value).toBe(7);
      expect(objUT.toString()).toBe('7.00');
      expect(objUT.step).toBe(0.01);
    });
  });

  describe("type property", () => {
    it("should be literal string type 'spinner'", () => {
      const objUT = widgets.createNumericSpinner(defaultNumericSpinner());
      expect(objUT.type).toBe("spinner");
    });
  });

  describe("value property", () => {
    it("should be initialized to 0", () => {
      const objUT = widgets.createNumericSpinner(defaultNumericSpinner());
      expect(objUT.value).toBe(0);
    });
  });

  describe("toString method", () => {
    it("should return 'value' property formatted to 2 decimal places", () => {
      const objUT = widgets.createNumericSpinner(defaultNumericSpinner());
      objUT.value = 12.3456;
      expect(objUT.toString()).toBe("12.35");
    });
  });

  describe("increment method", () => {
    it("should increase 'value' property by 'step' property", () => {
      const objUT = widgets.createNumericSpinner(defaultNumericSpinner());
      expect(objUT.step).toBe(1);
      expect(objUT.value).toBe(0);
      objUT.increment();
      expect(objUT.value).toBe(1);
      expect(objUT.toString()).toBe("1.00");
      objUT.increment();
      expect(objUT.value).toBe(2);
      expect(objUT.toString()).toBe("2.00");
    });
  });

  describe("decrement method", () => {
    it("should decrease 'value' property by 'step' property", () => {
      const objUT = widgets.createNumericSpinner(defaultNumericSpinner());
      expect(objUT.step).toBe(1);
      expect(objUT.value).toBe(0);
      objUT.decrement();
      expect(objUT.value).toBe(-1);
      expect(objUT.toString()).toBe("-1.00");
      objUT.decrement();
      expect(objUT.value).toBe(-2);
      expect(objUT.toString()).toBe("-2.00");
    });
  });

  describe("onValueChanged property", () => {
    it("should be invoked when 'increment' method is called'", () => {
      let wasInvoked = false;
      let toArg: number | undefined;
      let fromArg: number | undefined;

      const objUT = widgets.createNumericSpinner({
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        initialValue: 0,
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

    it("should be invoked when 'decrement' method is called ", () => {
      let wasInvoked = false;
      let toArg: number | undefined;
      let fromArg: number | undefined;

      const objUT = widgets.createNumericSpinner({
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        initialValue: 0,
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

    it("should be invoked when 'value' property is set", () => {
      let wasInvoked = false;
      let toArg: number | undefined;
      let fromArg: number | undefined;

      const objUT = widgets.createNumericSpinner({
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        initialValue: 3,
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

  describe('bind method', () => {
    it("can be used to bind an OpenRCT2 'SpinnerWidget' to the NumericSpinner, " +
       "such that changing its value updates the text of the SpinnerWidget", () => {
      const objUT = widgets.createNumericSpinner({
        x: 0,
        y: 0,
        height: 0,
        width: 0
      });
      const spinnerWidget = {
        x: 0,
        y: 0,
        height: 0,
        width: 0,
      } as SpinnerWidget;
      expect(spinnerWidget.text).toBeUndefined();
      objUT.bind(spinnerWidget);
      objUT.value = 7;
      expect(spinnerWidget.text).toBe('7.00');
    });
  });

  describe("step property", () => {
    test("that when it's 2, calling 'increment' increases 'value' property by 2", () => {
      const objUT = widgets.createNumericSpinner({
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        step: 2,
      });
      expect(objUT.value).toBe(0);
      objUT.increment();
      expect(objUT.value).toBe(2);
    });

    test("that when it's 2, calling 'decrement' decreases 'value' property by 2", () => {
      const objUT = widgets.createNumericSpinner({
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        step: 2,
      });
      expect(objUT.value).toBe(0);
      objUT.decrement();
      expect(objUT.value).toBe(-2);
      objUT.decrement();
      expect(objUT.value).toBe(-4);
    });

    test("that when it's 0.01, calling 'increment' increases 'value' property by 0.01", () => {
      const objUT = widgets.createNumericSpinner({
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        step: 0.01,
      });
      expect(objUT.value).toBe(0);
      objUT.increment();
      expect(objUT.value).toBe(0.01);
      objUT.increment();
      expect(objUT.value).toBe(0.02);
    });

    test("that when it's 0.01, calling 'decrement' decreases 'value' property by 0.01", () => {
      const objUT = widgets.createNumericSpinner({
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        step: 0.01,
      });
      expect(objUT.value).toBe(0);
      objUT.decrement();
      expect(objUT.value).toBe(-0.01);
      objUT.decrement();
      expect(objUT.value).toBe(-0.02);
    });

    test("that negative step inverts increment/decrement behavior", () => {
      const objUT = widgets.createNumericSpinner({
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        step: -1,
      });
      expect(objUT.value).toBe(0);
      objUT.increment();
      expect(objUT.value).toBe(-1);
      objUT.decrement();
      expect(objUT.value).toBe(0);
      objUT.decrement();
      expect(objUT.value).toBe(1);
      objUT.increment();
      expect(objUT.value).toBe(0);
    });
  });
});