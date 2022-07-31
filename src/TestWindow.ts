export default class TestWindow {
  constructor(private ui: Ui) { }

  private window?: Window;
  private spinner?: SpinnerWidget;
  private value: number = 0;

  open() {
    if (this.window == null) {
      this.window = this.ui.openWindow(this.windowDesc);
      this.spinner = this.window.findWidget("Spinner");
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
      {
        name: "Spinner",
        type: 'spinner',
        x: 10,
        y: 20,
        width: 60,
        height: 15,
        text: this.value.toFixed(2),
        onIncrement: () => {
          this.value += 1;
          this.updateSpinnerText();
        },
        onDecrement: () => {
          this.value -= 1;
          this.updateSpinnerText();
        },
        onClick: () => { }
      }
    ]
  };

  private updateSpinnerText() {
    if (this.spinner) this.spinner.text = this.value.toFixed(2);
  }
}
