import React from 'react';
import './App.css';
import { MouseDownProvider } from './MouseDownContext'
import Keyboard from './keyboard'

function App() {

  return (
    <>
          <MouseDownProvider>
            <Keyboard/>
          </MouseDownProvider>
    </>
  )
}

export default App;
