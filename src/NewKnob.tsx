import { scaleLinear } from "d3-scale";
import classes from "./NewKnob.module.css";
import { useState } from "react";

interface KnobProps {
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  label: string;
  setValue: (n: number) => number;
}

const scale = (min: number, max: number) =>
  scaleLinear().domain([min, max]).range([45, 315]).clamp(true);

export const NewKnob = ({ name, label, value, min, max, step }: KnobProps) => {
  const [state, setState] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const [clientYStart, setClientYStart] = useState(0);

  const pixelsToSteps = step / 5;

  return (
    <div className={classes.box}>
      <div className={classes.knobWell}>
        <div className={classes.shadow}>
          <div
            className={classes.knob}
            role="slider"
            style={{ rotate: `${scale(min, max)(state)}deg` }}
            onDragStart={(e) => {
              e.preventDefault();
            }}
            onWheel={(e) => {
              e.stopPropagation();
              const change = e.deltaY * pixelsToSteps;
              setState((state) =>
                state + change > max
                  ? max
                  : state + change < min
                    ? min
                    : state + change,
              );
            }}
            onMouseDown={(e) => {
              setIsDragging(true);
              setClientYStart(e.clientY);
            }}
            onMouseUp={() => {
              setIsDragging(false);
            }}
            onMouseMove={(e) => {
              const change = (clientYStart - e.clientY) * pixelsToSteps;
              if (isDragging) {
                setState((state) =>
                  state + change > max
                    ? max
                    : state + change < min
                      ? min
                      : state + change,
                );
              }
            }}
          >
            <div className={classes.notch}></div>
          </div>
        </div>
        <input
          type="range"
          name={name}
          value={state}
          onChange={() => {}}
          style={{ position: "absolute", visibility: "hidden" }}
        />
      </div>
      <label htmlFor={name} className={classes.input}>
        {label}
      </label>
      <input name={name} className={classes.input} value="10" />
    </div>
  );
};
