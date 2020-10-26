import React from "react";
import { useKeyPress } from "./use-keypress";

const OctaveSelect = (props) => {
  const { dispatch, incrementKey, decrementKey, currentOctave } = props;

  useKeyPress(
    decrementKey,
    () => dispatch({ type: "DECREMENT_OCTAVE" }),
    () => {},
    []
  );

  useKeyPress(
    incrementKey,
    () => dispatch({ type: "INCREMENT_OCTAVE" }),
    () => {},
    []
  );

  return (
    <>
      <div className="octave-select__wrapper">
        <div className="octave-select">
          octave
          {[...Array(6).keys()].map((octave) => {
            octave = octave + 1;
            return (
              <label
                key={octave}
                htmlFor={octave}
                className={currentOctave === octave ? "current" : ""}
              >
                {octave}
                <input
                  key={octave}
                  id={octave}
                  type="radio"
                  name="octave"
                  value={octave}
                  checked={currentOctave === octave}
                  onChange={() =>
                    dispatch({ type: "CHANGE_OCTAVE", octave: octave })
                  }
                />
              </label>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default React.memo(OctaveSelect);
