import React, { useRef, useEffect, useState } from 'react';
import { MonoSynth } from 'tone'

const SynthContext = React.createContext();

const SynthProvider = ({children}) => {
  const synth = useRef();
  const [ isLoaded, setLoaded ] = useState(false)

  useEffect(() => {
    synth.current = new MonoSynth().toDestination();
    setLoaded(true)
  }, []);

  return (
    <SynthContext.Provider value={synth.current}>
      {isLoaded ? children : "loading..."}
    </SynthContext.Provider>
  )
}

export {SynthContext, SynthProvider}
