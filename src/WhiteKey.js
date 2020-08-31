import React, {useState} from 'react';

const WhiteKey = (props) => {

  const [ playing, setPlaying ] = useState(false)

  const isPressed = playing ? "white-key__pressed" : ""

  const play = () => setPlaying(true)

  const release = () => setPlaying(false)

  return (
    <div
      className={`white-key ${isPressed}`}
      onMouseDown={play}
      onMouseUp={release}
      onMouseOut={release}>
      {props.children}
    </div>
  )
};

export default WhiteKey
