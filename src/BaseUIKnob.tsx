import { scaleLinear } from "d3-scale";
import classes from "./NewKnob.module.css";
import { Slider } from "@base-ui-components/react/slider";

interface KnobProps {
  name: string;
  value: number;
  min: number;
  max: number;
  label: string;
  setValue: (n: number) => number;
}

const scale = scaleLinear().domain([0, 10]).range([45, 315]).clamp(true);

export const BaseUIKnob = ({ name, label, value }: KnobProps) => {
  const slider = () => {
    return (
      <Slider.Root className={classes.box} orientation="vertical">
        <Slider.Control>
          <Slider.Track className={classes.knobWell}>
            <div className={classes.shadow}>
              <div
                className={classes.knob}
                style={{ rotate: `${scale(value)}deg` }}
              >
                <Slider.Indicator />
                <Slider.Thumb />
                <div className={classes.notch}></div>
              </div>
            </div>
          </Slider.Track>
        </Slider.Control>
        <Slider.Value className={classes.input} />
      </Slider.Root>
    );
  };
  return slider();
  // (
  //   <div className={classes.box}>
  //     <div className={classes.knobWell}>
  //       <div className={classes.shadow}>
  //         <div
  //           className={classes.knob}
  //           role="slider"
  //           style={{ rotate: `${scale(value)}deg` }}
  //         >
  //           <div className={classes.notch}></div>
  //         </div>
  //       </div>
  //     </div>
  //     <label htmlFor={name} className={classes.input}>
  //       {label}
  //     </label>
  //     <input name={name} className={classes.input} value="10" />
  //   </div>
  // );
};
