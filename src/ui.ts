import widgets from "./widgets";

const standardControlHeight = 15;
const standardMargin = 5;

/* eslint-disable import/prefer-default-export */
export class SettingsWindow {
  constructor(private ui: Ui, public settings: Settings) {}

  private static readonly windowWidth = 200;
  private static readonly windowHeight = 180;
  private static readonly xStops = [5, 10, 15, 80, 130];
  private static readonly yStops = [20, 40, 58, 60, 110, 128, 130, 80, 82, 150, 152];

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

  private rideUpkeepInflationSpinner = widgets.createNumericSpinner({
    name: "RideUpkeepInflationSpinner",
    x: SettingsWindow.xStops[3],
    y: SettingsWindow.yStops[7],
    width: SettingsWindow.xStops[4] - SettingsWindow.yStops[3],
    height: standardControlHeight,
    initialValue: this.settings.rideUpkeepInflation,
    formatValue: v => v.toFixed(2),
    min: -99.99,
    max: 99.99,
    step: 0.01,
    onValueChanged: to => {
      console.log("Setting ride upkeep inflation to", to);
      this.settings.rideUpkeepInflation = to;
      this.settings.save();
    },
    tooltip: "Monthly inflation of ride running costs: once per month this value is added to the multiplier for ride running costs"
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

  private stallUpkeepInflationSpinner = widgets.createNumericSpinner({
    name: "StallUpkeepInflationSpinner",
    x: SettingsWindow.xStops[3],
    y: SettingsWindow.yStops[9],
    width: SettingsWindow.xStops[4] - SettingsWindow.yStops[3],
    height: standardControlHeight,
    initialValue: this.settings.stallUpkeepInflation,
    formatValue: v => v.toFixed(2),
    min: -99.99,
    max: 99.99,
    step: 0.01,
    onValueChanged: to => {
      console.log("Setting stall upkeep inflation to", to);
      this.settings.stallUpkeepInflation = to;
      this.settings.save();
    },
    tooltip: "Monthly inflation of stall running costs: once per month this value is added to the multiplier for stall running costs"
  });

  private enabledCheckbox?: CheckboxWidget;

  open() {
    if (this.window == null) {
      this.window = this.ui.openWindow(this.windowDesc);
      this.rideUpkeepMultiplierSpinner.bind(this.window.findWidget(this.rideUpkeepMultiplierSpinner.name!));
      this.rideUpkeepInflationSpinner.bind(this.window.findWidget(this.rideUpkeepInflationSpinner.name!));
      this.stallUpkeepMultiplierSpinner.bind(this.window.findWidget(this.stallUpkeepMultiplierSpinner.name!));
      this.stallUpkeepInflationSpinner.bind(this.window.findWidget(this.stallUpkeepInflationSpinner.name!));
      this.enabledCheckbox = this.window.findWidget("EnabledCheckbox");
      this.enabledCheckbox.isChecked = this.settings.enabled;
      
      this.syncWithSettings();
      this.settings.onSaved = this.syncWithSettings.bind(this);
    }

    this.window.bringToFront();
  }

  private readonly windowDesc: WindowDesc = {
    classification: "CostInflatorSettingsWindow",
    title: "Cost Inflator",
    width: SettingsWindow.windowWidth,
    height: SettingsWindow.windowHeight,
    onClose: () => {
      this.settings.onSaved = undefined;
      this.window = undefined;
    },
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
        tooltip: this.rideUpkeepMultiplierSpinner.tooltip,
      },
      this.rideUpkeepMultiplierSpinner,
      {
        name: "RideRunningCostsInflationLabel",
        type: "label",
        x: SettingsWindow.xStops[2],
        y: SettingsWindow.yStops[8],
        width: SettingsWindow.xStops[3] - SettingsWindow.xStops[2],
        height: standardControlHeight,
        text: "Inflation",
        tooltip: this.rideUpkeepInflationSpinner.tooltip,
      },
      this.rideUpkeepInflationSpinner,

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
        tooltip: this.stallUpkeepMultiplierSpinner.tooltip,
      },
      this.stallUpkeepMultiplierSpinner,
      {
        name: "StallRunningCostsInflationLabel",
        type: "label",
        x: SettingsWindow.xStops[2],
        y: SettingsWindow.yStops[10],
        width: SettingsWindow.xStops[3] - SettingsWindow.xStops[2],
        height: standardControlHeight,
        text: "Inflation",
        tooltip: this.stallUpkeepInflationSpinner.tooltip,
      },
      this.stallUpkeepInflationSpinner,
    ]
  };

  private syncWithSettings() {
    this.rideUpkeepMultiplierSpinner.value = this.settings.rideUpkeepMultiplier;
    this.rideUpkeepInflationSpinner.value = this.settings.rideUpkeepInflation;
    this.stallUpkeepMultiplierSpinner.value = this.settings.stallUpkeepMultiplier;
    this.stallUpkeepInflationSpinner.value = this.settings.stallUpkeepInflation;
  }
}
