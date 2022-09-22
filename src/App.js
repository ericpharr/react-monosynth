import "./App.css";
import { Keyboard } from "./Keyboard.tsx";
import { AnalyserProvider, Analyzer } from "./Analyser";
import { OscillatorSelect } from "./OscillatorBaseType";
import { MonoSynthProvider } from "./MonoSynthContext";
import { FilterKnob } from "./FilterKnob";
import { OscillatorProvider } from "./OscillatorContext";
import { FilterEnvelopeProvider } from "./FilterEnvelopeContext";
import { KeyboardProvider } from "./KeyboardProvider";
import { SoundProvider } from "./SoundProvider";
import { FilterProvider } from "./FilterContext";
import { FilterType } from "./FilterType";
import { OscillatorSourceType } from "./OscillatorSourceType";

function App() {
  return (
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
  );
}

export default App;
