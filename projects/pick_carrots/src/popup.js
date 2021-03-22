'use strict';

export default class Popup {
  constructor() {
    this.popup = document.querySelector('.game__popup');
    this.popupMessage = document.querySelector('.popup__message');
  }

  setPopupMessage(message) {
    this.message = message;
  }

  show() {
    this.popup.classList.remove('hidden');
    this.popupMessage.textContent = this.message;
  }

  hide() {
    this.popup.classList.add('hidden');
  }
}
