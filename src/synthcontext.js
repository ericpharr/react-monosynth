import React, { useRef, useEffect, useState } from 'react';
import { MonoSynth } from 'tone'

const SynthContext = React.createContext();

const SynthProvider = ({children}) => {
  const synth = useRef();
  const [ isLoaded, setLoaded ] = useState(false)

  useEffect(() => {
    synth.current = new MonoSynth().toDestination();
    console.log(synth.current)
    setLoaded(true)
  }, []);


  return (
    <SynthContext.Provider value={isLoaded ? synth.current : null }>
      { children }
    </SynthContext.Provider>
  )
}

export {SynthContext, SynthProvider}
