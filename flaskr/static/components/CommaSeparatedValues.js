import { render } from "./render.js";
import { Checkbox } from "./Checkbox.js";
import { DangerButton } from "./DangerButton.js";
import { Div } from "./Div.js";
import { FormText } from "./FormText.js";
import { IconX } from "./IconX.js";
import { Input } from "./Input.js";
import { InputGroup } from "./InputGroup.js";
import { Label } from "./Label.js";
import { NestedSortableDiv } from "./NestedSortableDiv.js";


import { calculateCount } from "../features/section-similarity.js";


export function CommaSeparatedValues(...values) {
  const result = Div(
    Label('Comma Separated Values'),
    NestedSortableDiv(...values.map(CommaSeparatedValue))
  );
  result.classList.add('cslist');
  return result;
}


function CommaSeparatedValue(value) {
  // Checkbox
  const checkbox = Checkbox();
  checkbox.classList.add('col-auto', 'me-3');

  // Input
  const input = Input('text', value);
  input.addEventListener('input', async (event) => {
    calculateCount(event.target.value, countText);
  });

  // Count Text
  const countText = FormText();
  calculateCount(value, countText);

  // Remove Button
  const removeButton = DangerButton(IconX());
  removeButton.addEventListener('click', () => {
    result.remove();
  });

  // Input Group
  const inputGroup = InputGroup(
    input,
    InputGroupText(countText),
    removeButton
  );
  inputGroup.classList.add('col');

  // Row Div
  const rowDiv = render('<div class="row"></div>');
  rowDiv.replaceChildren(checkbox, inputGroup);

  // Result (Container Div)
  const result = render('<div class="container csv"></div>');
  result.replaceChildren(rowDiv);
  return result;
}


function InputGroupText(...children) {
  const result = render('<span class="input-group-text"></span>');
  result.replaceChildren(...children);
  return result;
}
