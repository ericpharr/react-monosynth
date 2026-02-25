import { AnalyserProvider, Analyzer } from "./Analyser";
import "./App.css";
import { FilterKnob } from "./FilterKnob";
import { FilterQ } from "./FilterQ";
import { FilterType } from "./FilterType";
import { Keyboard } from "./Keyboard";
import { OscillatorSelect } from "./OscillatorBaseType";
import { OscillatorSourceType } from "./OscillatorSourceType";

function App() {
  return (
    <>
      <div className="layout">
        <div className="synth">
          <h1 className="heading">MonoSynth</h1>
          <div className="params">
            <div className="oscillator-group">
              <OscillatorSelect />
              <OscillatorSourceType />
            </div>
            <AnalyserProvider options={{ type: "waveform" }}>
              <Analyzer />
            </AnalyserProvider>
            <div>
              <FilterKnob />
              <FilterQ />
            </div>
            <FilterType />
          </div>
          <Keyboard numKeys={18} octave={3} />
        </div>
      </div>
    </>
  );
}

export default App;
