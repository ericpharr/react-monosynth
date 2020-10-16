import React, { useState, useContext } from 'react';
import { SynthContext } from './synthcontext'
import { useKeyPress } from './use-keypress'

const Key = (props) => {

  const synth = useContext(SynthContext);
  const [ playing, setPlaying ] = useState(false)
  const keyPressed = useKeyPress(props.trigger, () => synth ? synth.triggerAttack(props.note) : {}, () => synth ? synth.triggerRelease() : {})

  const acc = props.acc ? "black" : "white"
  const pressed = playing || keyPressed ? `${acc}__pressed` : ""

  const play = e => {
    e.preventDefault();
    synth.triggerAttack(props.note);
    return setPlaying(true)
  }

  const changeNote = e => {
    e.preventDefault();
    synth.setNote(props.note);
    return setPlaying(true)
  }

  const handleMouseEnter = e => {
    if (e.buttons) return changeNote(e)
  };

  const release = () => {
    synth.triggerRelease();
    setPlaying(false)
  }

  const releaseNote = () => setPlaying(false)

  return (
    <div className={`${acc} ${pressed}`}
      onMouseDown={play}
      onMouseUp={release}
      onMouseOut={releaseNote}
      onMouseOver={handleMouseEnter}
    >
    </div>
  )
};

export default Key
