import React from "react";

export function OscillatorSelectWaveform(props) {
  const paths = {
    triangle: "M20 45l12.5-14L45 45l12.5 14L70 45",
    square: "M22.588 55.57v-22.2h22.4v22.2h22.4",
    sawtooth: "M60 52V33L24 52",
    sine:
      "M16.907 44.667c4.666-9.334 9.333-14 14-14 4.666 0 9.333 4.666 14 14 4.666 9.333 9.333 14 14 14 4.666 0 9.333-4.667 14-14",
    pulse: "M22.588 55.57v-22.2h22.4v22.2h22.4",
    pwm: "M22.588 55.57v-22.2h22.4v22.2h22.4",
  };

  return (
    <div style={{ flexGrow: "grow", height: "72px", width: "72px" }}>
      <svg
        width={89}
        height={89}
        viewBox={"0 0 89 89"}
        style={{
          width: "100%",
          height: "100%",
        }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        onClick={props.onClick}
      >
        <defs>
          <filter
            x="-5.6%"
            y="-5.6%"
            width="111.2%"
            height="111.2%"
            filterUnits="objectBoundingBox"
            id="oscillator-select_svg__b"
          >
            <feGaussianBlur
              stdDeviation={2.5}
              in="SourceAlpha"
              result="shadowBlurInner1"
            />
            <feOffset
              dx={1}
              dy={1}
              in="shadowBlurInner1"
              result="shadowOffsetInner1"
            />
            <feComposite
              in="shadowOffsetInner1"
              in2="SourceAlpha"
              operator="arithmetic"
              k2={-1}
              k3={1}
              result="shadowInnerInner1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
              in="shadowInnerInner1"
            />
          </filter>
          <circle id="oscillator-select_svg__a" cx={44.5} cy={44.5} r={44.5} />
        </defs>
        <g fill="none" fillRule="evenodd">
          <path
            stroke="#D8D8D8"
            strokeWidth={2}
            strokeLinecap="square"
            d={paths[props.waveform]}
          />
          <circle
            stroke="#979797"
            fillOpacity={0.1}
            fill="#000"
            cx={45}
            cy={45}
            r={35}
          />
          <g fill="#000">
            <use fillOpacity={0.1} xlinkHref="#oscillator-select_svg__a" />
            <use
              filter="url(#oscillator-select_svg__b)"
              xlinkHref="#oscillator-select_svg__a"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
