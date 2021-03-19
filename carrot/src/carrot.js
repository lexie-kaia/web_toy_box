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

const TIME_LIMIT_SEC = 10;

const POPUP_MESSAGE = {
  stopped: 'Replay?',
  win: 'You won!',
  lose: 'You lose',
};

const game = new GameBuilder()
  .withMainItem(CARROT)
  .withObstacle(BUG)
  .withTimeLimitSec(TIME_LIMIT_SEC)
  .withPopupMessage(POPUP_MESSAGE)
  .build();
