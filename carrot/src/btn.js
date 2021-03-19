'use strict';

export default class Btn {
  constructor(selector) {
    this.btn = document.querySelector(selector);
    this.btn.addEventListener('click', () => {
      this.onBtnClick && this.onBtnClick();
    });
  }

  setClickListener(onBtnClick) {
    this.onBtnClick = onBtnClick;
  }

  show() {
    this.btn.classList.remove('hidden');
  }

  hide() {
    this.btn.classList.add('hidden');
  }

  change() {
    this.btn.innerHTML = '<i class="fas fa-reply"></i>';
  }
}
