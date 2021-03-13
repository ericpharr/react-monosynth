import React from "react";
import { OscillatorSelectWaveform } from "./OscillatorSelectWaveform";

export function OscillatorSelect({ oscillatorType, ...props }) {
  const [oscillator, setOscillator] = props.oscillator;

  const types = {
    oscillator: ["sine", "triangle", "sawtooth", "square"],
    am: ["sine", "sawtooth", "triangle", "square"],
    fm: ["sine", "triangle", "sawtooth", "square"],
    fat: ["sine", "triangle", "sawtooth", "square"],
    pwm: ["square"],
    pulse: ["square"],
  };

  const handleChecked = (e) => {
    const base =
      oscillatorType.source === "pwm" ? "square" : oscillatorType.base;
    const name = e.target.name === "pwm" ? false : e.target.name;
    return !e.target.checked
      ? setOscillator({ type: base })
      : setOscillator({ type: name ? name + base : "pwm" });
  };

  const handleClick = () => {
    if (oscillatorType.source === "pwm") return;

    const baseTypes = types[oscillatorType.source];
    const source =
      oscillatorType.source === "oscillator" ? "" : oscillatorType.source;
    const currentIndex = baseTypes.indexOf(oscillatorType.base);
    const nextIndex =
      currentIndex + 1 === baseTypes.length ? 0 : currentIndex + 1;

    return setOscillator({ type: source + baseTypes[nextIndex] });
  };

  return (
    <>
      <p className="parameter-label">oscillator</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "8px",
          alignContent: "center",
        }}
      >
        <OscillatorSelectWaveform
          waveform={oscillatorType.base}
          onClick={handleClick}
        />
        <div className="wave-modifier">
          <input
            id="am-box"
            className="osc-box"
            type="checkbox"
            name="am"
            checked={oscillatorType.source === "am"}
            onChange={handleChecked}
          />
          <label htmlFor="am-box" className="parameter-label">
            am
          </label>
          <input
            id="fm-box"
            className="osc-box"
            type="checkbox"
            name="fm"
            checked={oscillatorType.source === "fm"}
            onChange={handleChecked}
          />
          <label htmlFor="fm-box" className="parameter-label">
            fm
          </label>
          <input
            id="fat-box"
            className="osc-box"
            type="checkbox"
            name="fat"
            checked={oscillatorType.source === "fat"}
            onChange={handleChecked}
          />
          <label htmlFor="fat-box" className="parameter-label">
            fat
          </label>
          <input
            id="pwm-box"
            className="osc-box"
            type="checkbox"
            name="pwm"
            checked={oscillatorType.source === "pwm"}
            onChange={handleChecked}
          />
          <label htmlFor="pwm-box" className="parameter-label">
            pwm
          </label>
        </div>
      </div>
    </>
  );
}
