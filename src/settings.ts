const parkStorage = context.getParkStorage();

class SettingsImpl implements Settings {
  constructor(source?: Settings) {
    if (source) {
      this.enabled = source.enabled;
      this.rideUpkeepMultiplier = source.rideUpkeepMultiplier;
    }
  }
  public enabled = true;
  public rideUpkeepMultiplier = 1.0;
  public save() {
    parkStorage.set("settings", this);
  }
}

function load(): Settings {
  const settings = new SettingsImpl(parkStorage.get("settings", new SettingsImpl()));
  settings.save();
  return settings;
}

const settings: Settings = load();
export default settings;
