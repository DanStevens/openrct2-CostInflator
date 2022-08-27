type VariableCostCategory = (typeof VariableCostCategories)[number];

/**
 * Settings for the Cost Inflator plugin
 */
interface Settings {
  /** Enables/disables the plugin globally for the current park */
  enabled: boolean,

  multipliers: { [category in VariableCostCategory]: number }
  inflators: { [category in VariableCostCategory]: number }

  /** Callback that is invoked when settings are saved */
  onSaved?: () => void
  /** Saves settings to the park */
  save(): void
}

/**
 * The rating metrics for a ride
 */
interface RideRating {
  excitement: number,
  intensity: number,
  nausea: number,
}
