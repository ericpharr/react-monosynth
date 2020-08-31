import React, { useState } from 'react';

const BlackKey = () => {

  const [ playing, setPlaying ] = useState(false);

  const isPressed = playing ? "black-key__pressed" : "";

  const play = e => {
    e.stopPropagation();
    setPlaying(true);
  }

  const release = e => {
    e.stopPropagation();
    setPlaying(false);
  }

  return (
    <div
      className={`black-key ${isPressed}`}
      onMouseDown={play}
      onMouseUp={release}
      onMouseOut={release}>
    </div>
  )
};

export default BlackKey
