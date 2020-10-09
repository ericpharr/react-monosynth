import React from 'react';
import './App.css';
import { MouseDownProvider } from './MouseDownContext'
import Keyboard from './keyboard'
import { SynthProvider } from './synthcontext'

function App() {

  return (
    <>
      <SynthProvider>
          <MouseDownProvider>
            <Keyboard/>
          </MouseDownProvider>
      </SynthProvider>
    </>
  )
}

export default App;
