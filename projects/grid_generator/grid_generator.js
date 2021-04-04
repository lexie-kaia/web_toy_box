import FormBtns from './form_btns.js';

const input = Object.freeze({
  screen: 'screen',
  breakpoint: 'breakpoint',
  fixture: 'fixture',
  columns: 'columns',
  gutter: 'gutter',
  margin: 'margin',
  unit: 'unit',
  container: 'container',
  suffix: {
    warning: 'warning',
    desc: 'desc',
    span: 'span',
    check: 'check',
  },
});

const formIds = ['form-1', 'form-2', 'form-3'];

const formBtns = new FormBtns();

class Input {
  constructor(inputId, formId, option) {
    this.required =
      typeof option?.required === 'boolean' ? option.required : false;
    this.isNum = typeof option?.isNum === 'boolean' ? option.required : true;

    this.formId = formId;
    this.inputId = inputId;
    this.input = document.querySelector(`#${this.formId}-${this.inputId}`);
    this.input.addEventListener('input', () => {
      this.onInput?.();
    });
    this.input.addEventListener('focus', () => {
      this.changePlaceholder('');
    });

    this.checkbox =
      option?.hasCheckbox === true
        ? document.querySelector(
            `#${this.formId}-${inputId}-${input.suffix.check}`
          )
        : undefined;
    this.checkbox?.addEventListener('change', () => {
      this.onChange?.();
    });

    this.value = this.isNum ? (this.inputId === input.columns ? 1 : 0) : '';
    this.validated = false;
    this.warning = '';
  }

  setInputListener(onInput) {
    this.onInput = onInput;
  }

  setCheckListener(onChange) {
    this.onChange = onChange;
  }

