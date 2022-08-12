const parkStorage = context.getParkStorage();

class SettingsImpl implements Settings {
  constructor(source?: Settings) {
    if (source) {
      this.enabled = source.enabled;
      this.rideUpkeepMultiplier = source.rideUpkeepMultiplier;
      this.rideUpkeepInflation = source.rideUpkeepInflation;
      this.stallUpkeepMultiplier = source.stallUpkeepMultiplier;
    }
  }
  public enabled = true;
  public rideUpkeepMultiplier = 1.0;
  public rideUpkeepInflation = 0;
  public stallUpkeepMultiplier = 1.0;

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
