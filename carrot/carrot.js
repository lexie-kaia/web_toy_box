// game setup data
const bug = {
  name: 'bug',
  imgPath: './img/bug.png',
  count: 5,
};

const carrot = {
  name: 'carrot',
  imgPath: './img/carrot.png',
  count: 3,
};

const timeLimitSec = 5;

const message = {
  title: 'Pick Carrots',
  stopped: 'Replay?',
  win: 'You won!',
  lose: 'You lose',
};

// document object
const scoreboard = document.querySelector('.game__scoreboard');
const field = document.querySelector('.game__field');
const targetArea = document.querySelector('.field__target-area');
const popup = document.querySelector('.game__popup');
const popupMessage = document.querySelector('.popup__message');
const score = document.querySelector('.score');
const timer = document.querySelector('.timer');
const playBtn = document.querySelector('.btn__play');
const stopBtn = document.querySelector('.btn__stop');

// audio object
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const loseSound = new Audio('./sound/game_lose.mp3');
const stopSound = new Audio('./sound/game_stop.wav');
const bgSound = new Audio('./sound/bg.mp3');

// game play status
let started = false;
let ended = '';
let gameScore = 0;
let gameTimer = undefined;

const showPopup = () => {
  popup.classList.remove('hidden');
  switch (ended) {
    case 'stopped':
      popupMessage.textContent = message.stopped;
      break;
    case 'win':
      popupMessage.textContent = message.win;
      break;
    case 'lose':
      popupMessage.textContent = message.lose;
      break;
    default:
      popupMessage.textContent = message.title;
  }
  playBtn.innerHTML = '<i class="fas fa-reply"></i>';
};

const showStopBtn = () => {
  stopBtn.classList.remove('hidden');
};

const hideStopBtn = () => {
  stopBtn.classList.add('hidden');
};

const hidePopup = () => {
  popup.classList.add('hidden');
};

const showScoreboard = () => {
  scoreboard.classList.remove('hidden');
};

const updateTimer = (time) => {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);
  let timerSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  let timerMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  timer.textContent = `${timerMinutes}:${timerSeconds}`;
};

const startTimer = (timeLimit) => {
  let time = timeLimit;
  updateTimer(time);
  gameTimer = setInterval(() => {
    updateTimer(--time);
    if (time <= 0) {
      clearInterval(gameTimer);
      loseSound.play();
      finishGame('lose');
      return;
    }
  }, 1000);
};

const stopTimer = () => {
  clearInterval(gameTimer);
};

const updateScore = (targetCount) => {
  gameScore = targetCount;
  score.textContent = gameScore;
};

const cleanTargetArea = () => {
  targetArea.innerHTML = '';
};

const setTarget = (target) => {
  for (let i = 0; i < target.count; i++) {
    const gameTarget = document.createElement('img');
    gameTarget.setAttribute('src', target.imgPath);
    gameTarget.classList.add('field__target', target.name);
    const xPosition = Math.random() * 100;
    const yPosition = Math.random() * 100;
    gameTarget.style.top = `${xPosition}%`;
    gameTarget.style.left = `${yPosition}%`;
    targetArea.append(gameTarget);
  }
};

const startGame = () => {
  started = true;
  hidePopup();
  showStopBtn();
  showScoreboard();
  startTimer(timeLimitSec);
  updateScore(carrot.count);
  cleanTargetArea();
  setTarget(bug);
  setTarget(carrot);
  bgSound.play();
};

const finishGame = (endedStatus) => {
  started = false;
  ended = endedStatus;
  showPopup();
  hideStopBtn();
  stopTimer();
  bgSound.pause();
  bgSound.currentTime = 0;
};

const stopGame = () => {
  stopSound.play();
  finishGame('stopped');
};

const onFieldClick = (event) => {
  if (!started) return;
  if (event.target.matches('.carrot')) {
    carrotSound.play();
    event.target.remove();
    updateScore(--gameScore);
    if (gameScore <= 0) {
      winSound.play();
      finishGame('win');
    }
  } else if (event.target.matches('.bug')) {
    loseSound.play();
    finishGame('lose');
  }
};

playBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
field.addEventListener('click', onFieldClick);
