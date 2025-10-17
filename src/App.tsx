import { AnalyserProvider, Analyzer } from "./Analyser";
import "./App.css";
import { FilterProvider } from "./FilterContext";
import { FilterEnvelopeProvider } from "./FilterEnvelopeProvider";
import { FilterKnob } from "./FilterKnob";
import { FilterType } from "./FilterType";
import { Keyboard } from "./Keyboard";
import { KeyboardProvider } from "./KeyboardProvider";
import { MonoSynthProvider } from "./MonoSynthProvider";
import { OscillatorSelect } from "./OscillatorBaseType";
import { OscillatorProvider } from "./OscillatorProvider";
import { OscillatorSourceType } from "./OscillatorSourceType";
import { SoundProvider } from "./SoundProvider";

function App() {
  return (
    <>
      <MonoSynthProvider>
        <div className="layout">
          <div className="synth">
            <h1 className="heading">MonoSynth</h1>
            <SoundProvider>
              <div className="params">
                <div className="oscillator-group">
                  <OscillatorProvider>
                    <OscillatorSelect />
                    <OscillatorSourceType />
                  </OscillatorProvider>
                </div>
                <AnalyserProvider options={{ type: "waveform" }}>
                  <Analyzer />
                </AnalyserProvider>
                <FilterEnvelopeProvider>
                  <FilterKnob />
                </FilterEnvelopeProvider>
                <FilterProvider>
                  <FilterType />
                </FilterProvider>
              </div>
              <KeyboardProvider>
                <Keyboard numKeys={18} octave={3} />
              </KeyboardProvider>
            </SoundProvider>
          </div>
        </div>
      </MonoSynthProvider>
    </>
  );
}

export default App;
