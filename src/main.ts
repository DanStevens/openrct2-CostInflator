const main = (): void => {
  const enabled = true;
  const rideUpkeepMultiplier = 2.0;

  const handleUpkeepCalculate = (e: RideRatingsCalculateArgs): void => {
    if (enabled) {
      const ride = map.getRide(e.rideId);
      const newUpkeep = ride.runningCost * rideUpkeepMultiplier;
      console.log(`Setting upkeep of ride ${ride.id} to ${newUpkeep}`);
      ride.runningCost = newUpkeep;
    }
  };

  if (enabled) {
    console.log('Ride upkeep will be multiplied by', rideUpkeepMultiplier);
    context.subscribe('ride.ratings.calculate', handleUpkeepCalculate);
  }
};

export default main;
