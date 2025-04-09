import { useState } from "react";
import "./styles.css";

function App() {
  const [sessionTime, setSessionTime] = useState(5);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [isSession, setIsSession] = useState(true);
  const [timeLeft, setTimeLeft] = useState(sessionTime);

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  };

  //todo: could use cleaning up, works tho
  const increaseSessionTime = () => {
    setSessionTime((prevSessionTime) => prevSessionTime + 60);
  };
  const decreaseSessionTime = () => {
    if (sessionTime > 60) {
      setSessionTime((prevSessionTime) => prevSessionTime - 60);
    }
  };
  const increaseBreakTime = () => {
    if (breakTime < 60 * 60) {
      setBreakTime((prevBreakTime) => prevBreakTime + 60);
    }
  };
  const decreaseBreakTime = () => {
    setBreakTime((prevBreakTime) => prevBreakTime - 60);
  };

  const resetTimer = () => {
    setSessionTime(25 * 60);
    setBreakTime(5 * 60);
  };

  const displayText = () => {
    if (isSession) {
      return "Session";
    } else {
      return "Break";
    }
  };
  return (
    <>
      <h1 id="title">25 + 5 Clock</h1>
      <div id="inputs-wrapper">
        <div id="session-wrapper">
          <h2 id="session-label">Session Time</h2>
          <h2 id="session-length">{formatTime(sessionTime)}</h2>
          <button id="session-increment" onClick={increaseSessionTime}>
            Increase
          </button>
          <button id="session-decrement" onClick={decreaseSessionTime}>
            Decrease
          </button>
        </div>
        <div id="break-wrapper">
          <h2 id="break-label">Break Time</h2>
          <h2 id="break-length">{formatTime(breakTime)}</h2>
          <button id="break-increment" onClick={increaseBreakTime}>
            Increase
          </button>
          <button id="break-decrement" onClick={decreaseBreakTime}>
            Decrease
          </button>
        </div>
      </div>
      <div id="timer-wrapper">
        <h2 id="timer-label">{displayText()}</h2>
        <h2 id="time-left">{formatTime(timeLeft)}</h2>
        <button id="start_stop">Start / Stop</button>
        <button id="reset" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
