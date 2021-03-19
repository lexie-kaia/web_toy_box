'use strict';

import Field from './field.js';
import Scoreboard from './scoreboard.js';
import Popup from './popup.js';
import Btn from './btn.js';
import * as sound from './sound.js';

const ended = Object.freeze({
  stopped: 'stopped',
  win: 'win',
  lose: 'lose',
});

export default class GameBuilder {
  withMainItem(mainItem) {
    this.mainItem = mainItem;
    return this;
  }

  withObstacle(obstacle) {
    this.obstacle = obstacle;
    return this;
  }

  withTimeLimitSec(timeLimitSec) {
    this.timeLimitSec = timeLimitSec;
    return this;
  }

  withPopupMessage(popupMessage) {
    this.popupMessage = popupMessage;
    return this;
  }

  build() {
    return new Game(
      this.mainItem, //
      this.obstacle, //
      this.timeLimitSec, //
      this.popupMessage
    );
  }
}

class Game {
  constructor(mainItem, obstacle, timeLimitSec, popupMessage) {
    this.mainItem = mainItem;
    this.obstacle = obstacle;
    this.timeLimitSec = timeLimitSec;
    this.popupMessage = popupMessage;

    this.started = false;
    this.ended = '';
    this.gameScore = this.mainItem.count;

    this.popup = new Popup();
    this.field = new Field();
    this.scoreboard = new Scoreboard();
    this.stopBtn = new Btn('.btn__stop');
    this.playBtn = new Btn('.btn__play');

    this.playBtn.setClickListener(() => {
      this.start();
    });
    this.stopBtn.setClickListener(() => {
      this.finish(ended.stopped);
    });
    this.field.setClickListener((event) => {
      this.play(event);
    });
  }

  start() {
    this.started = true;
    this.gameScore = this.mainItem.count;
    this.popup.hide();
    this.stopBtn.show();
    this.scoreboard.show();
    this.scoreboard.setTimer(this.timeLimitSec, () => {
      this.finish(ended.lose);
    });
    this.scoreboard.updateScore(this.gameScore);
    this.field.cleanTargetArea();
    this.field.setTarget(this.obstacle);
    this.field.setTarget(this.mainItem);
    sound.playBg();
  }

  finish(endedStatus) {
    this.started = false;
    this.ended = endedStatus;
    this.scoreboard.stopTimer();
    sound.stopBg();
    switch (this.ended) {
      case ended.stopped:
        sound.playStop();
        this.popup.setPopupMessage(this.popupMessage.stopped);
        break;
      case ended.win:
        sound.playWin();
        this.popup.setPopupMessage(this.popupMessage.win);
        break;
      case ended.lose:
        sound.playlose();
        this.popup.setPopupMessage(this.popupMessage.lose);
        break;
    }
    this.playBtn.change();
    this.popup.show();
    this.stopBtn.hide();
  }

  play(event) {
    if (!this.started) return;
    if (event.target.matches(this.mainItem.selector)) {
      sound.playCarrot();
      event.target.remove();
      this.scoreboard.updateScore(--this.gameScore);
      if (this.gameScore <= 0) {
        this.finish(ended.win);
      }
    } else if (event.target.matches(this.obstacle.selector)) {
      this.finish(ended.lose);
    }
  }
}
