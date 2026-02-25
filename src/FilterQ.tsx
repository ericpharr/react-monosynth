import { useMonoSynthStore } from "./store";
import { NewKnob } from "./NewKnob";

export function FilterQ() {
  const filter = useMonoSynthStore((state) => state.filter);
  const setFilter = useMonoSynthStore((state) => state.setFilter);

  const handleChange = (Q: number) => {
    setFilter({ Q });
  };

  return (
    <NewKnob
      label="Q"
      name="filterQ"
      scale="linear"
      min={0.1}
      max={20}
      step={0.01}
      value={filter.Q as number}
      setValue={handleChange}
    />
  );
}
