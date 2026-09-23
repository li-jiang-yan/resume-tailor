import { render } from "./render.js";
import { Checkbox } from "./Checkbox.js";
import { DangerButton } from "./DangerButton.js";
import { Div } from "./Div.js";
import { IconX } from "./IconX.js";
import { Input } from "./Input.js";
import { InputGroup } from "./InputGroup.js";
import { Label } from "./Label.js";
import { NestedSortableDiv } from "./NestedSortableDiv.js";


export function CommaSeparatedValues(...values) {
  const result = Div(
    Label('Comma Separated Values'),
    NestedSortableDiv(...values.map((value) => CommaSeparatedValue(value)))
  );
  result.classList.add('cslist');
  return result;
}


function CommaSeparatedValue(value) {
  // Checkbox
  const checkbox = Checkbox();
  checkbox.classList.add('col-auto', 'me-3');

  // Remove Button
  const removeButton = DangerButton(IconX());
  removeButton.addEventListener('click', () => {
    result.remove();
  });

  // Input Group
  const inputGroup = InputGroup(Input('text', value), removeButton);
  inputGroup.classList.add('col');

  // Row Div
  const rowDiv = render('<div class="row"></div>');
  rowDiv.replaceChildren(checkbox, inputGroup);

  // Result (Container Div)
  const result = render('<div class="container csv"></div>');
  result.replaceChildren(rowDiv);
  return result;
}
