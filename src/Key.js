import React from "react";
import { useKeyPress } from "./use-keypress";

const Key = (props) => {
  const { dispatch, note, index, trigger, acc, playing } = props;

  useKeyPress(
    trigger,
    () => dispatch({ type: "PLAY", note, index }),
    () => dispatch({ type: "RELEASE", note, index }),
    [note]
  );

  const color = acc ? "black" : "white";
  const pressed = playing ? `${color}__pressed` : "";

  const handleMouseDown = (e) => {
    e.preventDefault();
    return dispatch({ type: "PLAY", note, index });
  };

  const handleMouseOut = (e) => {
    e.preventDefault();
    return dispatch({ type: "RELEASE", note, index });
  };

  const handleMouseOver = (e) => {
    e.preventDefault();
    if (e.buttons) return dispatch({ type: "PLAY", note, index });
  };

  return (
    <div
      className={`${color} ${pressed}`}
      onMouseDown={handleMouseDown}
      onMouseUp={() => dispatch({ type: "RELEASE", note, index })}
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
    ></div>
  );
};

export default React.memo(Key);
