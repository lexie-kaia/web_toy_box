'use strict';

const soundCarrot = new Audio('./sound/carrot_pull.mp3');
const soundWin = new Audio('./sound/game_win.mp3');
const soundLose = new Audio('./sound/game_lose.mp3');
const soundStopped = new Audio('./sound/game_stop.wav');
const soundBg = new Audio('./sound/bg.mp3');

const playSound = (sound) => {
  sound.currentTime = 0;
  sound.play();
};

const stopSound = (sound) => {
  sound.pause();
};

export const playCarrot = () => {
  playSound(soundCarrot);
};

export const playWin = () => {
  playSound(soundWin);
};
export const playlose = () => {
  playSound(soundLose);
};
export const playStop = () => {
  playSound(soundStopped);
};
export const playBg = () => {
  playSound(soundBg);
};
export const stopBg = () => {
  stopSound(soundBg);
};
