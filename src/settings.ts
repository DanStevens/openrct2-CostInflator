/**
 * A cost (expense) in RCT that varies depending on the associate object.
 * Examples include ride construction, upkeep and landscaping
 */
// eslint-disable-next-line no-shadow
export const VariableCostCategories = [
  'ride_construction',
  'stall_construction'
] as const;

const parkStorage = context.getParkStorage();

class SettingsImpl implements Settings {
  constructor(source?: Settings) {
    if (source) {
      this.enabled = source.enabled ?? this.enabled;

      // eslint-disable-next-line guard-for-in
      VariableCostCategories.forEach(c => {
        console.log('c => ', c);
        this.multipliers[c] = source.multipliers[c] ?? this.multipliers[c] ?? 1;
        this.inflators[c] = source.inflators[c] ?? this.inflators[c] ?? 0;
      });
    }
  }

  public enabled = true;
  public multipliers = {} as { [category in VariableCostCategory]: number };
  public inflators = {} as { [category in VariableCostCategory]: number };

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
