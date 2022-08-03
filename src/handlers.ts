/* eslint-disable import/prefer-default-export */
import settings from "./settings";

function calcUpkeep(ride: Ride, multiplier: number) {
  if (ride.runningCost > 0) {
    const newUpkeep = +(ride.runningCost * multiplier).toFixed(2);
    console.log(`Setting upkeep of ${ride.classification} ${ride.id} to ` +
      `${ride.runningCost} * ${multiplier.toFixed(2)} = ${newUpkeep}`);
    return newUpkeep;
  }

  console.log(`Warning: Somehow ride runningCost of ride ${ride.id} (${ride.runningCost}) is negative!`);
  return ride.runningCost;
}

function getMultiplierForRideClassification(classification: RideClassification): number {
  switch (classification) {
    case "ride":
      return settings.rideUpkeepMultiplier;
    case "stall":
    case "facility":
      return settings.stallUpkeepMultiplier;
    default:
      return 1.0;
  }
}

export function handleUpkeepCalculate(e: RideRatingsCalculateArgs): void {
  if (settings.enabled) {
    const ride = map.getRide(e.rideId);
    const multiplier = getMultiplierForRideClassification(ride.classification);
    ride.runningCost = calcUpkeep(ride, multiplier);
  } else {
    console.log("Cost Inflator is disabled");
  }
}
