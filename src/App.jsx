import { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [isSession, setIsSession] = useState(true);
  const [timeLeft, setTimeLeft] = useState(sessionTime);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let timerInterval = null;
    if (timerRunning) {
      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 999);
    } else if (!timerRunning) {
      clearInterval(timerInterval);
    } else {
      console.log("error");
    }

    if (timeLeft <= 0) {
      document.getElementById("beep").play();
      if (isSession) {
        setIsSession(false);
        setTimeLeft(breakTime * 60);
      } else if (!isSession) {
        setIsSession(true);
        setTimeLeft(sessionTime * 60);
      } else {
        console.log("error");
      }
    }

    return () => clearInterval(timerInterval);
    timerInterval = null;
  }, [timerRunning, timeLeft]);

  useEffect(() => {
    if (isSession) {
      setTimeLeft(sessionTime * 60);
    } else if (!isSession) {
      setTimeLeft(breakTime * 60);
    } else {
      console.log("error");
    }
  }, [sessionTime, breakTime, isSession]);

  const startStopTimer = () => {
    setTimerRunning((prev) => !prev);
  };

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
    if (timerRunning) {
      return;
    }
    if (sessionTime < 60) {
      setSessionTime((prevSessionTime) => prevSessionTime + 1);
    }
  };
  const decreaseSessionTime = () => {
    if (timerRunning) {
      return;
    }
    if (sessionTime > 1) {
      setSessionTime((prevSessionTime) => prevSessionTime - 1);
    }
  };
  const increaseBreakTime = () => {
    if (timerRunning) {
      return;
    }
    if (breakTime < 60) {
      setBreakTime((prevBreakTime) => prevBreakTime + 1);
    }
  };
  const decreaseBreakTime = () => {
    if (timerRunning) {
      return;
    }
    if (breakTime > 1) {
      setBreakTime((prevBreakTime) => prevBreakTime - 1);
    }
  };

  const resetTimer = () => {
    setSessionTime(25);
    setBreakTime(5);
    setIsSession(true);
    setTimerRunning(false);
    setTimeLeft(sessionTime * 60);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  };

  const displayText = () => {
    if (isSession) {
      return "Session";
    } else if (!isSession) {
      return "Break";
    } else {
      console.log("error");
    }
  };
  return (
    <>
      <h1 id="title">25 + 5 Clock</h1>
      <div id="inputs-wrapper">
        <div id="session-wrapper">
          <h2 id="session-label">Session Time</h2>
          <h2 id="session-length">{sessionTime}</h2>
          <button id="session-increment" onClick={increaseSessionTime}>
            Increase
          </button>
          <button id="session-decrement" onClick={decreaseSessionTime}>
            Decrease
          </button>
        </div>
        <div id="break-wrapper">
          <h2 id="break-label">Break Time</h2>
          <h2 id="break-length">{breakTime}</h2>
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
        <button id="start_stop" onClick={startStopTimer}>
          Start / Stop
        </button>
        <button id="reset" onClick={resetTimer}>
          Reset
        </button>
        <audio
          id="beep"
          src="https://upload.wikimedia.org/wikipedia/commons/1/11/H_is_for_horse.ogg"
        ></audio>
      </div>
    </>
  );
}

export default App;
