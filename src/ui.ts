import widgets from "./widgets";

const standardControlHeight = 15;
const standardMargin = 5;

/* eslint-disable import/prefer-default-export */
export class SettingsWindow {
  constructor(private ui: Ui, public settings: Settings) {}

  private static readonly windowWidth = 200;
  private static readonly windowHeight = 180;
  private static readonly xStops = [5, 10, 15, 80, 130];
  private static readonly yStops = [20, 40, 58, 60, 110, 128, 130, 78, 80];

  private window?: Window;

  private rideUpkeepMultiplierSpinner = widgets.createNumericSpinner({
    name: "RideUpkeepMultiplierSpinner",
    x: SettingsWindow.xStops[3],
    y: SettingsWindow.yStops[2],
    width: SettingsWindow.xStops[4] - SettingsWindow.yStops[3],
    height: standardControlHeight,
    initialValue: this.settings.rideUpkeepMultiplier,
    formatValue: v => v.toFixed(2),
    min: 0,
    max: 99.99,
    step: 0.01,
    onValueChanged: to => {
      this.settings.rideUpkeepMultiplier = to;
      this.settings.save();
    },
    tooltip: "Multiplier for running costs (upkeep) of rides"
  });

  private stallUpkeepMultiplierSpinner = widgets.createNumericSpinner({
    name: "StallUpkeepMultiplierSpinner",
    x: SettingsWindow.xStops[3],
    y: SettingsWindow.yStops[5],
    width: SettingsWindow.xStops[4] - SettingsWindow.yStops[3],
    height: standardControlHeight,
    initialValue: this.settings.stallUpkeepMultiplier,
    formatValue: v => v.toFixed(2),
    min: 0,
    max: 99.99,
    step: 0.01,
    onValueChanged: to => {
      this.settings.stallUpkeepMultiplier = to;
      this.settings.save();
    },
    tooltip: "Multiplier for running costs (upkeep) of stalls and facilities"
  });
  
  private enabledCheckbox?: CheckboxWidget;

  open() {
    if (this.window == null) {
      this.window = this.ui.openWindow(this.windowDesc);
      this.rideUpkeepMultiplierSpinner.bind(this.window.findWidget(this.rideUpkeepMultiplierSpinner.name!));
      this.stallUpkeepMultiplierSpinner.bind(this.window.findWidget(this.stallUpkeepMultiplierSpinner.name!));
      this.enabledCheckbox = this.window.findWidget("EnabledCheckbox");
      this.enabledCheckbox.isChecked = this.settings.enabled;
    }

    this.window.bringToFront();
  }

  private readonly windowDesc: WindowDesc = {
    classification: "CostInflatorSettingsWindow",
    title: "Cost Inflator",
    width: SettingsWindow.windowWidth,
    height: SettingsWindow.windowHeight,
    onClose: () => this.window = undefined,
    widgets: [
      {
        name: "EnabledCheckbox",
        type: "checkbox",
        x: SettingsWindow.xStops[1],
        y: SettingsWindow.yStops[0],
        width: SettingsWindow.xStops[3] - SettingsWindow.xStops[2],
        height: standardControlHeight,
        text: "Enabled",
        isChecked: this.settings.enabled,
        onChange: (isChecked) => {
          this.settings.enabled = isChecked;
          this.settings.save();
        },
        tooltip: "Enables the plugin globally for the current park"
      },

      {
        name: "RideRunningCostsGroupbox",
        type: "groupbox",
        x: SettingsWindow.xStops[0],
        y: SettingsWindow.yStops[1],
        width: SettingsWindow.windowWidth - (standardMargin * 2),
        height: SettingsWindow.yStops[4] - SettingsWindow.yStops[1] - standardMargin,
        text: "Ride Running Costs",
      },
      {
        name: "RideRunningCostsMultiplierLabel",
        type: "label",
        x: SettingsWindow.xStops[2],
        y: SettingsWindow.yStops[3],
        width: SettingsWindow.xStops[3] - SettingsWindow.xStops[2],
        height: standardControlHeight,
        text: "Multiplier",
      },
      this.rideUpkeepMultiplierSpinner,

      {
        name: "StallRunningCostsGroupbox",
        type: "groupbox",
        x: SettingsWindow.xStops[0],
        y: SettingsWindow.yStops[4],
        width: SettingsWindow.windowWidth - (standardMargin * 2),
        height: SettingsWindow.yStops[6] - SettingsWindow.yStops[3] - standardMargin,
        text: "Stall Running Costs",
      },
      {
        name: "StallRunningCostsMultiplierLabel",
        type: "label",
        x: SettingsWindow.xStops[2],
        y: SettingsWindow.yStops[6],
        width: SettingsWindow.xStops[3] - SettingsWindow.xStops[2],
        height: standardControlHeight,
        text: "Multiplier",
      },
      this.stallUpkeepMultiplierSpinner,
    ]
  };
}
