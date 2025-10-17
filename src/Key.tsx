import { type MouseEvent } from "react";
import { type Note } from "tone/build/esm/core/type/NoteUnits";
import { useKeyPress } from "./useKeyPress";
import { useKeyboard } from "./useKeyboard";

interface KeyProps {
  note: Note;
  trigger: string;
  acc: boolean;
}

export const Key = ({ note, trigger, acc }: KeyProps) => {
  const { playing, play, release } = useKeyboard();
  const isPlaying = playing.includes(note);
  const color = acc ? "black" : "white";
  const pressed = isPlaying ? `${color}__pressed` : "";

  useKeyPress(
    trigger,
    () => {
      play(note);
    },
    () => {
      release(note);
    },
    [],
  );

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    play(note);
  };

  const handleMouseUp = (event: MouseEvent) => {
    event.preventDefault();
    if (isPlaying) {
      release(note);
    }
  };

  const handleMouseOut = (e: MouseEvent) => {
    e.preventDefault();
    if (isPlaying) {
      release(note);
    }
  };

  const handleMouseOver = (e: MouseEvent) => {
    e.preventDefault();
    if (e.buttons) {
      play(note);
    }
  };

  return (
    <button
      className={`${color} ${pressed}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
      style={{ position: "relative" }}
      type="button"
      aria-pressed={isPlaying}
    ></button>
  );
};
