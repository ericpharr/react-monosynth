import React from "react";
import "./App.css";
import Keyboard from "./keyboard";
import { Analyzer } from "./analyzer";
import { useMonoSynth } from "./useMonoSynth";

function App() {
  const {
    synth,
    isSilent,
    setGate,
    setNote,
    isLoaded,
    note,
  } = useMonoSynth();

  return (
    <>
      {isLoaded ? (
        <div class="layout">
          <div className="synth">
            <div className="params">
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
