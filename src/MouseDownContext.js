import React, { useState, useEffect } from 'react';

const MouseDownContext = React.createContext()

const MouseDownProvider = ({children}) => {
  const [ mousedown, setMousedown ] = useState(false)

  const downHandler = () => {
    return setMousedown(true)
  }

  const upHandler = () => {
    return setMousedown(false)
  }

  useEffect(() => {
    window.addEventListener('mousedown', downHandler);
    window.addEventListener('mouseup', upHandler);
    return () => {
      window.removeEventListener('mousedown', downHandler);
      window.removeEventListener('mouseup', upHandler);
    };
  }, []);

  return (
    <MouseDownContext.Provider value={mousedown}>
      {children}
    </MouseDownContext.Provider>
  )
}

export {MouseDownContext, MouseDownProvider}
