const btnCode = document.querySelector('#btn-code');

const grid = {
  screen: '', // mobile, tabelt, desktop
  breakpoint: 0, // 768, 1200
  fixture: '', // sm, md, lg, xl
  columns: 0, // 2, 4, 6, 12
  gutter: 0, // 20
  margin: 0, // fixed or 'auto'(if unit fixed)
  unit: 0, // auto((100%-margin*2)/columns-gutter) or fixed
  unitFixedCheck: false, // true, false
  container: 0, // auto(100%-margin*2) or maxwidth(containerMaxwidth+margin*2)
  containerMaxCheck: false, // true, false
  containerMaxWidth: 0, // 960
};

class Input {
  constructor(inputId, formId, option) {
    this.value = undefined;
    this.validated = false;
    this.warning = '';

    this.required =
      typeof option?.required === 'boolean' ? option.required : false;
    this.isNum = typeof option?.isNum === 'boolean' ? option.required : true;

    this.formId = formId;
    this.form = document.querySelector(`#${this.formId}`);
    this.inputId = inputId;
    this.input = this.form.querySelector(`#${this.inputId}`);
    this.input.addEventListener('input', () => {
      this.onInput?.();
    });

    this.checkbox =
      option?.hasCheckbox === true
        ? this.form.querySelector(`#${inputId}-check`)
        : undefined;
    this.checkbox?.addEventListener('change', () => {
      this.onChange?.();
    });
  }

  setInputListener(onInput) {
    this.onInput = onInput;
  }

  setCheckboxListener(onChange) {
    this.onChange = onChange;
  }

  setValue() {
    let inputValue = this.input.value;
    if (this.required) {
      this.validateRequired(inputValue);
      if (!this.validated) {
        this.value = undefined;
        return;
      }
    }
    if (this.isNum) {
      this.validateNumber(inputValue);
      if (!this.validated) {
        this.value = undefined;
        return;
      }
      inputValue = Number(inputValue);
    }
    this.validated = true;
    this.warning = '';
    this.value = inputValue;
  }

  validateRequired(inputValue) {
    if (inputValue === '') {
      this.warning = 'This field is required';
      this.validated = false;
    } else {
      this.warning = '';
      this.validated = true;
    }
  }

  validateNumber(inputValue) {
    const numberValue = Number(inputValue);
    if (isNaN(numberValue)) {
      this.warning = 'Please enter only digits';
      this.validated = false;
    } else if (numberValue % 1 !== 0) {
      this.warning = 'Please enter only integers';
      this.validated = false;
    } else if (numberValue < 0) {
      this.warning = 'Please enter a number greater than or equal to 0';
      this.validated = false;
    } else if (this.input.id === 'columns' && numberValue === 0) {
      this.warning = 'Please enter a number greater than 0';
      this.validated = false;
    } else {
      this.warning = '';
      this.validated = true;
    }
  }

  showWarning(message) {
    const inputWarning = this.form.querySelector(`#${this.inputId}-warning`);
    this.warning = message ? message : this.warning;
    inputWarning.textContent = this.warning;
    this.input.classList.add('invalid');
  }

  hideWarning() {
    const inputWarning = this.form.querySelector(`#${this.inputId}-warning`);
    this.input.classList.remove('invalid');
  }

  showDesc() {
    const inputDesc = this.form.querySelector(`#${this.inputId}-desc`);
    inputDesc.classList.add('active');
  }

  hideDesc() {
    const inputDesc = this.form.querySelector(`#${this.inputId}-desc`);
    inputDesc.classList.remove('active');
  }

  updateSpan() {
    const inputSpan = this.form.querySelector(`#${this.inputId}-span`);
    let spanValue;
    if (inputSpan.id === 'fixture-span' || inputSpan.id === 'columns-span') {
      spanValue = this.value ? `-${this.value}` : '';
    } else {
      spanValue = this.value ? this.value : '';
    }
    inputSpan.textContent = spanValue;
  }

  changePlaceholder(content) {
    this.input.placeholder = content;
  }

  addReadOnly() {
    this.input.readOnly = true;
    this.value = undefined;
    this.validated = false;
    this.input.value = '';
    this.input.placeholder = 'auto';
  }

  removeReadOnly() {
    this.input.readOnly = false;
    this.input.placeholder = '';
  }

  addCheckboxDisabled() {
    this.checkbox.checked = false;
    this.checkbox.disabled = true;
    this.addReadOnly();
  }

  removeCheckboxDisabled() {
    this.checkbox.disabled = false;
    // this.removeReadOnly();
  }
}

const screen = new Input('screen', 'grid-form', { isNum: false });
const breakpoint = new Input('breakpoint', 'grid-form');
const fixture = new Input('fixture', 'grid-form', { isNum: false });
const columns = new Input('columns', 'grid-form', { required: true });
const gutter = new Input('gutter', 'grid-form');
const margin = new Input('margin', 'grid-form');
const unit = new Input('unit', 'grid-form', { hasCheckbox: true });
const container = new Input('container', 'grid-form', { hasCheckbox: true });

screen.setInputListener(function () {
  this.setValue();
  this.changePlaceholder('');
});

breakpoint.setInputListener(function () {
  this.setValue();
  this.changePlaceholder('');
  if (!this.validated) {
    this.showWarning();
    this.hideDesc();
    return;
  }
  this.hideWarning();
  if (this.value === 0) {
    this.hideDesc();
    return;
  }
  this.updateSpan();
  this.showDesc();
});

fixture.setInputListener(function () {
  this.setValue();
  this.changePlaceholder('');
  this.updateSpan();
  this.showDesc();
});

columns.setInputListener(function () {
  this.setValue();
  this.changePlaceholder('');
  if (!this.validated) {
    this.showWarning();
  } else {
    this.hideWarning();
    fixture.showDesc();
  }
  this.updateSpan();
});

gutter.setInputListener(function () {
  this.setValue();
  this.changePlaceholder('');
  if (!this.validated) {
    this.showWarning();
  } else {
    this.hideWarning();
  }
});

margin.setInputListener(function () {
  this.setValue();
  this.changePlaceholder('');
  if (!this.validated) {
    this.showWarning();
  } else {
    this.hideWarning();
  }
});

unit.setCheckboxListener(function () {
  if (this.checkbox.checked) {
    this.removeReadOnly();
    margin.addReadOnly();
    container.addCheckboxDisabled();
  } else {
    this.addReadOnly();
    margin.removeReadOnly();
    container.removeCheckboxDisabled();
  }
});

unit.setInputListener(function () {
  this.setValue();
  this.changePlaceholder('');
  if (!this.validated) {
    this.showWarning();
  } else {
    this.hideWarning();
  }
});

container.setCheckboxListener(function () {
  if (this.checkbox.checked) {
    this.showDesc();
    this.removeReadOnly();
    margin.removeReadOnly();
    unit.addCheckboxDisabled();
  } else {
    this.hideDesc();
    this.addReadOnly();
    unit.removeCheckboxDisabled();
  }
});

container.setInputListener(function () {
  this.setValue();
  this.changePlaceholder('');
  if (!this.validated) {
    this.hideDesc();
    this.showWarning();
  } else {
    this.hideWarning();
    this.showDesc();
  }
});
