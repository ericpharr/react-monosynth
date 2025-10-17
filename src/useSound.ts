import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
} from "react";

export interface SoundProviderProps {
  children: ReactNode;
}

export interface SoundContextValue {
  isSilent: boolean;
}

export interface SoundDispatchContextValue {
  setIsSilent: Dispatch<SetStateAction<boolean>>;
  setIsReleased: Dispatch<SetStateAction<boolean>>;
}

export const SoundContext = createContext<SoundContextValue>({
  isSilent: true,
});

export const SoundDispatchContext = createContext<SoundDispatchContextValue>(
  {} as SoundDispatchContextValue,
);

export function useSoundState() {
  const { isSilent } = useContext(SoundContext);

  return { isSilent };
}

export function useSoundDispatch() {
  const { setIsSilent, setIsReleased } = useContext(SoundDispatchContext);

  return { setIsSilent, setIsReleased };
}
