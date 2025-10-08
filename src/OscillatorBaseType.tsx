import { ToneOscillatorType } from "tone";
import { WaveformButton } from "./WaveformButton";
import { useOscillator } from "./OscillatorContext";

export const oscillatorTypes: Omit<OscillatorType, "custom">[] = [
  "sine",
  "triangle",
  "square",
  "sawtooth",
];

export function OscillatorSelect() {
  const { setBaseType, baseType } = useOscillator();

  const nextBaseType = () => {
    if (baseType === "pulse" || baseType === "pwm") return;

    const index = oscillatorTypes.indexOf(
      baseType as Omit<ToneOscillatorType, "custom">
    );
    const nextIndex = index === 3 ? 0 : index + 1;
    const nextBaseType = oscillatorTypes[nextIndex];

    setBaseType(nextBaseType as OscillatorType);
  };

  return (
    <>
      <div className="waveform-button__wrapper">
        <button onClick={nextBaseType} className="waveform-button">
          <WaveformButton waveform={baseType} />
        </button>
      </div>
    </>
  );
}
