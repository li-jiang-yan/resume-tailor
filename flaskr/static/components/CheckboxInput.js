import { render } from "./render.js";
import { Checkbox } from "./Checkbox.js";
import { Input } from "./Input.js";


export function CheckboxInput(inputType, inputValue) {
  // Checkbox
  const checkbox = Checkbox();
  checkbox.classList.add('col-auto', 'me-3');

  // Input
  const input = Input(inputType, inputValue);
  input.classList.add('col');

  // Row Div
  const rowDiv = render('<div class="row"></div>');
  rowDiv.replaceChildren(checkbox, input);

  // Result (Container Div)
  const result = render('<div class="container"></div>');
  result.replaceChildren(rowDiv);
  return result;
}
