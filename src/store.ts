import { create, type UseBoundStore } from "zustand";
import {
  MonoSynth,
  type EnvelopeOptions,
  type FilterOptions,
  type FrequencyEnvelopeOptions,
  type OmniOscillatorOptions,
  type OmniOscSourceType,
} from "tone";
import { type Note } from "tone/build/esm/core/type/NoteUnits";
import { Note as TonalNote } from "tonal";

interface MonoSynthState {
  // Synth parameters
  oscillator: OmniOscillatorOptions;
  baseType: OscillatorType | "pwm" | "pulse";
  sourceType: OmniOscSourceType;
  envelope: Partial<EnvelopeOptions>;
  filter: Partial<FilterOptions>;
  filterEnvelope: Partial<FrequencyEnvelopeOptions>;
  volume: number;

  // Sound state (from SoundProvider)
  isSilent: boolean;
  isReleased: boolean;

  // Keyboard state (from KeyboardProvider)
  playing: Note[];

  // Synth instance getter
  getSynth: () => MonoSynth;

  // Oscillator actions (from OscillatorProvider)
  setOscillator: (options: Partial<OmniOscillatorOptions>) => void;
  setBaseType: (type: OscillatorType | "pwm" | "pulse") => void;
  setSourceType: (type: OmniOscSourceType) => void;

  // Sound actions (from SoundProvider)
  setIsSilent: (isSilent: boolean) => void;
  setIsReleased: (isReleased: boolean) => void;

  // Keyboard actions (from KeyboardProvider)
  play: (note: Note) => void;
  release: (note: Note) => void;

  // Other actions
  setEnvelope: (options: Partial<EnvelopeOptions>) => void;
  setFilter: (options: Partial<FilterOptions>) => void;
  setFilterEnvelope: (options: Partial<FrequencyEnvelopeOptions>) => void;
  setVolume: (volume: number) => void;
  reset: () => void;
}

// Create synth instance (singleton)
const synth = new MonoSynth().toDestination();

// Get initial values from the synth
const initialOscillator = synth.oscillator.get();

const defaultState = {
  oscillator: {
    ...initialOscillator,
  },
  baseType: synth.oscillator.baseType,
  sourceType: synth.oscillator.sourceType,
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0.3,
    release: 1,
  },
  filter: {
    type: "lowpass" as const,
    frequency: 350,
    Q: 1,
  },
  filterEnvelope: {
    baseFrequency: 200,
    octaves: 4,
    attack: 0.05,
    decay: 0.2,
    sustain: 0.5,
    release: 2,
  },
  volume: -10,
  // Sound state
  isSilent: true,
  isReleased: false,
  // Keyboard state
  playing: [] as Note[],
};

// Setup synth.onsilence callback
synth.onsilence = () => {
  const { isReleased, setIsSilent } = useMonoSynthStore.getState();
  if (isReleased) {
    setIsSilent(true);
  }
};

export const useMonoSynthStore = create<MonoSynthState>((set) => ({
  ...defaultState,

  getSynth: () => synth,

  // Oscillator actions (mirrors OscillatorProvider)
  setOscillator: (options) => {
    const updatedOptions = synth.oscillator.set(options);
    const newOscillator = updatedOptions.get();
    const newBaseType = updatedOptions.baseType;
    const newSourceType = updatedOptions.sourceType;

    set({
      oscillator: newOscillator,
      baseType: newBaseType,
      sourceType: newSourceType,
    });
  },

  setBaseType: (type) => {
    synth.oscillator.baseType = type;
    const updatedOscillator = synth.oscillator.get();

    set({
      oscillator: updatedOscillator,
      baseType: synth.oscillator.baseType,
      sourceType: synth.oscillator.sourceType,
    });
  },

  setSourceType: (type) => {
    synth.oscillator.sourceType = type;
    const updatedOscillator = synth.oscillator.get();

    set({
      oscillator: updatedOscillator,
      baseType: synth.oscillator.baseType,
      sourceType: synth.oscillator.sourceType,
    });
  },

  setEnvelope: (options) => {
    synth.envelope.set(options);
    const change = synth.envelope.get();
    set((state) => ({
      envelope: { ...state.envelope, ...change },
    }));
  },

  setFilter: (options) => {
    synth.filter.set(options);
    const change = synth.filter.get();
    set((state) => ({
      filter: { ...state.filter, ...change },
    }));
  },

  setFilterEnvelope: (options) => {
    synth.filterEnvelope.set(options);
    const change = synth.filterEnvelope.get();
    set((state) => ({
      filterEnvelope: { ...state.filterEnvelope, ...change },
    }));
  },

  setVolume: (volume) => set({ volume }),

  // Sound actions (from SoundProvider)
  setIsSilent: (isSilent) => set({ isSilent }),
  setIsReleased: (isReleased) => set({ isReleased }),

  // Keyboard actions (from KeyboardProvider)
  play: (note) => {
    const { playing } = useMonoSynthStore.getState();

    if (playing.length === 0) {
      // First note - trigger attack
      set({ isSilent: false, isReleased: false });
      synth.triggerAttack(note);
    } else {
      // Switch to new note without retriggering envelope
      synth.setNote(note);
    }

    set({ playing: [...playing, note] });
  },

  release: (note) => {
    const { playing } = useMonoSynthStore.getState();
    const nextPlaying = playing.filter((n) => n !== note);

    if (nextPlaying.length > 0) {
      // More notes still held - switch to highest remaining note
      const sorted = TonalNote.sortedNames(nextPlaying);
      const highestNote = sorted[sorted.length - 1] as Note;
      synth.setNote(highestNote);
    } else {
      // No more notes - trigger release
      set({ isReleased: true });
      synth.triggerRelease();
    }

    set({ playing: nextPlaying });
  },

  reset: () => set(defaultState),
}));

/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const zustandHmrFix = (name: string, useStore: UseBoundStore<any>) => {
  if (import.meta.hot) {
    const savedState = import.meta.hot!.data[name];
    if (savedState) {
      const newState = { ...savedState, actions: useStore.getState().actions };
      useStore.setState(newState);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useStore.subscribe((state: any) => {
      const stateToSave = { ...state };
      delete stateToSave.actions;
      import.meta.hot!.data[name] = stateToSave;
    });
    import.meta.hot!.accept((newModule) => {
      if (newModule) {
        const savedState = import.meta.hot!.data[name];
        if (savedState) {
          const newState = {
            ...savedState,
            actions: useStore.getState().actions,
          };
          useStore.setState(newState);
        }
      }
    });
  }
};

zustandHmrFix("MonoSynthStore", useMonoSynthStore);
