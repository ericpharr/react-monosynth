import React from "react";
import "./App.css";
import Keyboard from "./keyboard";
import { SynthProvider } from "./synthcontext";
import { Analyzer } from "./analyzer";

function App() {
  return (
    <>
      <SynthProvider>
        <div className="synth">
          <Analyzer />
          <Keyboard numKeys={18} octave={3} />
        </div>
      </SynthProvider>
    </>
  );
}

export default App;
