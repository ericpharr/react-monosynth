const paths: Record<string, string> = {
  triangle: "M1 50L25.5 25.5L74.5 74.5L99 50",
  square: "M1 50L1 25.5L50 25.5L50 74.5L99 74.5L99 50",
  sawtooth: "M1 50L50 25.5L50 74.5L99 50",
  sine: "M1 49.9995C1 49.9995 13.1009 25.2927 25.5 25.5013C37.8991 25.7099 50.5962 50.8339 50.5962 50.8339C50.5962 50.8339 62.3991 74.7062 74.5 74.4976C86.6009 74.289 99 49.9995 99 49.9995",
  pulse: "M1 50L1 25.5L50 25.5L50 74.5L99 74.5L99 50",
  pwm: "M1 50L1 25.5L50 25.5L50 74.5L99 74.5L99 50",
};

export function WaveformButton({
  waveform,
}: {
  waveform: Omit<OscillatorType | "pwm" | "pulse", "custom">;
}) {
  const path = paths[waveform as string];

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" strokeWidth="2">
      <path
        d={path}
        fill="none"
        opacity="1"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      />
    </svg>
  );
}
