import { ReactElement } from "react";
import { createContext } from "react";
import { Note } from "tone/build/esm/core/type/NoteUnits";
import { MonoSynthContext } from "./MonoSynthContext";
import { Note as TonalNote } from "@tonaljs/tonal";
import { useContext } from "react";
import { useEffectReducer } from "use-effect-reducer";
import { useSoundDispatch } from "./SoundProvider";

interface PlayingAction {
  type: "PLAY" | "RELEASE";
  note: Note;
}

interface KeyboardProviderProps {
  children: ReactElement;
}

interface KeyboardContextValue {
  playing: Note[];
  play: (note: Note) => void;
  release: (note: Note) => void;
}

export const KeyboardContext = createContext<KeyboardContextValue>(
  {} as KeyboardContextValue
);

export function KeyboardProvider({ children }: KeyboardProviderProps) {
  const { synth } = useContext(MonoSynthContext);
  const { setIsSilent, setIsReleased } = useSoundDispatch();

  const [state, dispatch] = useEffectReducer(
    (state: Note[], action: PlayingAction, exec) => {
      if (action.type === "PLAY") {
        exec(() => {
          if (!state.length) {
            setIsSilent(false);
            setIsReleased(false);
            synth?.triggerAttack(action.note);
          } else {
            synth?.setNote(action.note);
          }
        });
        return [...state, action.note] as Note[];
      }

      if (action.type === "RELEASE") {
        const nextPlaying = state.filter((note) => note !== action.note);
        const sorted = TonalNote.sortedNames(nextPlaying);
        const nextNote =
          sorted.length > 0 ? sorted[sorted.length - 1] : action.note;

        exec(() => {
          if (state.length > 1) {
            synth?.setNote(nextNote);
          } else {
            setIsReleased(true);
            synth?.triggerRelease();
          }
        });

        return nextPlaying;
      }
      return state;
    },
    []
  );

  const play = (note: Note) => {
    dispatch({ type: "PLAY", note });
  };
  const release = (note: Note) => {
    dispatch({ type: "RELEASE", note });
  };

  return (
    <KeyboardContext.Provider value={{ playing: state, play, release }}>
      {children}
    </KeyboardContext.Provider>
  );
}
