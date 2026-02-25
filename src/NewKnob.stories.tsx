import { useState } from "react";
import { NewKnob } from "./NewKnob";
import type { StoryDefault } from "@ladle/react";

export default {
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#484848" }}>
        <Story />
      </div>
    ),
  ],
} satisfies StoryDefault;

export const Linear = () => {
  const [value, setValue] = useState(50);
  return (
    <>
      <p>Value: {value.toFixed(1)}</p>
      <NewKnob
        name="linear"
        label="linear"
        value={value}
        min={0}
        max={100}
        setValue={setValue}
      />
    </>
  );
};

export const Bipolar = () => {
  const [value, setValue] = useState(0);
  return (
    <>
      <p>Value: {value.toFixed(2)}</p>
      <NewKnob
        name="bipolar"
        label="bipolar"
        value={value}
        min={-1}
        max={1}
        setValue={setValue}
      />
    </>
  );
};

export const PowerScale = () => {
  const [freq, setFreq] = useState(800);
  return (
    <>
      <p>Frequency: {freq.toFixed(0)} Hz</p>
      <NewKnob
        name="freq"
        label="freq"
        value={freq}
        min={20}
        max={20000}
        scale="power"
        exponent={49 / 12}
        setValue={setFreq}
      />
    </>
  );
};

export const LogScale = () => {
  const [value, setValue] = useState(100);
  return (
    <>
      <p>Value: {value.toFixed(1)}</p>
      <NewKnob
        name="log"
        label="log"
        value={value}
        min={1}
        max={1000}
        scale="log"
        base={10}
        setValue={setValue}
      />
    </>
  );
};
