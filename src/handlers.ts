/* eslint-disable import/prefer-default-export */
import settings from "./settings";
import { clamp } from "./utils";

/**
 * Calculates the running cost (upkeep) for the given ride, stall or facility
 * @param ride The ride/stall/facility to calculate running costs
 * @param multiplier the current running cost of the ride is multiplied by this
 * @returns the current running cost of the ride multiplied by `multiplier`
 */
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

/**
 * Gets the multiplier for the given RideClassification
 * @param classification the ride classification ('stall' and 'facility' are considered the same)
 * @returns the value of the corresponding Multiplier setting
 */
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

/**
 * Inflates the Multiplier setting by the corresponding Inflation setting
 * @param category The CostCategory
 * This function retrieves the Inflation setting corresponding with the given category and adds it
 * to the corresponding Multiplier setting
 * @note Multiplier setting won't go negative; zero is the minimum allowed value.
 */
function inflateMultiplier(category: CostCategory) {
  const inflation = settings[`${category}Inflation`];
  const multiplier = settings[`${category}Multiplier`];
  if (inflation !== 0 && multiplier !== 0) {
    settings[`${category}Multiplier`] = clamp(multiplier + inflation, 0, null);
    console.log(`${category} multipler inflated by ${inflation} to ${settings[`${category}Multiplier`]}`);
  }
}

/**
 * Invoked at the start of every ingame month
 */
function onMonthBegins() {
  if (settings.enabled) {
    inflateMultiplier('rideUpkeep');
    inflateMultiplier('stallUpkeep');
  }

  settings.save();
}

/**
 * Callback for 'ride.ratings.calculate' plugin API hook
 */
export function handleUpkeepCalculate(e: RideRatingsCalculateArgs): void {
  if (settings.enabled) {
    const ride = map.getRide(e.rideId);
    const multiplier = getMultiplierForRideClassification(ride.classification);
    ride.runningCost = calcUpkeep(ride, multiplier);
  } else {
    console.log("Cost Inflator is disabled");
  }
}

/**
 * Callback for 'inverval.day' plugin API hook
 */
export function handleIntervalDay(): void {
  if (date.monthProgress === 0)
    onMonthBegins();
}
