import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { Analyser } from "tone";
import { SynthContext, useSynthState } from "./synthcontext";
import { scaleLinear } from "d3-scale";
import { line } from "d3-shape";
import { select } from "d3-selection";

const Analyzer = () => {
  const synth = useContext(SynthContext);
  const state = useSynthState();
  const analyzer = useRef(null);
  const waveform = useRef(null);

  useEffect(() => {
    waveform.current = new Analyser({ type: "waveform" });
    synth.connect(waveform.current);
    //eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    if (
      (state.isPlaying || state.playing.length > 0) &&
      waveform.current &&
      analyzer.current
    ) {
      let timerId;

      function draw() {
        const svg = select(analyzer.current);
        const width = svg.attr("width");
        const height = svg.attr("height");
        // const numberOfPoints = Math.ceil(width / 2);
        // svg.append("path");

        const xScale = scaleLinear().range([0, width]).domain([0, 1024]);

        const yScale = scaleLinear().range([height, 0]).domain([-1.5, 1.5]);

        const svgLine = line()
          .x(function (d, i) {
            return xScale(i);
          })
          .y(function (d, i) {
            return yScale(d);
          });

        svg
          .select("path")
          .datum(waveform.current.getValue())
          .attr("d", svgLine)
          .attr("fill", "none")
          .attr("stroke", "white")
          .attr("stroke-width", "2px");

        console.log("drawing...");
        timerId = requestAnimationFrame(draw);
        console.log(timerId);
      }

      timerId = requestAnimationFrame(draw);

      return () => {
        console.log("cancelled");
        cancelAnimationFrame(timerId);
        console.log(timerId);
      };
    }
  }, [state.playing.length, state.isPlaying]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "5px",
      }}
    >
      <svg
        width={500}
        height={200}
        ref={analyzer}
        style={{ backgroundColor: "#111", borderRadius: "4px", margin: "5px" }}
      >
        <path></path>
      </svg>
    </div>
  );
};

export { Analyzer };
