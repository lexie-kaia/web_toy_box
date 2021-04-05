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

class Btns {
  constructor() {
    this.formList = document.querySelector('.js-form-list');
    this.btnSwipeLeft = document.querySelector('.js-btn-swipe-left');
    this.btnSwipeRight = document.querySelector('.js-btn-swipe-right');
    this.btnAddBpList = document.querySelectorAll('.js-btn-add-bp');
    this.btnRemoveBpList = document.querySelectorAll('.js-btn-remove-bp');
    this.btnViewCode = document.querySelector('.js-btn-view-code');
    this.btnViewForm = document.querySelector('.js-btn-view-form');
    this.btnViewGrid = document.querySelector('.js-btn-view-grid');
    this.btnUp = document.querySelector('.js-btn-up');

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
    this.btnViewForm.addEventListener('click', () => {
      this.onViewFormClick();
    });
    this.btnViewGrid.addEventListener('click', () => {
      this.onViewGridClick();
    });
    this.btnUp.addEventListener('click', () => {
      this.onUpClick();
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
    const cover = document.querySelector(`#form-${formNumber} .form-cover`);

    this.showElem(cover);
    this.deactivateForm(formNumber);
  }

  onViewCodeClick() {
    const codeSection = document.querySelector('.code-simulator');
    codeSection.scrollIntoView({ behavior: 'smooth' });
  }

  onViewFormClick() {
    const formSection = document.querySelector('.form-section');
    formSection.scrollIntoView({ behavior: 'smooth' });
  }

  onViewGridClick() {
    const gridSimulator = document.querySelector('.grid-simulator');
    gridSimulator.scrollIntoView({ behavior: 'smooth' });
  }

  onUpClick() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
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
    const btnRemoveBp = document.querySelector(
      `#form-${formNumber} .js-btn-remove-bp`
    );
    this.showElem(btnRemoveBp);

    const inputList = document.querySelectorAll(`#form-${formNumber} input`);
    inputList.forEach((input) => {
      input.disabled = false;
    });

    const inputActive = document.querySelector(
      `#form-${formNumber}-active-check`
    );
    inputActive.click();
  }

  deactivateForm(formNumber) {
    const inputActive = document.querySelector(
      `#form-${formNumber}-active-check`
    );
    inputActive.click();
    const btnRemoveBp = document.querySelector(
      `#form-${formNumber} .js-btn-remove-bp`
    );
    this.hideElem(btnRemoveBp);
    const inputList = document.querySelectorAll(`#form-${formNumber} input`);
    inputList.forEach((input) => {
      input.disabled = true;
    });
  }
}

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

  addDisabled() {
    this.input.readOnly = true;
    this.value = undefined;
    this.validated = false;
    this.input.value = '';
    this.input.placeholder = 'auto';
    this.input.disabled = true;
  }

  removeDisabled() {
    this.input.readOnly = false;
    this.input.placeholder = '';
    this.input.disabled = false;
  }

