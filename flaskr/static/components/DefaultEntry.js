import { Bulletlist } from "./Bulletlist.js";
import { CheckboxAccordion } from "./CheckboxAccordion.js";
import { DangerButton } from "./DangerButton.js";
import { Trash } from "./icons/Trash.js";
import { InlineField } from "./InlineField.js";
import { NonBreakingSpace } from "./NonBreakingSpace.js";


export function DefaultEntry(entryObject) {
  const name = entryObject.name;
  const dates = entryObject.dates;

  // Remove Button
  const removeButton = DangerButton(Trash(), NonBreakingSpace(), name);
  removeButton.classList.add('mb-3');
  removeButton.addEventListener('click', () => {
    result.remove();
  });

  // Name Field
  const nameField = InlineField('Name', 'text', name);
  nameField.querySelector('input').addEventListener('input', (event) => {
    result.querySelector('.accordion-button').textContent = event.target.value;
    removeButton.replaceChildren(Trash(), NonBreakingSpace(), event.target.value);
  });

  // Dates and Bulletlist Fields
  const datesField = InlineField('Date(s)', 'text', dates);
  const bulletlistField = Bulletlist(...entryObject.bulletlist);

  // Output
  const result = CheckboxAccordion(
    name, removeButton, nameField, datesField, bulletlistField
  );
  result.classList.add('entry');

  return result;
}
