import { NewKnob } from "./NewKnob";

export const Knob = () => (
  <NewKnob
    name="freq"
    label="freq"
    value={8}
    min={0}
    max={10}
    step={0.01}
    setValue={(n: number) => {
      console.log(n);
    }}
  />
);

export const Bipolar = () => (
  <NewKnob
    name="freq"
    label="freq"
    value={0}
    min={-1}
    max={1}
    step={0.01}
    setValue={(n: number) => {
      console.log(n);
    }}
  />
);
