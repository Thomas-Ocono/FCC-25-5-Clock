import { Component } from "react";
import "./Pomodoro.css";

class Pomodoro extends Component {
  state = {
    timerRunning: false,
    isSession: true,
    time: 1500,
    breakTime: 5,
    sessionTime: 25,
  };

  increaseSessionTime = () => {
    if (this.state.timerRunning || this.state.sessionTime >= 60) {
      return;
    }
    this.setState({ sessionTime: this.state.sessionTime + 1 }, () => {
      this.setState({ time: this.state.sessionTime * 60 });
    });
  };
  decreaseSessionTime = () => {
    if (this.state.timerRunning || this.state.sessionTime <= 1) {
      return;
    }
    this.setState({ sessionTime: this.state.sessionTime - 1 }, () => {
      this.setState({ time: this.state.sessionTime * 60 });
    });
  };
  increaseBreakTime = () => {
    if (this.state.timerRunning || this.state.breakTime >= 60) {
      return;
    }
    this.setState({ breakTime: this.state.breakTime + 1 });
  };
  decreaseBreakTime = () => {
    if (this.state.timerRunning || this.state.breakTime <= 1) {
      return;
    }
    this.setState({ breakTime: this.state.breakTime - 1 });
  };
  reset = () => {
    this.setState({
      timerRunning: false,
      isSession: true,
      time: 1500,
      breakTime: 5,
      sessionTime: 25,
    });
    clearInterval(this.timer);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  };

  start_stop = () => {
    if (this.state.timerRunning) {
      this.setState({ timerRunning: false });
      clearInterval(this.timer);
    } else if (!this.state.timerRunning) {
      this.setState({ timerRunning: true });
      if (this.state.time > 0) {
        this.timer = setInterval(() => {
          let current = this.state.time;
          let isSesh = this.state.isSession;
          if (current > 0) {
            current = current - 1;
          } else if (current == 0 && isSesh == true) {
            current = this.state.breakTime * 60;
            isSesh = false;
            document.getElementById("beep").play();
          } else if (current == 0 && !isSesh) {
            current = this.state.sessionTime * 60;
            isSesh = true;
            document.getElementById("beep").play();
          }
          this.setState({
            time: current,
            isSession: isSesh,
          });
        }, 1000);
      }
    }
  };

  render() {
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
    const displayText = (isItSession) => {
      if (isItSession) {
        return "Session";
      } else {
        return "Break";
      }
    };

    return (
      <>
        <div id="comp-wrapper">
          <h1 id="title">25 + 5 Clock</h1>
          <div id="inputs-wrapper">
            <div id="session-wrapper">
              <h2 id="session-label">Session Time</h2>
              <h2 id="session-length">{this.state.sessionTime}</h2>
              <button id="session-increment" onClick={this.increaseSessionTime}>
                Increase
              </button>
              <button id="session-decrement" onClick={this.decreaseSessionTime}>
                Decrease
              </button>
            </div>
            <div id="break-wrapper">
              <h2 id="break-label">Break Time</h2>
              <h2 id="break-length">{this.state.breakTime}</h2>
              <button id="break-increment" onClick={this.increaseBreakTime}>
                Increase
              </button>
              <button id="break-decrement" onClick={this.decreaseBreakTime}>
                Decrease
              </button>
            </div>
          </div>
          <div id="timer-wrapper">
            <h2 id="timer-label">{displayText(this.state.isSession)}</h2>
            <h2 id="time-left">{formatTime(this.state.time)}</h2>
            <button id="start_stop" onClick={this.start_stop}>
              Start / Stop
            </button>
            <button id="reset" onClick={this.reset}>
              Reset
            </button>
            <audio
              id="beep"
              src="https://upload.wikimedia.org/wikipedia/commons/1/11/H_is_for_horse.ogg"
            ></audio>
          </div>
        </div>
      </>
    );
  }
}
export default Pomodoro;
