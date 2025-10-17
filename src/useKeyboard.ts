import { createContext, useContext } from "react";
import { type Note } from "tone/build/esm/core/type/NoteUnits";

export interface PlayingAction {
  type: "PLAY" | "RELEASE";
  note: Note;
}

export interface KeyboardContextValue {
  playing: Note[];
  play: (note: Note) => void;
  release: (note: Note) => void;
}

export const KeyboardContext = createContext<KeyboardContextValue>(
  {} as KeyboardContextValue,
);

export const useKeyboard = () => {
  return useContext(KeyboardContext);
};
