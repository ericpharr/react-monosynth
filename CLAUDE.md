# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React MonoSynth is a monochrome, monophonic synthesizer built with React, TypeScript, and Tone.js (WebAudio API wrapper). The project uses Vite for development and build tooling, with Ladle for component development/stories.

## Development Commands

```bash
# Development server (Vite)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview

# Component development (Ladle - stories browser)
npx ladle serve
```

## Architecture

### Provider-Based State Management

The app uses a hierarchical Context API structure where providers manage different aspects of the synthesizer:

- **MonoSynthProvider** (root): Manages the Tone.js MonoSynth instance lifecycle
- **SoundProvider**: Manages silence state and release tracking via synth.onsilence callback
- **OscillatorProvider**: Controls oscillator type (baseType, sourceType) and parameters
- **FilterProvider** & **FilterEnvelopeProvider**: Manage filter settings separately from envelope
- **KeyboardProvider**: Handles note playing/release with monophonic note priority using `use-effect-reducer`
- **AnalyserProvider**: Manages audio visualization (waveform/frequency)

### Key Patterns

**Tone.js Synth Access**: Most providers access the MonoSynth instance via `useMonoSynth()` hook, which provides `{ synth }` from MonoSynthContext.

**Monophonic Note Handling**: KeyboardProvider uses `use-effect-reducer` to manage a stack of pressed notes. When multiple keys are held:
- New notes trigger `synth.setNote()` instead of `triggerAttack()`
- On release, switches to the next highest note in the stack
- Only releases when all keys are up

**State + Dispatch Pattern**: Some contexts separate state and dispatch (e.g., SoundContext/SoundDispatchContext), while others combine them (e.g., OscillatorContext).

### Component Organization

- UI components (Knob, Key, Keyboard, etc.) live in `/src`
- Context definitions and providers are co-located with their hooks
- Stories files (`*.stories.tsx`) are for Ladle component development

### Audio Flow

```
MonoSynth (Tone.js) → Filter → Envelope → Destination
     ↑
Keyboard input (play/release)
Oscillator controls (waveform, type)
Filter controls (type, frequency, Q)
```

## Tech Stack Notes

- **Tone.js**: WebAudio wrapper - all synth parameters map to Tone.js MonoSynth options
- **Tonal**: Music theory library used for note sorting in KeyboardProvider
- **use-effect-reducer**: Enables side effects (synth triggers) within reducers
- **@base-ui-components/react**: Base UI component library (beta) for knobs and controls
- **D3 (d3-scale, d3-shape)**: Used for audio visualization in Analyser component
- **@fontsource/fira-code**: Monospaced font fitting the monochrome aesthetic

## Important Constraints

- The synth is **monophonic** - only one note plays at a time, though multiple keys can be tracked
- MonoSynthProvider must wrap all synth-dependent providers
- Tone.js instances must be properly disposed in cleanup to prevent memory leaks
