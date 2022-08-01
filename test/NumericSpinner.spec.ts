import widgets, { NumericSpinner, NumericSpinnerRecipe } from '../src/widgets';

function createObjUnderTest(props?: Partial<NumericSpinnerRecipe>) : NumericSpinner {
  return widgets.createNumericSpinner({
    ...{
      x: 0,
      y: 0,
      height: 0,
      width: 0
    },
    ...props
  });
}

describe("NumericSpinner", () => {
  it("should implement SpinnerWidget interface", () => {
    createObjUnderTest() as SpinnerWidget;
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
        min: -16,
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
      expect(objUT.min).toBe(-16);
    });
  });

  describe("type property", () => {
    it("should be literal string type 'spinner'", () => {
      const objUT = createObjUnderTest();
      expect(objUT.type).toBe("spinner");
    });
  });

  describe("value property", () => {
    it("should be initialized to 0", () => {
      const objUT = createObjUnderTest();
      expect(objUT.value).toBe(0);
    });
  });

  describe("toString method", () => {
    it("should return 'value' property formatted to 2 decimal places", () => {
      const objUT = createObjUnderTest();
      objUT.value = 12.3456;
      expect(objUT.toString()).toBe("12.35");
    });
  });

  describe("increment method", () => {
    it("should increase 'value' property by 'step' property", () => {
      const objUT = createObjUnderTest();
      expect(objUT.step).toBe(1);
      expect(objUT.value).toBe(0);
      objUT.increment();
      expect(objUT.value).toBe(1);
      expect(objUT.toString()).toBe("1.00");
      objUT.increment();
      expect(objUT.value).toBe(2);
      expect(objUT.toString()).toBe("2.00");
    });

    it("should not increase 'value' property when 'value' property is equal to 'max' property", () => {
      const objUT = createObjUnderTest({
        max: 1
      });
      expect(objUT.value).toBe(0);
      expect(objUT.max).toBe(1);
      objUT.increment();
      expect(objUT.value).toBe(1);
      objUT.increment();
      expect(objUT.value).toBe(1);
    });

    it("should set 'value' to equal 'max' when incrementing 'value' by 'step' property would result in " +
       "a value greater than 'max'", () => {
      const objUT = createObjUnderTest({
        max: 3,
        step: 2
      });
      expect(objUT.value).toBe(0);
      expect(objUT.max).toBe(3);
      objUT.increment();
      expect(objUT.value).toBe(2);
      objUT.increment();
      expect(objUT.value).toBe(3);
    });

    // Using a negative step inverts the behavior of increment
    describe("combined with negative step", () => {
      it("should not decrease 'value' property when 'value' property is equal to 'min' property", () => {
        const objUT = createObjUnderTest({
          step: -1,
          min: -1
        });
        expect(objUT.value).toBe(0);
        expect(objUT.min).toBe(-1);
        objUT.increment();
        expect(objUT.value).toBe(-1);
        objUT.increment();
        expect(objUT.value).toBe(-1);
      });
  
      it("should set 'value' to equal 'min' when decrementing 'value' by 'step' property would result in " +
         "a value less than 'min'", () => {
        const objUT = createObjUnderTest({
          min: -3,
          step: -2
        });
        expect(objUT.value).toBe(0);
        expect(objUT.min).toBe(-3);
        objUT.increment();
        expect(objUT.value).toBe(-2);
        objUT.increment();
        expect(objUT.value).toBe(-3);
      });
    });
  });

  describe("decrement method", () => {
    it("should decrease 'value' property by 'step' property", () => {
      const objUT = createObjUnderTest();
      expect(objUT.step).toBe(1);
      expect(objUT.value).toBe(0);
      objUT.decrement();
      expect(objUT.value).toBe(-1);
      expect(objUT.toString()).toBe("-1.00");
      objUT.decrement();
      expect(objUT.value).toBe(-2);
      expect(objUT.toString()).toBe("-2.00");
    });

    it("should not decrease 'value' property when 'value' property is equal to 'min' property", () => {
      const objUT = createObjUnderTest({
        min: -1
      });
      expect(objUT.value).toBe(0);
      expect(objUT.min).toBe(-1);
      objUT.decrement();
      expect(objUT.value).toBe(-1);
      objUT.decrement();
      expect(objUT.value).toBe(-1);
    });

    it("should set 'value' to equal 'min' when decrementing 'value' by 'step' property would result in " +
       "a value less than 'min'", () => {
      const objUT = createObjUnderTest({
        min: -3,
        step: 2
      });
      expect(objUT.value).toBe(0);
      expect(objUT.min).toBe(-3);
      objUT.decrement();
      expect(objUT.value).toBe(-2);
      objUT.decrement();
      expect(objUT.value).toBe(-3);
    });

    describe("combined with negative step", () => {
      it("should not increase 'value' property when 'value' property is equal to 'max' property", () => {
        const objUT = createObjUnderTest({
          max: 1,
          step: -1
        });
        expect(objUT.value).toBe(0);
        expect(objUT.max).toBe(1);
        objUT.decrement();
        expect(objUT.value).toBe(1);
        objUT.decrement();
        expect(objUT.value).toBe(1);
      });
  
      it("should set 'value' to equal 'max' when incrementing 'value' by 'step' property would result in " +
         "a value greater than 'max'", () => {
        const objUT = createObjUnderTest({
          max: 3,
          step: -2
        });
        expect(objUT.value).toBe(0);
        expect(objUT.max).toBe(3);
        objUT.decrement();
        expect(objUT.value).toBe(2);
        objUT.decrement();
        expect(objUT.value).toBe(3);
      });
    });
  });

  describe("onValueChanged property", () => {
    interface OnValueChangedTestResults {
      wasInvoked: boolean,
      toArg?: number,
      fromArg?: number
    }

    function createObjectsForOnValueChangedTest(initialValue: number = 0) {
      const results: OnValueChangedTestResults = {
        wasInvoked: false
      };
    
      const objUT = createObjUnderTest({
        initialValue,
        onValueChanged: (to, from) => {
          results.wasInvoked = true;
          results.toArg = to;
          results.fromArg = from;
        }
      });
      return { objUT, results };
    }

    it("should be invoked when 'increment' method is called'", () => {
      const { objUT, results } = createObjectsForOnValueChangedTest();
      objUT.increment();
      expect(results.wasInvoked).toBe(true);
      expect(results.toArg).toBe(1);
      expect(results.fromArg).toBe(0);
    });

    it("should be invoked when 'decrement' method is called ", () => {
      const { objUT, results } = createObjectsForOnValueChangedTest();
      objUT.decrement();
      expect(results.wasInvoked).toBe(true);
      expect(results.toArg).toBe(-1);
      expect(results.fromArg).toBe(0);
    });

    it("should be invoked when 'value' property is set", () => {
      const { objUT, results } = createObjectsForOnValueChangedTest(3);
      objUT.value = 7;
      expect(results.wasInvoked).toBe(true);
      expect(results.toArg).toBe(7);
      expect(results.fromArg).toBe(3);
    });
  });

  describe('bind method', () => {
    it("can be used to bind an OpenRCT2 'SpinnerWidget' to the NumericSpinner, " +
       "such that changing its value updates the text of the SpinnerWidget", () => {
      const objUT = createObjUnderTest();
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
      const objUT = createObjUnderTest({
        step: 2,
      });
      expect(objUT.value).toBe(0);
      objUT.increment();
      expect(objUT.value).toBe(2);
    });

    test("that when it's 2, calling 'decrement' decreases 'value' property by 2", () => {
      const objUT = createObjUnderTest({
        step: 2,
      });
      expect(objUT.value).toBe(0);
      objUT.decrement();
      expect(objUT.value).toBe(-2);
      objUT.decrement();
      expect(objUT.value).toBe(-4);
    });

    test("that when it's 0.01, calling 'increment' increases 'value' property by 0.01", () => {
      const objUT = createObjUnderTest({
        step: 0.01,
      });
      expect(objUT.value).toBe(0);
      expect(objUT.step).toBe(0.01);
      objUT.increment();
      expect(objUT.value).toBe(0.01);
    });

    test("that when it's 0.01, calling 'decrement' decreases 'value' property by 0.01", () => {
      const objUT = createObjUnderTest({
        step: 0.01,
      });
      expect(objUT.value).toBe(0);
      objUT.decrement();
      expect(objUT.value).toBe(-0.01);
      objUT.decrement();
      expect(objUT.value).toBe(-0.02);
    });

    test("that negative step inverts increment/decrement behavior", () => {
      const objUT = createObjUnderTest({
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
