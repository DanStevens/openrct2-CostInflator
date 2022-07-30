import { decrement, increment } from "./util";

/* eslint-disable no-return-assign */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
/* eslint-disable array-bracket-spacing */
export class SettingsWindow {
  constructor(private ui: Ui, public settings: Settings) {}

  private window?: Window;
  private rideUpkeepMultiplierSpinner;
  private enabledCheckbox;

  open() {
    if (this.window == null) {
      this.window = this.ui.openWindow(this.windowDesc);
      this.rideUpkeepMultiplierSpinner = this.window.findWidget("RideUpkeepMultiplierValue");
      this.enabledCheckbox = this.window.findWidget("EnabledCheckbox");
      this.syncWithSettings();
    }

    this.window.bringToFront();
  }

  private readonly windowDesc: WindowDesc = {
    classification: "CostInflatorSettingsWindow",
    title: "Cost Inflator",
    width: 200,
    height: 90,
    onClose: () => this.window = null,
    widgets: [
      {
        name: "EnabledCheckbox",
        type: "checkbox",
        x: 10,
        y: 20,
        width: 60,
        height: 15,
        text: "Enabled",
        isChecked: this.settings.enabled,
        onChange: (isChecked) => this.settings.enabled = isChecked,
      },
      {
        name: "RideRunningCostsGroupbox",
        type: "groupbox",
        x: 5,
        y: 40,
        width: 190,
        height: 45,
        text: "Ride Running Costs",
      },
      {
        name: "MultiplierLabel",
        type: "label",
        x: 15,
        y: 60,
        width: 60,
        height: 15,
        text: "Multiplier",
      },
      {
        name: "RideUpkeepMultiplierValue",
        type: "spinner",
        x: 80,
        y: 58,
        width: 70,
        height: 15,
        text: this.settings.rideUpkeepMultiplier.toFixed(2),
        onIncrement: () => {
          if (this.settings.rideUpkeepMultiplier < 99.99)
            this.settings.rideUpkeepMultiplier =
              increment(this.settings.rideUpkeepMultiplier, 0.01);
          this.syncWithSettings();
        },
        onDecrement: () => {
          if (this.settings.rideUpkeepMultiplier > 0)
            this.settings.rideUpkeepMultiplier =
              decrement(this.settings.rideUpkeepMultiplier, 0.01);
          this.syncWithSettings();
        },
        onClick: () => {
          this.ui.showTextInput({
            title: "Enter new value",
            description: "Enter new value",
            initialValue: this.rideUpkeepMultiplierSpinner.text,
            callback: value => {
              const num = parseFloat(value);
              this.settings.rideUpkeepMultiplier =
                num < 0 ? 0 : (num > 99.99 ? 99.99 : num);
              this.syncWithSettings();
            },
          });
        }
      }
    ]
  };

  private syncWithSettings() {
    this.enabledCheckbox.isChecked = this.settings.enabled;
    this.rideUpkeepMultiplierSpinner.text = this.settings.rideUpkeepMultiplier.toFixed(2);
  }
}

export class TestWindow {
  constructor(private ui: Ui) {}

  private window?: Window;
  private spinner;

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
    onClose: () => this.window = null,
    widgets: [
      {
        name: "Spinner",
        type: 'spinner',
        x: 10,
        y: 20,
        width: 60,
        height: 15,
        onIncrement: () => {},
        onDecrement: () => {},
        onClick: () => {}
      }
    ]
  }
}
