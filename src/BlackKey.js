import React, { useState, useContext } from 'react';
import { MouseDownContext } from './MouseDownContext';

const BlackKey = () => {
  const isMouseDown = useContext(MouseDownContext);

  const [ playing, setPlaying ] = useState(false);

  const isPressed = playing ? "black-key__pressed" : "";

  const play = e => {
    // e.stopPropagation();
    setPlaying(true);
  }

  const release = e => {
    // e.stopPropagation();
    setPlaying(false);
  }

  const handleMouseEnter = e => {
    e.stopPropagation();
    if (isMouseDown) return setPlaying(true)
  }

  return (
    <div
      className={`black-key ${isPressed}`}
      onMouseDown={play}
      onMouseUp={release}
      onMouseOut={release}
      onMouseOver={handleMouseEnter}>
    </div>
  )
};

export default BlackKey
