import {
  createContext,
  Dispatch,
  ReactChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMonoSynth } from "./MonoSynthProvider";

interface SoundProviderProps {
  children: ReactChildren;
}

interface ISoundContext {
  isSilent: boolean;
}

interface ISoundDispatchContext {
  setIsSilent: Dispatch<SetStateAction<boolean>>;
}

const SoundContext = createContext<ISoundContext>({
  isSilent: true,
});

const SoundDispatchContext = createContext<ISoundDispatchContext>({
  setIsSilent: () => {},
});

export function SoundProvider({ children }: SoundProviderProps) {
  const { synth } = useMonoSynth();
  const [isSilent, setIsSilent] = useState<boolean>(true);

  useEffect(() => {
    if (synth) {
      const onSilence = () => setIsSilent(true);
      synth.onsilence = onSilence;
    }
  }, [synth]);

  return (
    <SoundContext.Provider value={{ isSilent }}>
      <SoundDispatchContext.Provider value={{ setIsSilent }}>
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
  const { setIsSilent } = useContext(SoundDispatchContext);

  return { setIsSilent };
}
