/**
 * Settings for the Cost Inflator plugin
 */
interface Settings {
  /** Whether or not the plugins effects are enabled globally */
  enabled: boolean,
  /** Running costs (upkeep) for rides is multiplied by this */
  rideUpkeepMultiplier: number,
  /** Saves settings to the park */
  save(): void
}
