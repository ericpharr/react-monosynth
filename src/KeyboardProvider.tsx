import { ReactChildren } from "react";
import { createContext, useEffect, useReducer } from "react";
import { Note } from "tone/build/esm/core/type/NoteUnits";
import { useMonoSynth } from "./MonoSynthProvider";
import { useSoundDispatch } from "./SoundProvider";
import { Note as TonalNote } from "@tonaljs/tonal";
import { useContext } from "react";
import { Dispatch } from "react";

interface PlayingState {
  currentNote: Note;
  isPlaying: boolean;
  isStarted: boolean;
  playing: Note[];
}

interface PlayingAction {
  type: "PLAY" | "RELEASE";
  note: Note;
}

interface KeyboardProviderProps {
  children: ReactChildren;
}

interface IKeyboardContext {
  dispatch: Dispatch<PlayingAction>;
}
export const KeyboardContext = createContext<IKeyboardContext>({
  dispatch: () => {},
});

export function KeyboardProvider({ children }: KeyboardProviderProps) {
  const { synth } = useMonoSynth();
  const { setIsSilent } = useSoundDispatch();

  const [{ isPlaying, currentNote, isStarted }, dispatch] = useReducer(
    noteReducer,
    {
      currentNote: "C4",
      isPlaying: false,
      playing: [],
      isStarted: false,
    }
  );

  useEffect(() => {
    if (isPlaying) setIsSilent(false);
  }, [isPlaying, setIsSilent]);

  useEffect(() => {
    if (synth) {
      if (isPlaying && !isStarted) synth.triggerAttack(currentNote);

      if (isPlaying && isStarted) synth.setNote(currentNote);

      if (!isPlaying) synth.triggerRelease();
    }
  }, [currentNote, isPlaying, isStarted, synth]);

  return (
    <KeyboardContext.Provider value={{ dispatch }}>
      {children}
    </KeyboardContext.Provider>
  );
}

function noteReducer(state: PlayingState, action: PlayingAction): PlayingState {
  switch (action.type) {
    case "PLAY":
      return {
        currentNote: action.note,
        isPlaying: true,
        isStarted: Boolean(state.playing.length),
        playing: TonalNote.sortedNames([
          ...state.playing,
          action.note,
        ]) as Note[],
      };
    case "RELEASE":
      const newPlaying = state.playing.filter((note) => note !== action.note);
      const [newNote] = newPlaying.slice(-1);
      return {
        currentNote: newNote,
        isPlaying: Boolean(newPlaying.length),
        isStarted: Boolean(newPlaying.length),
        playing: newPlaying,
      };
  }
}

export function useKeyBoard() {
  const { dispatch } = useContext(KeyboardContext);

  const play = (note: Note) =>
    dispatch({ type: "PLAY", note } as PlayingAction);
  const release = (note: Note) =>
    dispatch({ type: "RELEASE", note } as PlayingAction);

  return { play, release };
}
