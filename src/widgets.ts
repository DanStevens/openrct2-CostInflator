/**
 * Creates custom widgets
 */
export default abstract class WidgetFactory {
  static createMultiplier(desc: MultiplierWidget): Widget {
    return {
      name: desc.name,
      type: "spinner",
      x: desc.x,
      y: desc.y,
      width: desc.width,
      height: desc.height,
      text: desc.text,
      tooltip: desc.tooltip,
      isDisabled: desc.isDisabled,
      isVisible: desc.isVisible,
      onIncrement: desc.onIncrement,
      onDecrement: desc.onDecrement,
      onClick: desc.onClick,
    };
  }
}

interface MultiplierWidget extends Omit<SpinnerWidget, 'type'> {
}
