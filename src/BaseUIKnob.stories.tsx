import { BaseUIKnob } from "./BaseUIKnob";

export const Knob = () => (
  <BaseUIKnob
    name="knob"
    label="knob"
    value={10}
    min={0}
    max={10}
    setValue={(x) => x}
  />
);