  addCheckboxDisabled() {
    this.checkbox.checked = false;
    this.checkbox.disabled = true;
    this.addDisabled();
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

    if (this.formId !== formIds[0]) {
      this.active = document.querySelector(`#${formId}-active-check`);
      this.gutterDefaultCheck = document.querySelector(
        `#${this.formId}-gutter-default-check`
      );
      this.marginDefaultCheck = document.querySelector(
        `#${this.formId}-margin-default-check`
      );

      this.active.addEventListener('change', () => {
        this.onActiveChange();
      });
      this.gutterDefaultCheck.addEventListener('change', () => {
        this.onGutterDefaultCheck();
      });
      this.marginDefaultCheck.addEventListener('change', () => {
        this.onMarginDefaultCheck();
      });
    }

    this.screen.setInputListener(() => {
      this.screen.setValue();
      this.updateGrid();
      this.updateCode();
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
      this.updateCode();
    });

    this.fixture.setInputListener(() => {
      this.fixture.setValue();
      this.fixture.updateSpan();
      this.fixture.showDesc();
      this.updateGrid();
      this.updateCode();
    });

    this.columns.setInputListener(() => {
      this.columns.setValue();
      if (!this.columns.validated) {
        this.columns.showWarning();
      } else {
        this.columns.hideWarning();
      }
      this.updateGrid();
      this.updateCode();
    });

    this.gutter.setInputListener(() => {
      this.gutter.setValue();
      if (!this.gutter.validated) {
        this.gutter.showWarning();
      } else {
        this.gutter.hideWarning();
      }
      this.updateGrid();
      this.updateCode();
    });

    this.margin.setInputListener(() => {
      this.margin.setValue();
      if (!this.margin.validated) {
        this.margin.showWarning();
      } else {
        this.margin.hideWarning();
      }
      this.updateGrid();
      this.updateCode();
    });

    this.unit.setCheckListener(() => {
      if (this.unit.checkbox.checked) {
        this.unit.removeDisabled();
        this.margin.addDisabled();
        this.container.addCheckboxDisabled();
        if (this.formId !== formIds[0]) {
          this.marginDefaultCheck.checked = false;
        }
      } else {
        this.unit.addDisabled();
        this.margin.removeDisabled();
        this.container.removeCheckboxDisabled();
      }
      this.updateGrid();
      this.updateCode();
      console.log(this.grid);
    });

    this.unit.setInputListener(() => {
      this.unit.setValue();
      if (!this.unit.validated) {
        this.unit.showWarning();
      } else {
        this.unit.hideWarning();
      }
      this.updateGrid();
      this.updateCode();
    });

    this.container.setCheckListener(() => {
      if (this.container.checkbox.checked) {
        this.container.showDesc();
        this.container.removeDisabled();
        this.margin.removeDisabled();
        this.unit.addCheckboxDisabled();
      } else {
        this.container.hideDesc();
        this.container.addDisabled();
        this.unit.removeCheckboxDisabled();
      }
      this.updateGrid();
      this.updateCode();
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
      this.updateCode();
    });
  }

  onActiveChange() {
    this.grid.active = this.active.checked;
    this.updateCode();
  }

  onGutterDefaultCheck() {
    if (this.gutterDefaultCheck.checked) {
      let defaultGutter = document.querySelector('#form-1-gutter').value;
      if (defaultGutter === '' || isNaN(defaultGutter)) {
        this.gutterDefaultCheck.checked = false;
        return;
      }
      defaultGutter = Number(defaultGutter);
      this.gutter.input.value = defaultGutter;
      this.grid.gutter = defaultGutter;
      this.gutter.input.addEventListener('change', () => {
        this.gutterDefaultCheck.checked = false;
      });
    }
  }

  onMarginDefaultCheck() {
    if (this.marginDefaultCheck.checked) {
      let defaultMargin = document.querySelector('#form-1-margin').value;
      if (defaultMargin === '' || isNaN(defaultMargin)) {
        this.marginDefaultCheck.checked = false;
        return;
      }
      defaultMargin = Number(defaultMargin);
      this.margin.input.value = defaultMargin;
      this.grid.margin = defaultMargin;
      console.log(this.grid);
      this.gutter.input.addEventListener('change', () => {
        this.marginDefaultCheck.checked = false;
      });
    }
  }

  updateGrid() {
    this.grid.screen = this.screen.value;
    this.grid.breakpoint = this.breakpoint.value;
    this.grid.fixture = this.fixture.value ? `-${this.fixture.value}` : '';

    this.grid.columns = this.columns.value;
    this.grid.gutter = this.gutter.value;

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

  linkUpdateCode(updateCode) {
    this.updateCode = updateCode;
  }
}

class Generator {
  constructor() {
    this.code = document.querySelector('#code');
    this.btnGenerateGrid = document.querySelector('.js-btn-generate-grid');
    this.form1 = new Form(formIds[0]);
    this.form2 = new Form(formIds[1]);
    this.form3 = new Form(formIds[2]);

    this.form1.linkUpdateCode(() => {
      this.updateCode();
    });
    this.form2.linkUpdateCode(() => {
      this.updateCode();
    });
    this.form3.linkUpdateCode(() => {
      this.updateCode();
    });
    this.btnGenerateGrid.addEventListener('click', () => {
      this.onGenerateGridClick();
    });
  }

  onGenerateGridClick() {
    this.changeBtnContent();
    this.generateHTMLColumns();
    this.injectCodeOnCSS();
  }

  changeBtnContent() {
    this.btnGenerateGrid.textContent = 'Refresh grid simulator';
  }

