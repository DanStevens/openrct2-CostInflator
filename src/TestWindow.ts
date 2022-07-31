import { NumericSpinnerImpl } from './widgets';

export default class TestWindow {
  constructor(private ui: Ui) { }

  private readonly numericSpinner = new NumericSpinnerImpl({
    x: 10,
    y: 20,
    height: 15,
    width: 60,
    name: "NumericSpinner",
    onValueChanged: to => {
      this.value = to;
      console.log('TestWindow.value', this.value);
    },
  });

  private window?: Window;
  private value: number = 0;

  open() {
    if (this.window == null) {
      this.window = this.ui.openWindow(this.windowDesc);
      this.numericSpinner.bind(this.window.findWidget("NumericSpinner"));
    }

    this.window.bringToFront();
  }

  private readonly windowDesc: WindowDesc = {
    classification: "CostInflatorTestWindow",
    title: "Title",
    width: 200,
    height: 90,
    onClose: () => this.window = undefined,
    widgets: [
      this.numericSpinner
    ]
  };
}
