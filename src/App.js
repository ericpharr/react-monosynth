import React from "react";
import "./App.css";
import Keyboard from "./keyboard";
import { Analyzer } from "./analyzer";
import { useMonoSynth } from "./useMonoSynth";
import {OscillatorSelect} from "./oscillator-select";

function App() {
  const { oscillatorType,synth, isSilent, oscillator, setGate, setNote, isLoaded, note } = useMonoSynth({
    oscillator: { type: "sawtooth" },
  });

  return (
    <>
      {isLoaded ? (
        <div className="layout">
          <div className="synth">
            <h1 className="heading">MonoSynth</h1>
            <div className="params">
              <div className="oscillator-group">
                  <OscillatorSelect oscillator={oscillator} oscillatorType={oscillatorType}/>
              </div>
              <div className="item-2"></div>
              <Analyzer synth={synth} isSilent={isSilent} />
            </div>
            <Keyboard
              numKeys={18}
              octave={3}
              setNote={setNote}
              setGate={setGate}
              note={note}
            />
          </div>
        </div>
      ) : (
        "loading"
      )}
    </>
  );
}

export default App;
