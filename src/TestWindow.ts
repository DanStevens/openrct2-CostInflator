import widgets from './widgets';

export default class TestWindow {
  constructor(private ui: Ui) { }

  private window?: Window;
  private spinner?: SpinnerWidget;
  private value: number = 0;

  open() {
    if (this.window == null) {
      this.window = this.ui.openWindow(this.windowDesc);
      this.spinner = this.window.findWidget("NumericSpinner");
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
      widgets.createNumericSpinner({
        x: 10,
        y: 20,
        height: 15,
        width: 60,
        name: "NumericSpinner"
      })
    ]
  };

  private updateSpinnerText() {
    if (this.spinner) this.spinner.text = this.value.toFixed(2);
  }
}
