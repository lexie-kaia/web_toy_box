'use strict';

import GameBuilder from './game.js';

const CARROT = {
  name: 'carrot',
  imgPath: './img/carrot.png',
  count: 10,
  selector: '.carrot',
};

const BUG = {
  name: 'bug',
  imgPath: './img/bug.png',
  count: 10,
  selector: '.bug',
};

let TIME_LIMIT_SEC = 10;

const POPUP_MESSAGE = {
  stopped: 'Replay?',
  win: 'You won!',
  lose: 'You lose',
};

const btnStart = document.querySelector('.btn__start');
const carrotCount = document.querySelector('#carrot');
const bugCount = document.querySelector('#bug');
const timeLimitSec = document.querySelector('#time');
const gameTitle = document.querySelector('.game__title');

btnStart.addEventListener('click', () => {
  gameTitle.classList.add('hidden');

  CARROT.count = carrotCount.value;
  BUG.count = bugCount.value;
  TIME_LIMIT_SEC = timeLimitSec.value;

  const game = new GameBuilder()
    .withMainItem(CARROT)
    .withObstacle(BUG)
    .withTimeLimitSec(TIME_LIMIT_SEC)
    .withPopupMessage(POPUP_MESSAGE)
    .build();

  game.start();
});
