import { useCallback, useEffect, useState } from "react";
import { useMonoSynth } from "./MonoSynthContext";
import {
  SoundContext,
  SoundDispatchContext,
  type SoundProviderProps,
} from "./useSound";

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
