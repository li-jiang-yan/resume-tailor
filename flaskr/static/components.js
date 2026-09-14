function render(innerHTML) {
  const template = document.createElement('template');
  template.innerHTML = innerHTML;
  return template.content.firstElementChild;
}


export function Canvas(id) {
  return render(`<canvas id="${id}"></canvas>`);
}


export function Accordion(...items) {
  const result = render('<div class="accordion mb-3"></div>');
  result.replaceChildren(...items);
  return result;
}


export function AccordionItem(collapseId, btnText, ...bodyChildren) {
  const result = render('<div class="accordion-item"></div>');
  result.replaceChildren(
    AccordionHeader(collapseId, btnText),
    AccordionCollapse(collapseId, ...bodyChildren)
  );
  return result;
}


function AccordionHeader(collapseId, btnText) {
  const result = render('<div class="accordion-header"></div>');
  result.replaceChildren(
    render(`
      <button
        class="accordion-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#${collapseId}">${btnText}</button>
    `)
  );
  return result;
}


function AccordionCollapse(id, ...bodyChildren) {
  const result = render(`<div class="accordion-collapse collapse" id="${id}"></div>`);
  result.replaceChildren(AccordionBody(...bodyChildren));
  return result;
}


function AccordionBody(...children) {
  const result = render('<div class="accordion-body"></div>');
  result.replaceChildren(...children);
  return result;
}


export function InlineField(id, labelText, inputType, value) {
  return render(`
    <div class="row mb-3 inline-field">
      <div class="col-sm-2">
        <label
          for="${id}"
          class="col-form-label">
          ${labelText}
        </label>
      </div>
      <div class="col-sm-10">
        <input
          type="${inputType}"
          class="form-control"
          id="${id}"
          value="${value}">
      </div>
    </div>
  `);
}


function SectionTitle(value) {
  return render(`
    <div class="row mb-3 section-title">
      <div class="col-sm-2">
        <label
          class="col-form-label">
          Title
        </label>
      </div>
      <div class="col-sm-10">
        <input
          type="text"
          class="form-control"
          value="${value}">
      </div>
    </div>
  `);
}


export function CheckboxAccordion(idPrefix, accordionBtnText, ...accordionBodyChildren) {
  // Checkbox
  const checkboxId = `${idPrefix}Checkbox`;
  const checkbox = Checkbox(checkboxId);
  checkbox.classList.add('col-auto', 'align-self-start', 'my-3');

  // Accordion
  const accordionItemId = `${idPrefix}Collapse`;
  const accordion = Accordion(
    AccordionItem(
      accordionItemId,
      accordionBtnText,
      ...accordionBodyChildren
    )
  );
  accordion.classList.add('col');

  // Result
  const result = render('<div class="row"></div>');
  result.replaceChildren(checkbox, accordion);
  return result;
}


export function Section(idPrefix, accordionBtnText, ...accordionBodyChildren) {
  const result = CheckboxAccordion(idPrefix, accordionBtnText, SectionTitle(accordionBtnText), ...accordionBodyChildren);
  result.classList.add('section');
  return result;
}


export function Entry(idPrefix, accordionBtnText, ...accordionBodyChildren) {
  const result = CheckboxAccordion(idPrefix, accordionBtnText, ...accordionBodyChildren);
  result.classList.add('entry');
  return result;
}


function Checkbox(id) {
  return render(`
    <input
      type="checkbox"
      class="checkbox"
      id="${id}"
      name="${id}"
      checked>
  `);
}


export function CheckboxInput(idPrefix, inputType, value) {
  // Checkbox
  const checkboxId = `${idPrefix}Checkbox`;
  const checkbox = Checkbox(checkboxId);
  checkbox.classList.add('col-auto', 'me-3');

  // Input
  const inputId = `${idPrefix}Input`;
  const input = Input(inputType, inputId, value);
  input.classList.add('col');

  // Row Div
  const rowDiv = render('<div class="row"></div>');
  rowDiv.replaceChildren(checkbox, input);

  // Result (Container Div)
  const result = render('<div class="container"></div>');
  result.replaceChildren(rowDiv);
  return result;
}


export function CommaSeparatedValue(idPrefix, inputType, value) {
  const result = CheckboxInput(idPrefix, inputType, value);
  result.classList.add('csv');
  return result;
}


function Input(inputType, id, value) {
  return render(`
    <input
      type="${inputType}"
      class="form-control input-${inputType}"
      id="${id}"
      value="${value}">
  `);
}


export function CheckboxTextarea(idPrefix, value) {
  // Checkbox
  const checkboxId = `${idPrefix}Checkbox`;
  const checkbox = Checkbox(checkboxId);
  checkbox.classList.add('col-auto', 'align-self-start', 'me-3', 'my-3');

  // Text Area
  const textareaId = `${idPrefix}Textarea`;
  const textarea = Textarea(textareaId, value);
  textarea.classList.add('col');

  // Row Div
  const rowDiv = render('<div class="row"></div>');
  rowDiv.replaceChildren(checkbox, textarea);

  // Result (Container Div)
  const result = render('<div class="container"></div>');
  result.replaceChildren(rowDiv);
  return result;
}


export function Bulletpoint(idPrefix, value) {
  const result = CheckboxTextarea(idPrefix, value);
  result.classList.add('bulletpoint');
  return result;
}


function Textarea(id, content) {
  return render(`
    <textarea
      class="form-control auto-expand"
      id="${id}">${content}</textarea>
  `);
}


export function Div(...children) {
  const result = document.createElement('div');
  result.replaceChildren(...children);
  return result;
}


export function Label(labelContent) {
  return render(`<label class="col-form-label">${labelContent}</label>`);
}


export function SortableAccordionItem(collapseId, btnText, ...bodyChildren) {
  const result = render('<div class="accordion-item"></div>');
  result.replaceChildren(
    AccordionHeader(collapseId, btnText),
    SortableAccordionCollapse(collapseId, ...bodyChildren)
  );
  return result;
}


function SortableAccordionCollapse(id, ...bodyChildren) {
  const result = render(`<div class="accordion-collapse collapse" id="${id}"></div>`);
  result.replaceChildren(SortableAccordionBody(...bodyChildren));
  return result;
}


function SortableAccordionBody(...children) {
  const result = AccordionBody(...children);

  // Make accordion body sortable
  Sortable.create(result, {
    forceFallback: true,
    dragClass: 'opaque',
    ghostClass: 'invisible'
  });

  return result;
}

export function NestedSortableDiv(...children) {
  const result = Div(...children);

  // Make Div sortable (nested)
  Sortable.create(result, {
    group: 'nested',
    fallbackOnBody: true,
    forceFallback: true,
    dragClass: 'opaque',
    ghostClass: 'invisible'
  });

  return result;
}

export function CommaSeparatedList(...children) {
  const result = NestedSortableDiv(...children);
  result.classList.add('cslist');
  return result;
}


export function Bulletlist(...children) {
  const result = NestedSortableDiv(...children);
  result.classList.add('bulletlist');
  return result;
}


export function PrimaryButton(text) {
  return render(`
    <button
      type="button"
      class="btn btn-primary me-3">
      ${text}
    </button>
  `);
}


export function Card(...elements) {
  const result = render('<div class="card"></div>');
  const body = render('<div class="card-body"></div>');
  body.replaceChildren(...elements);
  result.replaceChildren(body);
  return result;
}


export function CardTitle(localName, text) {
  return render(`<${localName} class="card-title">${text}</${localName}>`);
}
