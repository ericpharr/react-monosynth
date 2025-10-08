import { NumberValue, scaleLinear, scaleLog, scalePow } from "d3-scale";
import { useCallback } from "react";

interface ScaleProps {
  scale: "linear" | "power" | "log";
  exponent?: number;
  base?: number;
  domain: Iterable<NumberValue>;
  range: Iterable<number>;
}

function createScale({
  scale,
  exponent = 2,
  domain,
  range,
  base = 10,
}: ScaleProps) {
  switch (scale) {
    case "linear":
      return {
        fn: scaleLinear().domain(domain).range(range),
        deps: [domain, range],
      };
    case "power":
      return {
        fn: scalePow().exponent(exponent).domain(domain).range(range),
        deps: [domain, range, exponent],
      };
    case "log":
      return {
        fn: scaleLog().base(base).domain(domain).range(range),
        deps: [domain, range, base],
      };
  }
}

export function useScale(props: ScaleProps) {
  const { fn, deps } = createScale(props);

  return useCallback(fn, [fn, ...deps]);
}
