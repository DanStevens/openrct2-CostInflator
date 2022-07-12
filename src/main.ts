import { SettingsWindow } from "./ui";

const defaultSettings: Settings = {
  enabled: true,
  rideUpkeepMultiplier: 1.0
};

const main = (): void => {
  const settings = defaultSettings;
  const settingsWindow = new SettingsWindow(ui, settings);
  
  ui.registerMenuItem("Cost Inflator", () => settingsWindow.open());

  const handleUpkeepCalculate = (e: RideRatingsCalculateArgs): void => {
    if (settings.enabled) {
      const ride = map.getRide(e.rideId);
      const newUpkeep = +(ride.runningCost * settings.rideUpkeepMultiplier).toFixed(2);
      console.log(`Setting upkeep of ride ${ride.id} to ` +
                  `${ride.runningCost} * ${settings.rideUpkeepMultiplier} = ${newUpkeep}`);
      ride.runningCost = newUpkeep;
    } else {
      console.log("Cost Inflator is disabled");
    }
  };

  if (settings.enabled) {
    console.log('Ride upkeep will be multiplied by', settings.rideUpkeepMultiplier);
    context.subscribe('ride.ratings.calculate', handleUpkeepCalculate);
  }
};

export default main;
