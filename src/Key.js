import React, { useState, useContext } from 'react';
import { MouseDownContext } from './MouseDownContext';
import { SynthContext } from './synthcontext'

const Key = (props, {children}) => {

  const isMouseDown = useContext(MouseDownContext);
  const synth = useContext(SynthContext);
  const [ playing, setPlaying ] = useState(false)

  const acc = props.acc ? "black" : "white"
  const pressed = playing ? `${acc}__pressed` : ""

  const play = e => {
    e.preventDefault();
    synth.triggerAttack(props.note);
    return setPlaying(true)
  }

  const handleMouseEnter = e => {
    if (isMouseDown) return play(e)
  };

  const release = () => {
    synth.triggerRelease();
    setPlaying(false)
  }

  return (
    <div className={`${acc} ${pressed}`}
      onMouseDown={play}
      onMouseUp={release}
      onMouseOut={release}
      onMouseOver={handleMouseEnter}
    >
    </div>
  )
};

export default Key
