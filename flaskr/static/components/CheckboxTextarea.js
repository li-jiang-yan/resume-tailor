import { render } from "./render.js";
import { Checkbox } from "./Checkbox.js";
import { DangerButton } from "./DangerButton.js";
import { IconX } from "./IconX.js";
import { InputGroup } from "./InputGroup.js";
import { Textarea } from "./Textarea.js";


export function CheckboxTextarea(value) {
  // Checkbox
  const checkbox = Checkbox();
  checkbox.classList.add('col-auto', 'align-self-start', 'me-3', 'my-3');

  // Input Group
  const removeButton = DangerButton(IconX());
  const inputGroup = InputGroup(
    Textarea(value),
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