  generateHTMLColumns() {
    const gridRow = document.querySelector('.js-row');

    const colsList = [
      this.form1.grid.columns,
      this.form2.grid.columns,
      this.form3.grid.columns,
    ];
    const colMax = Math.max(...colsList);

    const colSel = {
      form1: `col${this.form1.grid.fixture}-1`,
      form2: this.form2.grid.active ? ` col${this.form2.grid.fixture}-1` : '',
      form3: this.form3.grid.active ? ` col${this.form3.grid.fixture}-1` : '',
    };

    let colElems = '';
    for (let i = 0; i < colMax; i++) {
      const colElem = `
        <div class="col ${colSel.form1}${colSel.form2}${colSel.form3}">
          <div class="box"></div>
        </div>
      `;
      colElems += colElem;
    }

    gridRow.innerHTML = colElems;
  }

  injectCodeOnCSS() {
    const codeCSS = this.generateCSS();
    const codeWrapper = `@media screen and (min-width:0) {${codeCSS}}`;
    const styleSheet = document.styleSheets[3];
    if (styleSheet.cssRules.length === 1) {
      styleSheet.deleteRule(0);
    }
    styleSheet.insertRule(codeWrapper);
  }

  updateCode() {
    const codeHTML = this.formatCSStoHTML();
    this.code.innerHTML = codeHTML;
  }

  formatCSStoHTML() {
    const codeCSS = this.generateCSS();

    const codeHTML = codeCSS
      .replace(/\*\//g, '*/<br/><br/>')
      .replace(/;/g, ';<br/>&nbsp;&nbsp;')
      .replace(/{/g, '{<br/>&nbsp;&nbsp;')
      .replace(/;<br\/>&nbsp;&nbsp;\s}/g, ';<br/>}<br/><br/>')
      .replace(/\)\s{<br\/>&nbsp;&nbsp;\s/g, ') {<br/>')
      .replace(/}[/s]*@/g, '}<br/><br/>@')
      .replace(/}<br\/><br\/>\s}/g, '}<br/>}');

    return codeHTML;
  }

  generateCSS() {
    const defaultCSS = `
    .container {
      width: 100%;
      margin: 0 auto;
    }
    .container .row {
      display: flex;
      flex-wrap: wrap;
    }`;
    const form1CSS = this.convertFormToCSS(this.form1);
    const form2CSS = this.form2.grid.active
      ? this.convertFormToCSS(this.form2)
      : '';
    const form3CSS = this.form3.grid.active
      ? this.convertFormToCSS(this.form3)
      : '';
    let codeCSS = defaultCSS + form1CSS + form2CSS + form3CSS;

    codeCSS = codeCSS.replace(/\s+/g, ' ');

    return codeCSS;
  }

  convertFormToCSS(form) {
    const {
      screen: scr,
      breakpoint,
      fixture: fx,
      columns: cols,
      gutter: gt,
      margin: mg,
      unit: un,
      unitFixedCheck,
      containerMaxCheck,
      containerMaxWidth: ct,
    } = form.grid;

    const ctPadding = mg !== 0 ? `padding: 0 ${mg}px;` : `padding: 0;`;
    const ctMaxWidth =
      unitFixedCheck || containerMaxCheck
        ? `max-width: ${ct}px;`
        : 'max-width: 100%;';

    const colsPadding = gt !== 0 ? `padding: 0 ${gt / 2}px;` : `padding: 0;`;

    const scrCSS = scr ? `/* --- screen : ${scr} --- */` : '';

    const ctCSS = `.container {
      ${ctMaxWidth}
      ${ctPadding}
    }`;

    const colsCSS = `.container .row [class*='col-'] {
      ${colsPadding}
    }`;

    let colUnitCSS = '';

    for (let i = 0; i < cols; i++) {
      const colWidth = unitFixedCheck
        ? `width: ${(un + gt) * (i + 1)}px;`
        : `width: calc(100% / ${cols - i});`;
      const col = `.container .row .col${fx}-${i + 1} {
        ${colWidth}
      }`;
      colUnitCSS += col;
    }

    let codeCSS = scrCSS + ctCSS + colsCSS + colUnitCSS;

    if (breakpoint) {
      codeCSS = `@media screen and (min-width: ${breakpoint}px) {
        ${codeCSS}
      }`;
    }

    codeCSS = codeCSS;

    return codeCSS;
  }
}

const btns = new Btns();
const generator = new Generator();
