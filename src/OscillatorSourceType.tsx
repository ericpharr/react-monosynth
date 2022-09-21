import { ToggleButton, ToggleGroup } from "./ToggleGroup";
import { useOscillator } from "./OscillatorContext";
import { OmniOscSourceType } from "tone/build/esm/source";

export const OscillatorSourceType = () => {
  const { sourceType, setSourceType } = useOscillator();

  const handleChangeSourceType = (source: OmniOscSourceType) => {
    if (sourceType === source) {
      setSourceType("oscillator");
    } else {
      setSourceType(source);
    }
  };

  return (
    <ToggleGroup vertical>
      <ToggleButton
        name="am"
        type="checkbox"
        checked={sourceType === "am"}
        label="am"
        onChange={() => handleChangeSourceType("am")}
      />
      <ToggleButton
        name="fm"
        type="checkbox"
        checked={sourceType === "fm"}
        label="fm"
        onChange={() => handleChangeSourceType("fm")}
      />
      <ToggleButton
        name="fat"
        type="checkbox"
        checked={sourceType === "fat"}
        label="fat"
        onChange={() => handleChangeSourceType("fat")}
      />
      <ToggleButton
        name="pwm"
        type="checkbox"
        checked={sourceType === "pwm"}
        label="pwm"
        onChange={() => handleChangeSourceType("pwm")}
      />
    </ToggleGroup>
  );
};
