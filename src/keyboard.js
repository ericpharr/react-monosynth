import React from "react";
import WhiteKey from "./WhiteKey";
import BlackKey from './BlackKey';

const Keyboard = () => {

  return (
    <div className="keyboard">
      <WhiteKey>
        <BlackKey/>
      </WhiteKey>
      <WhiteKey>
        <BlackKey/>
      </WhiteKey>
      <WhiteKey/>
      <WhiteKey>
        <BlackKey/>
      </WhiteKey>
      <WhiteKey>
        <BlackKey/>
      </WhiteKey>
      <WhiteKey>
        <BlackKey/>
      </WhiteKey>
      <WhiteKey/>
      <WhiteKey>
        <BlackKey/>
      </WhiteKey>
      <WhiteKey>
        <BlackKey/>
      </WhiteKey>
      <WhiteKey/>
    </div>
  )
};

export default Keyboard;

