import React, { useState, useRef } from 'react';
import Countdown from 'react-countdown';

const Component = () => {
  const [remainingTime, setRemainingTime] = useState(10000);
  const countdown = useRef();

  function onStart() {
    countdown.current.start();
  }

  return (
    <div>
      <Countdown
        date={Date.now() + 10000}
        onTick={() => setRemainingTime(remainingTime - 1000)}
        onComplete={() => console.log('Countdown complete!')}
      />
      <button onClick={() => onStart()}>Start Countdown</button>
    </div>
  );
};

export default Component;