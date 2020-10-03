import React, { useState } from "react";
import Key from './Key';
import { MouseDownProvider } from './MouseDownContext';

const Keyboard = () => {

  const [ mouseDown, setMouseDown ] = useState(false)

  const handleMouseDown = e => setMouseDown(true)
  const handleMouseUp = e => setMouseDown(false)
  const handleMouseLeave = e => {
    e.stopPropagation();
    return setMouseDown(false)
  }

  return (
    <div
      className="keyboard"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <MouseDownProvider value={mouseDown}>
        <Key/>
        <Key acc={true}/>
        <Key/>
        <Key acc={true}/>
        <Key/>
        <Key/>
        <Key acc={true}/>
        <Key/>
        <Key acc={true}/>
        <Key/>
        <Key acc={true}/>
        <Key/>
        <Key/>
        <Key acc={true}/>
        <Key/>
        <Key acc={true}/>
        <Key/>
      </MouseDownProvider>
    </div>
  )
};

export default Keyboard;
