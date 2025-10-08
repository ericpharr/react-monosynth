import { ChangeEvent, useEffect, useRef, WheelEvent } from "react";
import { Knob } from "./Knob";
import { useScale } from "./useScale";

interface FrequencyRangeSliderProps {
  min: number;
  max: number;
  value: number;
  step?: number;
  scale?: "linear" | "log" | "power";
  exponent?: number;
  base?: number;
  onChange: (value: number) => any;
}

export function FrequencyRangeSlider({
  min,
  max,
  value,
  step = 0.01,
  onChange,
  ...props
}: FrequencyRangeSliderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scale = useScale({
    scale: props.scale || "linear",
    domain: [0, 10],
    range: [min, max],
    base: props.base,
    exponent: props.exponent,
  });

  const degreeScale = useScale({
    scale: props.scale || "linear",
    domain: [45, 315],
    range: [min, max],
    base: props.base,
    exponent: props.exponent,
  }).invert(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = scale(Number(e.target.value));
    onChange(newValue);
  };

  useEffect(() => {
    document.body.setAttribute(
      "style",
      "overflow:hidden;overscroll-behavior-x:none;"
    );
  }, []);

  return (
    <>
      <label
        className="knob"
        // onWheel={(e: WheelEvent) => {
        //   e.stopPropagation();
        //   if (inputRef.current) {
        //     e.deltaY > 0
        //       ? inputRef.current.stepDown(
        //           50 * Math.abs(e.deltaY) * Number(inputRef.current.step)
        //         )
        //       : inputRef.current.stepUp(
        //           50 * Math.abs(e.deltaY) * Number(inputRef.current.step)
        //         );

        //     onChange(scale(Number(inputRef.current.value)));
        //   }
        // }}
      >
        {/* <svg transform="rotate(45)" style={{ pointerEvents: "none" }}>
            <circle cx={100} cy={100} r={50} fill="blue"></circle>
            <circle cx={100} cy={130} r={10} fill="red"></circle>
          </svg> */}
        {/* <KnobSvg /> */}
        <div
          onWheel={(e: WheelEvent) => {
            // e.stopPropagation();
            if (inputRef.current) {
              e.deltaY > 0
                ? inputRef.current.stepDown(
                    50 * Math.abs(e.deltaY) * Number(inputRef.current.step)
                  )
                : inputRef.current.stepUp(
                    50 * Math.abs(e.deltaY) * Number(inputRef.current.step)
                  );

              onChange(scale(Number(inputRef.current.value)));
            }
          }}
        >
          <Knob style={{ transform: `rotate(${degreeScale}deg)` }} />
        </div>
        <span className="knob-label">freq</span>
      </label>
      <input
        type="range"
        onChange={handleChange}
        value={scale.invert(value)}
        min={0}
        max={10}
        step={step}
        ref={inputRef}
        style={{
          width: "80px",
          height: "80px",
          position: "absolute",
          opacity: 0,
          zIndex: -1,
        }}

        // style={{position: 'absolute'}}
        // hidden
      />
    </>
  );
}
