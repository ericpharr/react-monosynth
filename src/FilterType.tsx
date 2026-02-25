import { useMonoSynthStore } from "./store";
import { ToggleButton, ToggleGroup } from "./ToggleGroup";

export const FilterType = () => {
  const filter = useMonoSynthStore((state) => state.filter);
  const setFilter = useMonoSynthStore((state) => state.setFilter);

  const onChange = (value: BiquadFilterType) => {
    setFilter({ type: value });
  };


  return (
    <ToggleGroup>
      <ToggleButton
        name="filter"
        value="lowpass"
        type="radio"
        checked={filter.type === "lowpass"}
        label="lp"
        onChange={onChange}
      />
      <ToggleButton
        name="filter"
        value="highpass"
        type="radio"
        label="hp"
        checked={filter.type === "highpass"}
        onChange={onChange}
      />
    </ToggleGroup>
  );
};
