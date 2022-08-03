/**
 * Settings for the Cost Inflator plugin
 */
interface Settings {
  /** Whether or not the plugins effects are enabled globally */
  enabled: boolean,
  /** Ride running costs (upkeep) is multiplied by this */
  rideUpkeepMultiplier: number,
  /** Saves settings to the park */
  save(): void
}
