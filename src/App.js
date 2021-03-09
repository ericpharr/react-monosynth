import React from "react";
import "./App.css";
import Keyboard from "./keyboard";
import { Analyzer } from "./analyzer";
import { useMonoSynth } from "./useMonoSynth";

function App() {
  const { synth, isSilent, setGate, setNote, isLoaded, note } = useMonoSynth();

  return (
    <>
      {isLoaded ? (
        <div className="synth">
          <Analyzer synth={synth} isSilent={isSilent} />
          <Keyboard
            numKeys={18}
            octave={3}
            setNote={setNote}
            setGate={setGate}
            note={note}
          />
        </div>
      ) : (
        "loading"
      )}
    </>
  );
}

export default App;
