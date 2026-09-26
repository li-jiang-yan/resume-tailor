import { render } from "./render.js";
import { Checkbox } from "./Checkbox.js";
import { DangerButton } from "./DangerButton.js";
import { Div } from "./Div.js";
import { FormText } from "./FormText.js";
import { X } from "./icons/X.js";
import { InputGroup } from "./InputGroup.js";
import { InputGroupText } from "./InputGroupText.js"
import { Label } from "./Label.js";
import { NestedSortableDiv } from "./NestedSortableDiv.js";
import { NonBreakingSpace } from "./NonBreakingSpace.js";
import { Plus } from "./icons/Plus.js";
import { RowDiv } from "./RowDiv.js";
import { SmallSuccessButton } from "./SmallSuccessButton.js";
import { Textarea } from "./Textarea.js";


import { calculateSimilarityBulletpoint } from "../features/section-similarity.js";


export function Bulletlist(...values) {
  const addButton = SmallSuccessButton(Plus());
  addButton.addEventListener('click', () => {
    body.prepend(Bulletpoint());
  });

  const body = NestedSortableDiv(...values.map(Bulletpoint));
  const result = Div(Label('Bulletlist'), NonBreakingSpace(), addButton, body);
  result.classList.add('bulletlist');
  return result;
}


function Bulletpoint(value = '') {
  // Checkbox
  const checkbox = Checkbox();
  checkbox.classList.add('col-auto', 'align-self-start', 'me-3', 'my-3');

  // Text Area
  const textArea = Textarea(value);
  textArea.addEventListener('input', async (event) => {
    calculateSimilarityBulletpoint(event.target.value, countText);
  });

  // Count Text
  const countText = FormText();
  calculateSimilarityBulletpoint(value, countText);

  // Remove Button
  const removeButton = DangerButton(X());
  removeButton.addEventListener('click', () => {
    result.remove();
  });

  // Input Group
  const inputGroup = InputGroup(
    textArea,
    InputGroupText(countText),
    removeButton
  );
  inputGroup.classList.add('col');

  // Row Div
  const rowDiv = RowDiv(checkbox, inputGroup);

  // Result (Container Div)
  const result = render('<div class="container bulletpoint"></div>');
  result.replaceChildren(rowDiv);
  return result;
}
