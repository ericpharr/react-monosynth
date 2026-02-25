import { scaleLinear } from "d3-scale";
import { arc } from "d3-shape";
import classes from "./NewKnob.module.css";
import { useEffect, useRef, useState } from "react";
import { useScale } from "./useScale";

/**
 * Knob component with internal scaling support.
 *
 * ```tsx
 * // Linear (default)
 * <NewKnob value={50} min={0} max={100} setValue={setVal} />
 *
 * // Power scale for frequency (20Hz - 20kHz)
 * <NewKnob
 *   value={800}
 *   min={20}
 *   max={20000}
 *   scale="power"
 *   exponent={49/12}
 *   setValue={setFreq}
 * />
 *
 * // Log scale
 * <NewKnob value={100} min={1} max={1000} scale="log" base={10} setValue={setVal} />
 * ```
 */
interface KnobProps {
  name: string;
  /** Current value in actual units (e.g., 800 Hz) */
  value: number;
  /** Minimum value in actual units (e.g., 20 Hz) */
  min: number;
  /** Maximum value in actual units (e.g., 20000 Hz) */
  max: number;
  /** Step size in display units (0-100 range), default 0.1 */
  step?: number;
  label: string;
  /** Called with actual value when changed */
  setValue: (actualValue: number) => void;
  /** Scale type: "linear" (default), "power", or "log" */
  scale?: "linear" | "power" | "log";
  /** Exponent for power scale (e.g., 49/12 for musical frequency) */
  exponent?: number;
  /** Base for log scale (default 10) */
  base?: number;
}

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
  value: actualValue,
  min,
  max,
  step = 1,
  setValue,
  scale: scaleType = "linear",
  exponent = 1,
  base = 10,
}: KnobProps) => {
  // Create scale: display [0-100] ↔ actual [min-max]
  const valueScale = useScale({
    scale: scaleType,
    domain: [0, 100],
    range: [min, max],
    exponent: exponent,
    base: base,
  });

  const [displayValue, setDisplayValue] = useState(
    () => valueScale.invert(actualValue) as number,
  );
  const displayRef = useRef(displayValue);

  // Sync when actual value changes from parent
  useEffect(() => {
    const newDisplay = valueScale.invert(actualValue) as number;
    setDisplayValue(newDisplay);
    displayRef.current = newDisplay;
  }, [actualValue, valueScale]);

  // scaleLinear: display [0-100] → CSS rotation degrees (-135° to 135°)
  // Notch starts vertical (top), rotates 270° clockwise through 12 o'clock
  const rotationScale = scaleLinear()
    .domain([0, 100])
    .range([-135, 135])
    .clamp(true);

  // scaleLinear: display [0-100] → d3 arc end angle
  const angleScale = scaleLinear()
    .domain([0, 100])
    .range([START_ANGLE, START_ANGLE + TOTAL_SWEEP])
    .clamp(true);

  const sensitivity = 100 / 200; // 0.5 display units per pixel

  const update = (newDisplayVal: number) => {
    const clampedDisplay = Math.min(100, Math.max(1, newDisplayVal));
    const actualVal = valueScale(clampedDisplay) as number;
    displayRef.current = clampedDisplay;
    setDisplayValue(clampedDisplay);
    setValue(actualVal);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    let lastY = e.clientY;

    const onMove = (ev: MouseEvent) => {
      const delta = lastY - ev.clientY;
      lastY = ev.clientY;
      update(displayRef.current + delta * sensitivity);
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
    update(displayRef.current - e.deltaY * (100 / 1000));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault();
      update(displayRef.current + step);
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault();
      update(displayRef.current - step);
    }
  };

  const rotation = rotationScale(displayValue);
  const endAngle = angleScale(displayValue);

  // Detect bipolar range (e.g., -10 to +10 in actual units)
  const isBipolar = min === -max && min < 0;

  // For bipolar: arc from center (50) to current display position
  // For unipolar: arc from start (0) to current display position
  let valuePathStartAngle = START_ANGLE;
  let valuePathEndAngle = endAngle;

  if (isBipolar) {
    const zeroAngle = START_ANGLE + TOTAL_SWEEP / 2; // 0 actual = 50.5 display = 12 o'clock
    const centerDisplay = 50.5; // center of display range [1, 100]
    if (displayValue >= centerDisplay) {
      valuePathStartAngle = zeroAngle;
      valuePathEndAngle = endAngle;
    } else {
      valuePathStartAngle = endAngle;
      valuePathEndAngle = zeroAngle;
    }
  }

  const valuePath = makeArcPath(valuePathStartAngle, valuePathEndAngle);

  // Format actual value for display
  const formattedValue =
    actualValue >= 100 || actualValue <= -100
      ? actualValue.toFixed(0)
      : actualValue >= 10 || actualValue <= -10
        ? actualValue.toFixed(1)
        : actualValue.toFixed(2);

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
            {(isBipolar ? displayValue !== 50.5 : displayValue > 1) && (
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
              aria-valuenow={actualValue}
              style={{ rotate: `${rotation}deg` }}
              onMouseDown={handleMouseDown}
              onWheel={handleWheel}
              onKeyDown={handleKeyDown}
              onDragStart={(e) => e.preventDefault()}
            >
              <div
                className={classes.notch}
                style={{ top: "-4px", bottom: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
      <label htmlFor={name} className={classes.label}>
        {label}
      </label>
      <output name={name} className={classes.value}>
        {formattedValue}
      </output>
    </div>
  );
};
