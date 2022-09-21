import {
  createContext,
  Dispatch,
  ReactChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMonoSynth } from "./MonoSynthContext";

interface SoundProviderProps {
  children: ReactChildren;
}

interface SoundContextValue {
  isSilent: boolean;
}

interface SoundDispatchContextValue {
  setIsSilent: Dispatch<SetStateAction<boolean>>;
  setIsReleased: Dispatch<SetStateAction<boolean>>;
}

const SoundContext = createContext<SoundContextValue>({
  isSilent: true,
});

const SoundDispatchContext = createContext<SoundDispatchContextValue>(
  {} as SoundDispatchContextValue
);

export function SoundProvider({ children }: SoundProviderProps) {
  const { synth } = useMonoSynth();
  const [isSilent, setIsSilent] = useState<boolean>(true);
  const [isReleased, setIsReleased] = useState(false);

  const onSilence = useCallback(() => {
    if (isReleased) {
      setIsSilent(true);
    }
  }, [isReleased]);

  useEffect(() => {
    if (synth) {
      synth.onsilence = onSilence;
    }
  }, [onSilence, synth]);

  return (
    <SoundContext.Provider value={{ isSilent }}>
      <SoundDispatchContext.Provider value={{ setIsSilent, setIsReleased }}>
        {children}
      </SoundDispatchContext.Provider>
    </SoundContext.Provider>
  );
}

export function useSoundState() {
  const { isSilent } = useContext(SoundContext);

  return { isSilent };
}

export function useSoundDispatch() {
  const { setIsSilent, setIsReleased } = useContext(SoundDispatchContext);

  return { setIsSilent, setIsReleased };
}
