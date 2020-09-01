import React, { useState } from "react";
import WhiteKey from "./WhiteKey";
import BlackKey from './BlackKey';
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
        <WhiteKey>
          <BlackKey/>
        </WhiteKey>
        <WhiteKey>
          <BlackKey/>
        </WhiteKey>
        <WhiteKey/>
        <WhiteKey>
          <BlackKey/>
        </WhiteKey>
        <WhiteKey>
          <BlackKey/>
        </WhiteKey>
        <WhiteKey>
          <BlackKey/>
        </WhiteKey>
        <WhiteKey/>
        <WhiteKey>
          <BlackKey/>
        </WhiteKey>
        <WhiteKey>
          <BlackKey/>
        </WhiteKey>
        <WhiteKey/>
      </MouseDownProvider>
    </div>
  )
};

export default Keyboard;

