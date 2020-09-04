import React, { useState, useContext } from 'react';
import { MouseDownContext } from './MouseDownContext';

const WhiteKey = (props) => {

  const isMouseDown = useContext(MouseDownContext);

  const [ playing, setPlaying ] = useState(false)

  const isPressed = playing ? "white-key__pressed" : ""

  const play = e => {
    e.preventDefault();
    if (e.target === e.currentTarget) return setPlaying(true)
  }
  const release = () => setPlaying(false)

  const handleMouseEnter = e => {
    if (isMouseDown) return play(e)
  };

  return (
    <div
      className={`white-key ${isPressed}`}
      onMouseDown={play}
      onMouseUp={release}
      onMouseOut={release}
      onMouseOver={handleMouseEnter}
    >
      {props.children}
    </div>
  )
};

export default WhiteKey
