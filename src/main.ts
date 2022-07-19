import { SettingsWindow } from "./ui";

const defaultSettings: Settings = {
  enabled: true,
  rideUpkeepMultiplier: 1.0
};

const main = (): void => {
  const parkStorage = context.getParkStorage();
  const settings = parkStorage.get("settings", defaultSettings);
  parkStorage.set("settings", settings);
  console.log("settings", settings);

  const settingsWindow = new SettingsWindow(ui, settings);
  ui.registerMenuItem("Cost Inflator", () => settingsWindow.open());

  const handleUpkeepCalculate = (e: RideRatingsCalculateArgs): void => {
    if (settings.enabled) {
      const ride = map.getRide(e.rideId);
      if (ride.runningCost > 0) {
        const newUpkeep = +(ride.runningCost * settings.rideUpkeepMultiplier).toFixed(2);
        console.log(`Setting upkeep of ride ${ride.id} to ` +
                    `${ride.runningCost} * ${settings.rideUpkeepMultiplier} = ${newUpkeep}`);
        ride.runningCost = newUpkeep;
      } else {
        console.log(`Warning: Somehow ride runningCost of ride ${ride.id} (${ride.runningCost}) is negative!`);
      }
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
