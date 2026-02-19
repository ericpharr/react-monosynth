import { scaleLinear } from "d3-scale";
import { arc } from "d3-shape";
import classes from "./NewKnob.module.css";
import { useRef, useState } from "react";

interface KnobProps {
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  label: string;
  setValue: (n: number) => void;
}

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));

// d3-shape arc convention: 0 = top (12 o'clock), clockwise, radians
// Min position (7:30) = 5π/4, sweeps 270° = 3π/2 clockwise to 4:30
const START_ANGLE = (5 * Math.PI) / 4;
const TOTAL_SWEEP = (3 * Math.PI) / 2;

const ARC_INNER = 41.5;
const ARC_OUTER = 44.5;

// arc() generates paths centered at (0,0); we translate to (50,50) in the SVG
const arcGen = arc<{ startAngle: number; endAngle: number }>()
  .innerRadius(ARC_INNER)
  .outerRadius(ARC_OUTER)
  .cornerRadius(1.5)
  .startAngle((d) => d.startAngle)
  .endAngle((d) => d.endAngle);

const makeArcPath = (startAngle: number, endAngle: number) =>
  arcGen({ startAngle, endAngle }) ?? "";

const trackPath = makeArcPath(START_ANGLE, START_ANGLE + TOTAL_SWEEP);

export const NewKnob = ({
  name,
  label,
  value: initialValue,
  min,
  max,
  step,
  setValue,
}: KnobProps) => {
  const [value, setInternalValue] = useState(initialValue);
  const valueRef = useRef(value);

  // scaleLinear: value → CSS rotation degrees (225° = min at 7:30, 495° = max at 4:30)
  // Notch starts vertical (top), rotates 270° clockwise through 12 o'clock
  const rotationScale = scaleLinear()
    .domain([min, max])
    .range([-135, 135])
    .clamp(true);

  // scaleLinear: value → d3 arc end angle
  const angleScale = scaleLinear()
    .domain([min, max])
    .range([START_ANGLE, START_ANGLE + TOTAL_SWEEP])
    .clamp(true);

  const sensitivity = (max - min) / 200;

  const update = (newVal: number) => {
    const clamped = clamp(newVal, min, max);
    valueRef.current = clamped;
    setInternalValue(clamped);
    setValue(clamped);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    let lastY = e.clientY;

    const onMove = (ev: MouseEvent) => {
      const delta = lastY - ev.clientY;
      lastY = ev.clientY;
      update(valueRef.current + delta * sensitivity);
    };

    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    e.preventDefault();
    update(valueRef.current - e.deltaY * ((max - min) / 1000));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault();
      update(valueRef.current + step);
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault();
      update(valueRef.current - step);
    }
  };

  const rotation = rotationScale(value);
  const endAngle = angleScale(value);

  // Detect bipolar range (e.g., -10 to +10)
  const isBipolar = min === -max && min < 0;

  // For bipolar: arc from 0 to value (center to current position)
  // For unipolar: arc from min to value (start to current position)
  let valuePathStartAngle = START_ANGLE;
  let valuePathEndAngle = endAngle;

  if (isBipolar) {
    const zeroAngle = START_ANGLE + TOTAL_SWEEP / 2; // 0 is at center (12 o'clock)
    if (value >= 0) {
      valuePathStartAngle = zeroAngle;
      valuePathEndAngle = endAngle;
    } else {
      valuePathStartAngle = endAngle;
      valuePathEndAngle = zeroAngle;
    }
  }

  const valuePath = makeArcPath(valuePathStartAngle, valuePathEndAngle);

  const displayValue = step >= 1 ? value.toFixed(0) : value.toFixed(2);

  return (
    <div className={classes.box}>
      <div className={classes.knobContainer}>
        <svg
          className={classes.arcSvg}
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          {/* arc() centers at (0,0); translate to SVG center */}
          <g transform="translate(50, 50)">
            <path
              d={trackPath}
              className={classes.trackArc}
              style={{ fill: "#2e2e2e", stroke: "none" }}
            />
            {(isBipolar ? value !== 0 : endAngle > START_ANGLE) && (
              <path
                d={valuePath}
                className={classes.valueArc}
                style={{ fill: "#ccc", stroke: "none" }}
              />
            )}
          </g>
        </svg>
        <div className={classes.knobWell}>
          <div className={classes.shadow}>
            <div
              className={classes.knob}
              role="slider"
              tabIndex={0}
              aria-label={label}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value}
              style={{ rotate: `${rotation}deg` }}
              onMouseDown={handleMouseDown}
              onWheel={handleWheel}
              onKeyDown={handleKeyDown}
              onDragStart={(e) => e.preventDefault()}
            >
              <div className={classes.notch} />
            </div>
          </div>
        </div>
      </div>
      <label htmlFor={name} className={classes.label}>
        {label}
      </label>
      <output name={name} className={classes.value}>
        {displayValue}
      </output>
    </div>
  );
};
