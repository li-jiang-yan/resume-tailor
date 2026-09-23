import { render } from "./render.js";
import { Checkbox } from "./Checkbox.js";
import { DangerButton } from "./DangerButton.js";
import { Div } from "./Div.js";
import { IconX } from "./IconX.js";
import { InputGroup } from "./InputGroup.js";
import { Label } from "./Label.js";
import { NestedSortableDiv } from "./NestedSortableDiv.js";
import { Textarea } from "./Textarea.js";


export function Bulletlist(...values) {
  const result = Div(
    Label('Bulletlist'),
    NestedSortableDiv(...values.map(Bulletpoint))
  );
  result.classList.add('bulletlist');
  return result;
}


function Bulletpoint(value) {
  // Checkbox
  const checkbox = Checkbox();
  checkbox.classList.add('col-auto', 'align-self-start', 'me-3', 'my-3');

  // Remove Button
  const removeButton = DangerButton(IconX());
  removeButton.addEventListener('click', () => {
    result.remove();
  });

  // Input Group
  const inputGroup = InputGroup(
    Textarea(value),
    removeButton
  );
  inputGroup.classList.add('col');

  // Row Div
  const rowDiv = render('<div class="row"></div>');
  rowDiv.replaceChildren(checkbox, inputGroup);

  // Result (Container Div)
  const result = render('<div class="container bulletpoint"></div>');
  result.replaceChildren(rowDiv);
  return result;
}