  setValue() {
    let inputValue = this.input.value;
    if (this.required) {
      this.validateRequired(inputValue);
      if (!this.validated) {
        this.value = this.isNum ? (this.inputId === input.columns ? 1 : 0) : '';
        return;
      }
    }
    if (this.isNum) {
      this.validateNumber(inputValue);
      if (!this.validated) {
        this.value = this.inputId === input.columns ? 1 : 0;
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
    } else if (this.inputId === input.columns && numberValue === 0) {
      this.warning = 'Please enter a number greater than 0';
      this.validated = false;
    } else {
      this.warning = '';
      this.validated = true;
    }
  }

  showWarning(message) {
    const inputWarning = document.querySelector(
      `#${this.formId}-${this.inputId}-${input.suffix.warning}`
    );
    this.warning = message ? message : this.warning;
    inputWarning.textContent = this.warning;
    this.input.classList.add('invalid');
  }

  hideWarning() {
    const inputWarning = document.querySelector(
      `#${this.formId}-${this.inputId}-${input.suffix.warning}`
    );
    this.input.classList.remove('invalid');
  }

  showDesc() {
    const inputDesc = document.querySelector(
      `#${this.formId}-${this.inputId}-${input.suffix.desc}`
    );
    inputDesc.classList.add('active');
  }

  hideDesc() {
    const inputDesc = document.querySelector(
      `#${this.formId}-${this.inputId}-${input.suffix.desc}`
    );
    inputDesc.classList.remove('active');
  }

  updateSpan() {
    const inputSpan = document.querySelector(
      `#${this.formId}-${this.inputId}-${input.suffix.span}`
    );
    let spanValue;
    if (this.inputId === input.fixture || this.inputId === input.columns) {
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
  }
}

class Form {
  constructor(formId) {
    this.formId = formId;
    this.grid = {
      form: this.formId,
      active: this.formId === formIds[0] ? true : false,
      screen: '', // mobile, tabelt, desktop
      breakpoint: 0, // 768, 1200
      fixture: '', // sm, md, lg, xl
      columns: 0, // 2, 4, 6, 12
      gutter: 0, // 20
      gutterHalf: 0,
      margin: 0, // fixed or 'auto'(if unit fixed)
      unit: 0, // auto((100%-margin*2)/columns-gutter) or fixed
      unitFixedCheck: false, // true, false
      container: 0, // auto(100%-margin*2) or maxwidth(containerMaxwidth+margin*2)
      containerMaxCheck: false, // true, false
      containerMaxWidth: 0, // 960
    };

    this.screen = new Input(input.screen, this.formId, { isNum: false });
    this.breakpoint = new Input(input.breakpoint, this.formId);
    this.fixture = new Input(input.fixture, this.formId, { isNum: false });
    this.columns = new Input(input.columns, this.formId, { required: true });
    this.gutter = new Input(input.gutter, this.formId);
    this.margin = new Input(input.margin, this.formId);
    this.unit = new Input(input.unit, this.formId, { hasCheckbox: true });
    this.container = new Input(input.container, this.formId, {
      hasCheckbox: true,
    });
    this.active = document.querySelector(`#${formId}-active-check`);
    this.active?.addEventListener('change', (event) => {
      this.onActiveChange?.(event);
    });

    this.screen.setInputListener(() => {
      this.screen.setValue();
      this.updateGrid();
    });

    this.breakpoint.setInputListener(() => {
      this.breakpoint.setValue();
      if (!this.breakpoint.validated) {
        this.breakpoint.showWarning();
        this.breakpoint.hideDesc();
      } else {
        this.breakpoint.hideWarning();
        if (this.breakpoint.value === 0) {
          this.breakpoint.hideDesc();
          return;
        }
        this.breakpoint.updateSpan();
        this.breakpoint.showDesc();
      }
      this.updateGrid();
    });

    this.fixture.setInputListener(() => {
      this.fixture.setValue();
      this.fixture.updateSpan();
      this.fixture.showDesc();
      this.updateGrid();
    });

    this.columns.setInputListener(() => {
      this.columns.setValue();
      if (!this.columns.validated) {
        this.columns.showWarning();
      } else {
        this.columns.hideWarning();
      }
      this.updateGrid();
    });

    this.gutter.setInputListener(() => {
      this.gutter.setValue();
      if (!this.gutter.validated) {
        this.gutter.showWarning();
      } else {
        this.gutter.hideWarning();
      }
      this.updateGrid();
    });

    this.margin.setInputListener(() => {
      this.margin.setValue();
      if (!this.margin.validated) {
        this.margin.showWarning();
      } else {
        this.margin.hideWarning();
      }
      this.updateGrid();
    });

    this.unit.setCheckListener(() => {
      if (this.unit.checkbox.checked) {
        this.unit.removeReadOnly();
        this.margin.addReadOnly();
        this.container.addCheckboxDisabled();
      } else {
        this.unit.addReadOnly();
        this.margin.removeReadOnly();
        this.container.removeCheckboxDisabled();
      }
      this.updateGrid();
    });

    this.unit.setInputListener(() => {
      this.unit.setValue();
      if (!this.unit.validated) {
        this.unit.showWarning();
      } else {
        this.unit.hideWarning();
      }
      this.updateGrid();
    });

    this.container.setCheckListener(() => {
      if (this.container.checkbox.checked) {
        this.container.showDesc();
        this.container.removeReadOnly();
        this.margin.removeReadOnly();
        this.unit.addCheckboxDisabled();
      } else {
        this.container.hideDesc();
        this.container.addReadOnly();
        this.unit.removeCheckboxDisabled();
      }
      this.updateGrid();
    });

    this.container.setInputListener(() => {
      this.container.setValue();
      if (!this.container.validated) {
        this.container.hideDesc();
        this.container.showWarning();
      } else {
        this.container.hideWarning();
        this.container.showDesc();
      }
      this.updateGrid();
    });
  }

  onActiveChange(event) {
    this.grid.active = this.active.checked;
  }

  updateGrid() {
    this.grid.screen = this.screen.value;
    this.grid.breakpoint = this.breakpoint.value;
    this.grid.fixture = this.fixture.value;

    this.grid.columns = this.columns.value;
    this.grid.gutter = this.gutter.value;
    this.grid.gutterHalf = this.gutter.value / 2;

    this.grid.unitFixedCheck = this.unit.checkbox.checked;
    this.grid.containerMaxCheck = this.container.checkbox.checked;

    if (!this.grid.unitFixedCheck && !this.grid.containerMaxCheck) {
      this.grid.margin = this.margin.value;
      this.grid.container = 0;
      this.grid.containerMaxWidth = this.grid.container;
    } else if (this.grid.unitFixedCheck) {
      this.grid.margin = 0;
      this.grid.unit = this.unit.value;
      this.grid.container =
        (this.grid.unit + this.grid.gutter) * this.grid.columns;
      this.grid.containerMaxWidth = this.grid.container;
    } else if (this.grid.containerMaxCheck) {
      this.grid.margin = this.margin.value;
      this.grid.unit = 0;
      this.grid.container = this.container.value;
      this.grid.containerMaxWidth = this.grid.container + this.grid.margin * 2;
    }
  }
}
