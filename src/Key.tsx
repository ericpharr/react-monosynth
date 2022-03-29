import React, { MouseEvent, useState } from "react";
import { Note } from "tone/build/esm/core/type/NoteUnits";
import { useKeyBoard } from "./KeyboardProvider";
import { useKeyPress } from "./use-keypress";

interface KeyProps {
  note: Note;
  trigger: string;
  acc: boolean;
}

export const Key = ({ note, trigger, acc }: KeyProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { play, release } = useKeyBoard();
  const color = acc ? "black" : "white";
  const pressed = isPlaying ? `${color}__pressed` : "";

  useKeyPress(
    trigger,
    () => {
      setIsPlaying(true);
      play(note);
    },
    () => {
      setIsPlaying(false);
      release(note);
    },
    []
  );

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setIsPlaying(true);
    play(note);
  };

  const handleMouseUp = (event: MouseEvent) => {
    event.preventDefault();
    if (isPlaying) {
      setIsPlaying(false);
      release(note);
    }
  };

  const handleMouseOut = (e: MouseEvent) => {
    e.preventDefault();
    if (isPlaying) {
      setIsPlaying(false);
      release(note);
    }
  };

  const handleMouseOver = (e: MouseEvent) => {
    e.preventDefault();
    if (e.buttons) {
      setIsPlaying(true);
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
    ></button>
  );
};
