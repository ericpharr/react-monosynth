import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Analyser } from "tone";
import { scaleLinear } from "d3-scale";
import { line } from "d3-shape";
import { select } from "d3-selection";

const Analyzer = ({ isSilent, synth }) => {
  const analyzer = useRef(null);
  const waveform = useRef(null);
  const analyzerLine = useRef(null);

  useEffect(() => {
    waveform.current = new Analyser({ type: "waveform" });
    synth.connect(waveform.current);
    //eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    if (!isSilent && waveform.current && analyzer.current) {
      let timerId;
      function draw() {
        // console.log("drawing");
        const div = analyzer.current;
        const width = div.clientWidth;
        const height = div.clientHeight;

        const xScale = scaleLinear().range([0, width]).domain([0, 1024]);

        const yScale = scaleLinear().range([height, 0]).domain([-1.5, 1.5]);

        const svgLine = line()
          .x(function (d, i) {
            return xScale(i);
          })
          .y(function (d, i) {
            return yScale(d);
          });

        select(analyzerLine.current)
          .select("path")
          .datum(waveform.current.getValue())
          .attr("d", svgLine)
          .attr("fill", "none")
          .attr("stroke", "white")
          .attr("stroke-width", "2px");

        timerId = requestAnimationFrame(draw);
      }

      timerId = requestAnimationFrame(draw);

      return () => {
        // console.log("cancelled");
        cancelAnimationFrame(timerId);
      };
    }
  }, [isSilent]);

  return (
    <div
      ref={analyzer}
      className="analyzer"
    >
      <svg
        ref={analyzerLine}
        style={{
          // backgroundColor: "#222",
          borderRadius: "4px",
          width: "100%",
        }}
      >
        <path></path>
      </svg>
    </div>
  );
};

export { Analyzer };
