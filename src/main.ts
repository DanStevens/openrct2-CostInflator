import settings from "./settings";
import { SettingsWindow } from "./ui";
import { handleUpkeepCalculate, handleIntervalDay } from "./handlers";

const main = (): void => {
  const settingsWindow = new SettingsWindow(ui, settings);
  ui.registerMenuItem("Cost Inflator", () => settingsWindow.open());

  if (settings.enabled) {
    console.log('Ride upkeep will be multiplied by', settings.rideUpkeepMultiplier);
    context.subscribe('ride.ratings.calculate', handleUpkeepCalculate);
    context.subscribe('interval.day', handleIntervalDay);
  }
};

export default main;
