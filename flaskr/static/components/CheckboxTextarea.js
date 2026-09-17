import { render } from "./render.js";
import { Checkbox } from "./Checkbox.js";
import { Textarea } from "./Textarea.js";


export function CheckboxTextarea(value) {
  // Checkbox
  const checkbox = Checkbox();
  checkbox.classList.add('col-auto', 'align-self-start', 'me-3', 'my-3');

  // Text Area
  const textarea = Textarea(value);
  textarea.classList.add('col');

  // Row Div
  const rowDiv = render('<div class="row"></div>');
  rowDiv.replaceChildren(checkbox, textarea);

  // Result (Container Div)
  const result = render('<div class="container"></div>');
  result.replaceChildren(rowDiv);
  return result;
}
