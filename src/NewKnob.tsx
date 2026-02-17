import { scaleLinear } from "d3-scale";
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

// Maps value → CSS rotation degrees (45° = min, 315° = max)
const toRotation = (value: number, min: number, max: number) =>
  scaleLinear().domain([min, max]).range([45, 315]).clamp(true)(value);

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));

// SVG arc helpers
// Arc starts at 135° (7:30 position) and sweeps 270° clockwise to 4:30
const START_ANGLE_DEG = 135;
const TOTAL_SWEEP_DEG = 270;

const toRad = (deg: number) => (deg * Math.PI) / 180;

const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => ({
  x: cx + r * Math.cos(toRad(angleDeg)),
  y: cy + r * Math.sin(toRad(angleDeg)),
});

const describeArc = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  sweepAngle: number,
) => {
  if (sweepAngle <= 0) return "";
  const clamped = Math.min(sweepAngle, 359.99);
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, startAngle + clamped);
  const largeArc = clamped > 180 ? 1 : 0;
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
};

const NUM_TICKS = 11;
const CX = 50;
const CY = 50;
const ARC_R = 44;

const ticks = Array.from({ length: NUM_TICKS }, (_, i) => {
  const angle = START_ANGLE_DEG + (i / (NUM_TICKS - 1)) * TOTAL_SWEEP_DEG;
  const inner = polarToCartesian(CX, CY, 40, angle);
  const outer = polarToCartesian(CX, CY, 47, angle);
  const isMajor = i === 0 || i === NUM_TICKS - 1 || i === Math.floor(NUM_TICKS / 2);
  return { inner, outer, isMajor };
});

const trackPath = describeArc(CX, CY, ARC_R, START_ANGLE_DEG, TOTAL_SWEEP_DEG);

export const NewKnob = ({ name, label, value: initialValue, min, max, step, setValue }: KnobProps) => {
  const [value, setInternalValue] = useState(initialValue);
  const valueRef = useRef(value);

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

  const rotation = toRotation(value, min, max);
  const normalizedValue = (value - min) / (max - min);
  const valueSweep = normalizedValue * TOTAL_SWEEP_DEG;
  const valuePath = describeArc(CX, CY, ARC_R, START_ANGLE_DEG, valueSweep);

  const displayValue = step >= 1 ? value.toFixed(0) : value.toFixed(2);

  return (
    <div className={classes.box}>
      <div className={classes.knobContainer}>
        <svg
          className={classes.arcSvg}
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          {ticks.map((tick, i) => (
            <line
              key={i}
              x1={tick.inner.x}
              y1={tick.inner.y}
              x2={tick.outer.x}
              y2={tick.outer.y}
              className={tick.isMajor ? classes.tickMajor : classes.tick}
            />
          ))}
          <path d={trackPath} className={classes.trackArc} />
          {valueSweep > 0 && <path d={valuePath} className={classes.valueArc} />}
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
