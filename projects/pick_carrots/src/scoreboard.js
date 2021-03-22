'use strict';

export default class Scoreboard {
  constructor() {
    this.scoreboard = document.querySelector('.game__scoreboard');
    this.score = document.querySelector('.score');
    this.timer = document.querySelector('.timer');
    this.countDown = undefined;
  }

  show() {
    this.scoreboard.classList.remove('hidden');
  }

  updateTimer = (time) => {
    const seconds = time % 60;
    const minutes = Math.floor(time / 60);
    let timerSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    let timerMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    this.timer.textContent = `${timerMinutes}:${timerSeconds}`;
  };

  setTimer(timeLimit, onTimerEnd) {
    let time = timeLimit;
    this.updateTimer(time);
    this.countDown = setInterval(() => {
      this.updateTimer(--time);
      if (time <= 0) {
        clearInterval(this.countDown);
        onTimerEnd();
        return;
      }
    }, 1000);
  }

  stopTimer = () => {
    clearInterval(this.countDown);
  };

  updateScore(targetCount) {
    this.score.textContent = targetCount;
  }
}
