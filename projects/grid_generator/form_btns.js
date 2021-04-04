export default class FormBtns {
  constructor() {
    this.formSection = document.querySelector('.form-section');
    this.formList = this.formSection.querySelector('.js-form-list');
    this.btnSwipeLeft = this.formSection.querySelector('.js-btn-swipe-left');
    this.btnSwipeRight = this.formSection.querySelector('.js-btn-swipe-right');
    this.btnAddBpList = this.formSection.querySelectorAll('.js-btn-add-bp');
    this.btnRemoveBpList = this.formSection.querySelectorAll(
      '.js-btn-remove-bp'
    );
    this.btnViewCode = this.formSection.querySelector('.js-btn-view-code');

    this.btnSwipeLeft.addEventListener('click', () => {
      this.onLeftClick();
    });
    this.btnSwipeRight.addEventListener('click', () => {
      this.onRightClick();
    });
    this.btnAddBpList.forEach((btnAddBp) => {
      btnAddBp.addEventListener('click', (event) => {
        this.onAddBpClick(event);
      });
    });
    this.btnRemoveBpList.forEach((btnRemoveBp) => {
      btnRemoveBp.addEventListener('click', (event) => {
        this.onRemoveBpClick(event);
      });
    });
    this.btnViewCode.addEventListener('click', () => {
      this.onViewCodeClick();
    });
  }

  onLeftClick() {
    let showNumber = this.getDatasetSuffixNumber(this.formList, 'show');
    if (showNumber !== 2 && showNumber !== 3) return;
    if (showNumber === 3) {
      this.showElem(this.btnSwipeRight);
    } else if (showNumber === 2) {
      this.hideElem(this.btnSwipeLeft);
    }
    showNumber -= 1;
    this.createDatasetWithSuffixNumber(this.formList, 'show', showNumber);
  }

  onRightClick() {
    let showNumber = this.getDatasetSuffixNumber(this.formList, 'show');
    if (showNumber !== 1 && showNumber !== 2) return;
    if (showNumber === 1) {
      this.showElem(this.btnSwipeLeft);
    } else if (showNumber === 2) {
      this.hideElem(this.btnSwipeRight);
    }
    showNumber += 1;
    this.createDatasetWithSuffixNumber(this.formList, 'show', showNumber);
  }

  onAddBpClick(event) {
    const btn = event.currentTarget;
    const cover = btn.parentNode;
    const formNumber = this.getDatasetSuffixNumber(btn, 'form');
    this.hideElem(cover);
    this.activateForm(formNumber);
  }

  onRemoveBpClick(event) {
    const btn = event.currentTarget;
    const formNumber = this.getDatasetSuffixNumber(btn, 'form');
    const cover = this.formSection.querySelector(
      `#form-${formNumber} .form-cover`
    );

    this.showElem(cover);
    this.deactivateForm(formNumber);
  }

  onViewCodeClick(event) {
    const codeSection = document.querySelector('.code-simulator');
    codeSection.scrollIntoView({ behavior: 'smooth' });
  }

  showElem(elem) {
    elem.classList.remove('hide');
  }

  hideElem(elem) {
    elem.classList.add('hide');
  }

  getDatasetSuffixNumber(target, datasetName) {
    const data = target.getAttribute(`data-${datasetName}`);
    const dataSplit = data.split('-');
    const dataNumber = Number(dataSplit[1]);
    return dataNumber;
  }

  createDatasetWithSuffixNumber(target, datasetName, number) {
    const dataset = `${datasetName}-${number}`;
    target.setAttribute(`data-${datasetName}`, dataset);
  }

  activateForm(formNumber) {
    const inputActive = this.formSection.querySelector(
      `#form-${formNumber}-active-check`
    );
    const inputList = this.formSection.querySelectorAll(
      `#form-${formNumber} input`
    );
    inputList.forEach((input) => {
      input.disabled = false;
    });
    inputActive.click();
  }

  deactivateForm(formNumber) {
    const inputActive = this.formSection.querySelector(
      `#form-${formNumber}-active-check`
    );
    const inputList = this.formSection.querySelectorAll(
      `#form-${formNumber} input`
    );
    inputActive.click();
    inputList.forEach((input) => {
      input.disabled = true;
    });
  }
}
