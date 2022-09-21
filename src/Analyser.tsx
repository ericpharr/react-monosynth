import {
  useEffect,
  useRef,
  useState,
  createContext,
  ReactElement,
  useContext,
} from "react";
import { Analyser, AnalyserOptions } from "tone";
import { scaleLinear } from "d3-scale";
import { line } from "d3-shape";
import { useMonoSynth } from "./MonoSynthContext";
import { useSoundState } from "./SoundProvider";

interface AnalyserContextValue {
  waveform: Analyser | null;
  width: number;
  height: number;
}
const AnalyserContext = createContext<AnalyserContextValue>(
  {} as AnalyserContextValue
);

export const AnalyserProvider = ({
  options,
  children,
}: {
  options?: AnalyserOptions;
  children?: ReactElement;
  width: number;
  height: number;
}) => {
  const { synth } = useMonoSynth();
  const { isSilent } = useSoundState();
  const analyser = useRef<Analyser | null>(null);
  const element = useRef<HTMLDivElement>({} as HTMLDivElement);

  useEffect(() => {
    analyser.current = new Analyser(options);
    synth?.connect(analyser.current);
    return () => {
      analyser.current?.dispose();
      analyser.current = null;
    };
    //eslint-disable-next-line
  }, []);

  return (
    <AnalyserContext.Provider
      value={{
        waveform: analyser.current,
        width: element.current.clientWidth,
        height: element.current.clientHeight,
      }}
    >
      <div ref={element} className="analyzer">
        {!isSilent ? children : null}
      </div>
    </AnalyserContext.Provider>
  );
};

export const Analyzer = () => {
  const { waveform, width, height } = useContext(AnalyserContext);
  const animationRef = useRef<number>(0);
  const [path, setPath] = useState<string>("");

  const draw = () => {
    const data = waveform?.getValue();

    const xScale = scaleLinear().range([0, width]).domain([0, width]);
    const yScale = scaleLinear().range([height, 0]).domain([-1.5, 1.5]);

    const subsample = (data: Float32Array): Float32Array => {
      let subsampledData = new Float32Array(width);

      for (let i = 0; i < width; i++) {
        subsampledData[i] = data[Math.floor((i / width) * data.length)];
      }
      return subsampledData;
    };

    const linePath = line<Float32Array[keyof Float32Array]>()
      .x((_d, i) => {
        return xScale(i);
      })
      .y((d) => {
        return yScale(d as number);
      })(subsample(data as Float32Array));

    if (linePath) setPath(() => linePath);

    animationRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      setPath("");
      cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <svg
      style={{
        borderRadius: "4px",
        width: "100%",
      }}
    >
      <path fill="none" stroke="white" strokeWidth="1px" d={path}></path>
    </svg>
  );
};
