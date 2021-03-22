'use strict';

export default class Field {
  constructor() {
    this.field = document.querySelector('.game__field');
    this.targetArea = document.querySelector('.field__target-area');
    this.field.addEventListener('click', (event) => {
      this.onClick && this.onClick(event);
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  setTarget(target) {
    for (let i = 0; i < target.count; i++) {
      const gameTarget = document.createElement('img');
      gameTarget.setAttribute('src', target.imgPath);
      gameTarget.classList.add('field__target', target.name);
      const xPosition = Math.random() * 100;
      const yPosition = Math.random() * 100;
      gameTarget.style.top = `${xPosition}%`;
      gameTarget.style.left = `${yPosition}%`;
      this.targetArea.append(gameTarget);
    }
  }

  cleanTargetArea() {
    this.targetArea.innerHTML = '';
  }
}
