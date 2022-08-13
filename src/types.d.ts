/**
 * Settings for the Cost Inflator plugin
 */
interface Settings {
  /** Enables/disables the plugin globally for the current park */
  enabled: boolean,
  /** Multiplier for running costs (upkeep) of rides */
  rideUpkeepMultiplier: number,
  /** Multiplier for running costs (upkeep) of rides is increased by this amount every month */
  rideUpkeepInflation: number,
  /** Multiplier for running costs (upkeep) of stalls and facilities */
  stallUpkeepMultiplier: number,
  /** Multiplier for running costs (upkeep) of stalls and facilities is increased by this amount every month */
  stallUpkeepInflation: number,

  /** Callback that is invoked when settings are saved */
  onSaved?: () => void
  /** Saves settings to the park */
  save(): void
}

type CostCategory = 'rideUpkeep' | 'stallUpkeep'
