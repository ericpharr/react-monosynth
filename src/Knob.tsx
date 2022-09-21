import { memo } from "react";
import { SVGProps } from "react";

const MemoizedSvg = memo(Svg);
export function Knob(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 64 64"
      {...props}
    >
      <MemoizedSvg />
    </svg>
  );
}

function Svg() {
  return (
    <>
      <defs>
        <filter
          x="-2.4%"
          y="-2.4%"
          width="104.8%"
          height="104.8%"
          filterUnits="objectBoundingBox"
          id="Knob_svg__b"
        >
          <feMorphology
            radius={1}
            in="SourceAlpha"
            result="shadowSpreadInner1"
          />
          <feGaussianBlur
            stdDeviation={1}
            in="shadowSpreadInner1"
            result="shadowBlurInner1"
          />
          <feOffset in="shadowBlurInner1" result="shadowOffsetInner1" />
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
        <filter
          x="-5.8%"
          y="-5.8%"
          width="111.5%"
          height="111.5%"
          filterUnits="objectBoundingBox"
          id="Knob_svg__c"
        >
          <feMorphology
            radius={0.5}
            operator="dilate"
            in="SourceAlpha"
            result="shadowSpreadOuter1"
          />
          <feOffset in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation={0.5}
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <filter
          x="-12.5%"
          y="-3.6%"
          width="125%"
          height="107.1%"
          filterUnits="objectBoundingBox"
          id="Knob_svg__g"
        >
          <feGaussianBlur
            stdDeviation={0.5}
            in="SourceAlpha"
            result="shadowBlurInner1"
          />
          <feOffset in="shadowBlurInner1" result="shadowOffsetInner1" />
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
        <circle id="Knob_svg__a" cx={32} cy={32} r={32} />
        <circle id="Knob_svg__d" cx={32} cy={32} r={28} />
        <radialGradient
          cx="50%"
          cy="50%"
          fx="50%"
          fy="50%"
          r="50%"
          id="Knob_svg__e"
        >
          <stop stopColor="#FDFDFD" offset="0%" />
          <stop stopColor="#C5C5C5" offset="100%" />
        </radialGradient>
        <path
          d="M30 56.1v3.868c.667.088 1.333.132 2 .132h2V47a2 2 0 0 0-4 0Z"
          id="Knob_svg__f"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <g fill="#000">
          <use fillOpacity={0.1} xlinkHref="#Knob_svg__a" />
          <use filter="url(#Knob_svg__b)" xlinkHref="#Knob_svg__a" />
        </g>
        <use fill="#000" filter="url(#Knob_svg__c)" xlinkHref="#Knob_svg__d" />
        <use fill="url(#Knob_svg__e)" xlinkHref="#Knob_svg__d" />
        <circle fill="#D8D8D8" cx={32} cy={32} r={20} />
        <g fill="#000">
          <use fillOpacity={0.2} xlinkHref="#Knob_svg__f" />
          <use filter="url(#Knob_svg__g)" xlinkHref="#Knob_svg__f" />
        </g>
      </g>
    </>
  );
}
export default Knob;
