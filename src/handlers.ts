/* eslint-disable import/prefer-default-export */
import settings from "./settings";

export function handleUpkeepCalculate(e: RideRatingsCalculateArgs): void {
  if (settings.enabled) {
    const ride = map.getRide(e.rideId);
    if (ride.runningCost > 0) {
      const newUpkeep = +(ride.runningCost * settings.rideUpkeepMultiplier).toFixed(2);
      console.log(`Setting upkeep of ride ${ride.id} to ` +
        `${ride.runningCost} * ${settings.rideUpkeepMultiplier.toFixed(2)} = ${newUpkeep}`);
      ride.runningCost = newUpkeep;
    } else {
      console.log(`Warning: Somehow ride runningCost of ride ${ride.id} (${ride.runningCost}) is negative!`);
    }
  } else {
    console.log("Cost Inflator is disabled");
  }
}
