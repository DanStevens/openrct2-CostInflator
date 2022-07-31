import TestWindow from "./TestWindow";

export default function main() {
  console.log('CostInflator plug-in has started');

  const testWindow = new TestWindow(ui);
  ui.registerMenuItem("Test Window", () => testWindow.open());
}
