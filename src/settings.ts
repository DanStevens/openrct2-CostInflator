/**
 * A cost (expense) in RCT that varies depending on the associate object.
 * Examples include ride construction, upkeep and landscaping
 */
// eslint-disable-next-line no-shadow
// Costs (exenditure types) that vary depending on what is being costed
export const VariableCostCategories = [
  'ride_construction',
  'stall_construction',
  'landscaping',
  'shop_stock',
  'food_drink_stock',
  'interest_rate',
];

// Costs (expenditure types) that are constant per unit
export const ConstantCostCategories = [
  'land_purchase',
  'construction_rights_purchase',
  'wages_handyman',
  'wages_mechanic',
  'wages_security_guard',
  'wages_entertainer',
  'marketing_vouchers',
  'marketing_ride_advertising',
  'marketing_park_advertising',
  'research_minimum',
  'research_normal',
  'research_maximum',
];

const parkStorage = context.getParkStorage();

class SettingsImpl implements Settings {
  constructor(source?: Settings) {
    if (source) {
      this.enabled = source.enabled ?? true;

      // eslint-disable-next-line guard-for-in
      // Initialize the settings object, either by copying the same setting from the given
      // source argument, if defined, otherwise a default
      VariableCostCategories.forEach(c => {
        // Multipliers default to 1 and inflators default to 0
        this.multipliers[c] = source.multipliers[c] ?? 1;
        this.inflators[c] = source.inflators[c] ?? 0;
      });

      ConstantCostCategories.forEach(c => {
        this.inflators[c] = source.inflators[c] ?? 0;
      });

      // Constant costs default to their in-game values (currency values are x10
      // their in-game displayed value)
      this.constants.land_purchase = source.constants.land_purchase ?? 200;
      this.constants.construction_rights_purchase = source.constants.construction_rights_purchase ?? 200;
      this.constants.wages_handyman = source.constants.wages_handyman ?? 500;
      this.constants.wages_mechanic = source.constants.wages_mechanic ?? 800;
      this.constants.wages_security_guard = source.constants.wages_security_guard ?? 600;
      this.constants.wages_entertainer = source.constants.wages_entertainer ?? 550;
      this.constants.marketing_vouchers = source.constants.marketing_vouchers ?? 500;
      this.constants.marketing_ride_advertising = source.constants.marketing_ride_advertising ?? 2000;
      this.constants.marketing_park_advertising = source.constants.marketing_park_advertising ?? 3500;
      this.constants.research_minimum = source.constants.research_minimum ?? 1000;
      this.constants.research_normal = source.constants.research_normal ?? 2000;
      this.constants.research_maximum = source.constants.research_maximum ?? 4000;
    }
  }

  public enabled = true;
  public multipliers = {} as { [category in VariableCostCategory]: number };
  public constants = {} as { [category in ConstantCostCategory]: number };
  public inflators = {} as { [category in CostCategory]: number };

  public onSaved?: () => void;

  // Flag that prevents re-entry to the `save` method, which may happen
  // if the `onSaved` callback does something that triggers a save
  private suspendSave = false;

  public save() {
    if (this.suspendSave)
      return;

    parkStorage.set("settings", this);
    console.log("Settings saved");
    
    if (this.onSaved) {
      try {
        this.onSaved();
      } finally {
        this.suspendSave = false;
      }
    }
  }
}

function load(): Settings {
  const settings = new SettingsImpl(parkStorage.get("settings", new SettingsImpl()));
  console.log('loaded settings', settings);
  settings.save();
  return settings;
}

const settings: Settings = load();
export default settings;
