import { render } from "./render.js";
import { Checkbox } from "./Checkbox.js";
import { DangerButton } from "./DangerButton.js";
import { FormText } from "./FormText.js";
import { X } from "./icons/X.js";
import { Input } from "./Input.js";
import { InputGroup } from "./InputGroup.js";
import { InputGroupText } from "./InputGroupText.js";
import { RowDiv } from "./RowDiv.js";


import { calculateCount } from "../features/section-similarity.js";


export function CommaSeparatedValue(value = '') {
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
  const removeButton = DangerButton(X());
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
  const rowDiv = RowDiv(checkbox, inputGroup);

  // Result (Container Div)
  const result = render('<div class="container entry"></div>');
  result.replaceChildren(rowDiv);
  return result;
}
