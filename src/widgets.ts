import { clamp, countDecimals, roundMultiple } from './utils';

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
  /** Optional function for converting the value to a string. Defaults to `v => v.toFixed(0)` */
  formatValue?: (v: number) => string;
  /**
   * Optional handler for when the widget is clicked. By default it displays a
   * text input dialog for user to type in a value.
   */
  onClick?: () => void;
}

class NumericSpinnerImpl implements NumericSpinner {
  private static readonly defaultStep = 1;

  constructor(recipe: NumericSpinnerRecipe) {
    const step = recipe.step ?? NumericSpinnerImpl.defaultStep;

    if (step === 0 || !Number.isFinite(step))
      throw new Error("step must be a finite value not equal to 0");

    this.x = recipe.x;
    this.y = recipe.y;
    this.height = recipe.height;
    this.width = recipe.width;
    this.name = recipe.name;
    this.step = step;
    this.min = recipe.min;
    this.max = recipe.max;
    this.value = recipe.initialValue ?? 0;
    this.formatValue = recipe.formatValue;
    this.tooltip = recipe.tooltip;
    this.isDisabled = recipe.isDisabled;
    this.isVisible = recipe.isVisible;
    this.onValueChanged = recipe.onValueChanged;
    this.onClick = recipe.onClick ?? this.defaultOnClickHandler.bind(this);
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
  public formatValue?: (v: number) => string;

  private _value: number = 0;
  private _boundSpinner?: SpinnerWidget;

  window?: Window;
  tooltip?: string;
  isDisabled?: boolean;
  isVisible?: boolean;

  onIncrement?: (() => void) = () => this.increment();
  onDecrement?: (() => void) = () => this.decrement();
  onClick: (() => void);
  onValueChanged?: (to: number, from: number) => void;

  get value() {
    return this._value;
  }

  set value(to) {
    const from = this._value;
    const roundedTo = roundMultiple(to, this.step);
    const clampedTo = clamp(roundedTo, this.min, this.max);
    this._value = clampedTo;
    this.syncBoundSpinner();
    if (clampedTo !== from) this.invokeValueChanged(clampedTo, from);
  }

  private syncBoundSpinner() {
    if (this._boundSpinner)
      this._boundSpinner.text = this.toString();
  }

  increment() {
    this.value += this.step;
  }

  decrement() {
    this.value -= this.step;
  }

  bind(spinner: SpinnerWidget) {
    this._boundSpinner = spinner;
    this.syncBoundSpinner();
  }

  toString() {
    return this.formatValue ?
      this.formatValue(this.value) :
      this.value.toFixed(countDecimals(this.step ?? NumericSpinnerImpl.defaultStep));
  }

  private invokeValueChanged(to: number, from: number) {
    if (typeof this.onValueChanged === 'function')
      this.onValueChanged(to, from);
  }

  private defaultOnClickHandler() {
    const valueAsString = this._value.toString();
    ui.showTextInput({
      title: "Enter new value",
      description: "Enter new value",
      initialValue: valueAsString,
      callback: value => {
        const num = +value;
        if (Number.isFinite(num)) this.value = +value;
      }
    });
  }
}

/** Static factory for creating specialised widgets */
export default abstract class WidgetFactory {
  static createNumericSpinner(desc: NumericSpinnerRecipe): NumericSpinner {
    return new NumericSpinnerImpl(desc);
  }
}
