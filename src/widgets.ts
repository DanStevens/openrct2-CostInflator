import { clamp } from './utils';

/**
 * The NumericSpinner widget is a SpinnerWidget that handles numbers for you
 */
export interface NumericSpinner extends Omit<SpinnerWidget, 'text'> {
  /** Get or set the current value of the NumericSpinner */
  value: number;
  /** Get or set the value  to increment or decrement the value by */
  step: number;
  /** Get or set the minimum value allowed */
  min?: number;
  /** Get or set the maximum value allowed */
  max?: number;
  /**
   * Bind the NumericSpinner widget to the given OpenRCT2 SpinnerWidget, such that
   * when the value changes, the text of the SpinnerWidget is updated
   */
  bind(spinner: SpinnerWidget): void;
  /**
   * Returns the value of the NumericSpinner, formatted as a string
   */
  toString(): string;
  /** Increments the value of the NumericSpinner by one step */
  increment(): void;
  /** Decrements the value of the NumericSpinner by one step */
  decrement(): void;
}

/**
 * Object for specifying the creation of @see NumericSpinner widgets
 */
export interface NumericSpinnerRecipe extends Omit<WidgetBase, 'type'> {
  /** Optional initial value of the NumericSpinner widget. Default is 0. */
  initialValue?: number;
  /**
   * Optional callback that is invoked when the value is changed, either programmatically
   * or when the increment/decrement spinner buttons are clicked by the user
   */
  onValueChanged?: (to: number, from: number) => void;
  /** Optional value to increment or decrement the value by. Defaults to 1 */
  step?: number
  /** Optional minimum allowed value */
  min?: number
  /** Optional maximum allowed value */
  max?: number
}

class NumericSpinnerImpl implements NumericSpinner {
  constructor(recipe: NumericSpinnerRecipe) {
    this.x = recipe.x;
    this.y = recipe.y;
    this.height = recipe.height;
    this.width = recipe.width;
    this.name = recipe.name;
    this.value = recipe.initialValue ?? 0;
    this.onValueChanged = recipe.onValueChanged;
    this.step = recipe.step ?? 1;
    this.min = recipe.min;
    this.max = recipe.max;
  }

  readonly type = "spinner";
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public name?: string;
  public step: number;
  public min?: number;
  public max?: number;

  private _value: number = 0;
  private _boundSpinner?: SpinnerWidget;

  text?: string = this.toString();
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
    if (this._boundSpinner) this._boundSpinner.text = this.toString();
    this.invokeValueChanged(to, from);
  }

  increment() {
    this.value = clamp(this.value + this.step, this.min, this.max);
  }

  decrement() {
    this.value = clamp(this.value - this.step, this.min, this.max);
  }

  bind(spinner: SpinnerWidget) {
    this._boundSpinner = spinner;
  }

  toString() {
    return this._value.toFixed(2);
  }

  private invokeValueChanged(to: number, from: number) {
    if (typeof this.onValueChanged === 'function')
      this.onValueChanged(to, from);
  }
}

/** Static factory for creating specialised widgets */
export default abstract class WidgetFactory {
  static createNumericSpinner(desc: NumericSpinnerRecipe): NumericSpinner {
    return new NumericSpinnerImpl(desc);
  }
}
