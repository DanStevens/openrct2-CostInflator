import widgets, { NumericSpinner, NumericSpinnerImpl } from '../src/widgets';

describe("WidgetFactory", () => {
  test("creating NumericSpinner", () => {
    const numericSpinner: NumericSpinner = widgets.createNumericSpinner({
      x: 0,
      y: 0,
      width: 0,
      height: 0
    });
    expect(numericSpinner).toBeInstanceOf(NumericSpinnerImpl);
  });
});
