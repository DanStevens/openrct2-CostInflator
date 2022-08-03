import widgets from "./widgets";

/* eslint-disable import/prefer-default-export */
export class SettingsWindow {
  constructor(private ui: Ui, public settings: Settings) {}

  private window?: Window;

  private rideUpkeepMultiplierSpinner = widgets.createNumericSpinner({
    name: "RideUpkeepMultiplierSpinner",
    x: 80,
    y: 58,
    width: 70,
    height: 15,
    initialValue: this.settings.rideUpkeepMultiplier,
    formatValue: v => v.toFixed(2),
    min: 0,
    max: 99.99,
    step: 0.01,
    onValueChanged: to => {
      this.settings.rideUpkeepMultiplier = to;
      this.settings.save();
    },
  });
  
  private enabledCheckbox?: CheckboxWidget;

  open() {
    if (this.window == null) {
      this.window = this.ui.openWindow(this.windowDesc);
      this.rideUpkeepMultiplierSpinner.bind(this.window.findWidget(this.rideUpkeepMultiplierSpinner.name!));
      this.enabledCheckbox = this.window.findWidget("EnabledCheckbox");
      this.enabledCheckbox.isChecked = this.settings.enabled;
    }

    this.window.bringToFront();
  }

  private readonly windowDesc: WindowDesc = {
    classification: "CostInflatorSettingsWindow",
    title: "Cost Inflator",
    width: 200,
    height: 90,
    onClose: () => this.window = undefined,
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
        onChange: (isChecked) => {
          this.settings.enabled = isChecked;
          this.settings.save();
        },
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
      this.rideUpkeepMultiplierSpinner
    ]
  };
}
