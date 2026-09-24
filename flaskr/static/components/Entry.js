import { Bulletlist } from "./Bulletlist.js";
import { CheckboxAccordion } from "./CheckboxAccordion.js";
import { DangerButton } from "./DangerButton.js";
import { Trash } from "./icons/Trash.js";
import { InlineField } from "./InlineField.js";
import { NonBreakingSpace } from "./NonBreakingSpace.js";


export function Entry(entryObject) {
  const name = entryObject.name;

  // Remove Button
  const removeButton = DangerButton(Trash(), NonBreakingSpace(), name);
  removeButton.classList.add('mb-3');
  removeButton.addEventListener('click', () => {
    result.remove();
  });

  // Fields
  const entryFields = Object.entries(entryObject).map(
    ([key, value]) => EntryField(key, value)
  );

  // Name Field
  const nameField = entryFields.find((child) => {
    return child.querySelector('label').textContent.trim().toLowerCase() === 'name';
  });
  nameField.querySelector('input').addEventListener('input', (event) => {
    result.querySelector('.accordion-button').textContent = event.target.value;
    removeButton.replaceChildren(Trash(), NonBreakingSpace(), event.target.value);
  });

  // Output
  const result = CheckboxAccordion(name, removeButton, ...entryFields);
  result.classList.add('entry');

  return result;
}


function EntryField(key, value) {
  if (key === 'bulletlist') {
    return Bulletlist(...value);
  } else {
    return InlineField(titleCase(key), 'text', value);
  }
}


function titleCase(str) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}
