export interface NumericSpinner extends Omit<WidgetBase, 'type'> {
  value?: number;
  onValueChanged?: (to: number, from: number) => void;
}

export class NumericSpinnerImpl implements SpinnerWidget {
  constructor(desc: NumericSpinner) {
    this.x = desc.x;
    this.y = desc.y;
    this.height = desc.height;
    this.width = desc.width;
    this.name = desc.name;
    this.value = desc.value ?? 0;
    this.onValueChanged = desc.onValueChanged;
  }

  readonly type = "spinner";
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public name?: string;
  private _value: number = 0;

  text?: string = this.value.toFixed(2);
  window?: Window;
  tooltip?: string;
  isDisabled?: boolean;
  isVisible?: boolean;

  onIncrement?: (() => void) = () => this.increment();
  onDecrement?: (() => void) = () => this.decrement();
  onClick?: (() => void);
  onValueChanged?: (to: number, from: number) => void;

  get value() {
    return this._value;
  }

  set value(to) {
    const from = this._value;
    this._value = to;
    this.text = this._value.toFixed(2);
    this.invokeValueChanged(to, from);
  }

  increment() {
    this.value += 1;
  }

  decrement() {
    this.value -= 1;
  }

  private invokeValueChanged(to: number, from: number) {
    if (typeof this.onValueChanged === 'function')
      this.onValueChanged(to, from);
  }
}

export default abstract class WidgetFactory {
  static createNumericSpinner(desc: NumericSpinner): SpinnerWidget {
    return new NumericSpinnerImpl(desc);
  }
}
