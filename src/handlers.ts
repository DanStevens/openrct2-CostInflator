import settings, { VariableCostCategories } from "./settings";
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
      return settings.multipliers.ride_construction;
    case "stall":
    case "facility":
      return settings.multipliers.stall_construction;
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
function inflateMultiplier(category: VariableCostCategory) {
  const multiplier = settings.multipliers[category];
  const inflation = settings.inflators[category];
  if (inflation !== 0 && multiplier !== 0) {
    settings.multipliers[category] = clamp(multiplier + inflation, 0, null);
    console.log(`${category} multipler inflated by ${inflation} to ${settings.multipliers[category]}`);
  }
}

/**
 * Invoked at the start of every ingame month
 */
function onMonthBegins() {
  if (settings.enabled) {
    Object.keys(VariableCostCategories).forEach(
      category => inflateMultiplier(category as VariableCostCategory)
    );
  }

  settings.save();
}

/**
 * Returns a value indicating whether the given RideRating is valid
 * @param rating The ride stats to test
 * @returns `true` if the ride stats are valid; otherwise false
 *
 * RideRating is valid if all of its metrics are greater than zero.
 * Within the game, a ride's rating can be invalid if it is yet
 * to be calculated or are in the process of being calculated.
 */
function isRideRatingValid(rating: RideRating) {
  return rating.excitement > 0 && rating.intensity > 0 && rating.nausea;
}

/**
 * Callback for 'ride.ratings.calculate' plugin API hook
 */
export function handleUpkeepCalculate(e: RideRatingsCalculateArgs): void {
  if (settings.enabled && isRideRatingValid(e)) {
    const ride = map.getRide(e.rideId);
    const multiplier = getMultiplierForRideClassification(ride.classification);
    ride.runningCost = calcUpkeep(ride, multiplier);
  }
}

/**
 * Callback for 'inverval.day' plugin API hook
 */
export function handleIntervalDay(): void {
  if (date.monthProgress === 0)
    onMonthBegins();
}
