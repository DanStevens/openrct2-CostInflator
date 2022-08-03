/* eslint-disable import/prefer-default-export */
import settings from "./settings";

function calcUpkeep(ride: Ride, multiplier: number) {
  if (ride.runningCost > 0) {
    const newUpkeep = +(ride.runningCost * multiplier).toFixed(2);
    console.log(`Setting upkeep of ride ${ride.id} to ` +
      `${ride.runningCost} * ${settings.rideUpkeepMultiplier.toFixed(2)} = ${newUpkeep}`);
    return newUpkeep;
  }

  console.log(`Warning: Somehow ride runningCost of ride ${ride.id} (${ride.runningCost}) is negative!`);
  return ride.runningCost;
}

export function handleUpkeepCalculate(e: RideRatingsCalculateArgs): void {
  if (settings.enabled) {
    const ride = map.getRide(e.rideId);
    if (ride.classification === "ride")
      ride.runningCost = calcUpkeep(ride, settings.rideUpkeepMultiplier);
  } else {
    console.log("Cost Inflator is disabled");
  }
}
