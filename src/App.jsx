import { useState } from "react";
import "./styles.css";

function BreakComp() {
  const [breakTime, setBreakTime] = useState(5);

  return (
    <>
      <h2>Break Length</h2>
      <button>Increase</button>
      <button>Decrease</button>
      <h2>{breakTime}</h2>
    </>
  );
}

function SessionComp() {
  const [sessionTime, setSessionTime] = useState(25);
  return (
    <>
      <h2>Session Length</h2>
      <button>Increase</button>
      <button>Decrease</button>
      <h2>{sessionTime}</h2>
    </>
  );
}

function TimerComp() {
  return (
    <>
      <h2>Session</h2>
      <h2>Value</h2>
      <button>Start</button>
      <button>Pause</button>
      <button>Restart</button>
    </>
  );
}

function App() {
  return (
    <>
      <h1>25+5 Clock</h1>
      <BreakComp />
      <SessionComp />
      <TimerComp />
    </>
  );
}

export default App;
