import { render } from "./render.js";
import { Checkbox } from "./Checkbox.js";
import { DangerButton } from "./DangerButton.js";
import { IconX } from "./IconX.js";
import { Input } from "./Input.js";
import { InputGroup } from "./InputGroup.js";


export function CheckboxInput(inputType, inputValue) {
  // Checkbox
  const checkbox = Checkbox();
  checkbox.classList.add('col-auto', 'me-3');

  // Input Group
  const removeButton = DangerButton(IconX());
  const inputGroup = InputGroup(
    Input(inputType, inputValue),
    removeButton
  );
  inputGroup.classList.add('col');

  removeButton.addEventListener('click', () => {
    result.remove();
  });

  // Row Div
  const rowDiv = render('<div class="row"></div>');
  rowDiv.replaceChildren(checkbox, inputGroup);

  // Result (Container Div)
  const result = render('<div class="container"></div>');
  result.replaceChildren(rowDiv);
  return result;
}
