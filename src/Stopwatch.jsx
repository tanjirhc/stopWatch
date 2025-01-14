import React, { useState, useEffect, useRef } from 'react';

function Stopwatch() {

  const [isRunning, setIsRunning] = useState(false);
  const [elapseTime, setElapseTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if(isRunning){
      intervalIdRef.current = setInterval(() => {
        setElapseTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    }

  }, [isRunning]);

  function start(){
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapseTime; 
    console.log(startTimeRef.current);
  }

  function stop(){
    setIsRunning(false);
    
  }

  function reset(){
    setIsRunning(false);
    setElapseTime(0);

  }

  function formatTime(){

    let hours = Math.floor(elapseTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapseTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapseTime / (1000) % 60);
    let miliseconds = Math.floor((elapseTime % 1000) / 10);


    return `${hours}:${minutes}:${seconds}:${miliseconds}`;
  }

  return(    
      <div className='stopwatch'>
        <div className='display'>{formatTime()}
        </div>
        <div className='controls'>
            <button onClick={start} className='start-button'>Start</button>
            <button onClick={stop} className='stop-button'>Stop</button>
            <button onClick={reset} className='reset-button'>Reset</button>
        </div>

      </div>)
}
export default Stopwatch