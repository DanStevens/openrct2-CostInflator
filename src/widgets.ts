/* eslint-disable import/prefer-default-export */
export class NumericSpinner implements SpinnerWidget {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public name?: string,
  ) { }
  readonly type = "spinner";
  private _value: number = 0;

  text?: string | undefined = this.value.toFixed(2);
  window?: Window | undefined;
  tooltip?: string | undefined;
  isDisabled?: boolean | undefined;
  isVisible?: boolean | undefined;

  onIncrement?: (() => void) | undefined = () => this.increment();
  onDecrement?: (() => void) | undefined = () => this.decrement();
  onClick?: (() => void) | undefined;

  get value() {
    return this._value;
  }

  set value(v) {
    this._value = v;
    this.text = this._value.toFixed(2);
  }

  increment() {
    this.value += 1;
  }

  decrement() {
    this.value -= 1;
  }
}
