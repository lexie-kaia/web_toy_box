// visibility
const targetDisplay = document.querySelector('.target-display');
const hideDisplay = document.querySelector('.hide-display');

targetDisplay.addEventListener('click', () => {
  hideDisplay.classList.toggle('show-display');
});

const targetVisibility = document.querySelector('.target-visibility');
const hideVisibility = document.querySelector('.hide-visibility');

targetVisibility.addEventListener('click', () => {
  hideVisibility.classList.toggle('show-visibility');
});

const targetHeight = document.querySelector('.target-height');
const hideHeight = document.querySelector('.hide-height');

targetHeight.addEventListener('click', () => {
  hideHeight.classList.toggle('show-height');
});

const targetTranslate = document.querySelector('.target-translate');
const hideTranslate = document.querySelector('.hide-translate');

targetTranslate.addEventListener('click', () => {
  hideTranslate.classList.toggle('show-translate');
});

const targetScale = document.querySelector('.target-scale');
const hideScale = document.querySelector('.hide-scale');

targetScale.addEventListener('click', () => {
  hideScale.classList.toggle('show-scale');
});
