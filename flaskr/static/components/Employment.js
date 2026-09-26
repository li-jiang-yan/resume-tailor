import { Bulletlist } from "./Bulletlist.js";
import { CheckboxAccordion } from "./CheckboxAccordion.js";
import { DangerButton } from "./DangerButton.js";
import { Trash } from "./icons/Trash.js";
import { InlineField } from "./InlineField.js";
import { NonBreakingSpace } from "./NonBreakingSpace.js";


const DEFAULT = {
  name: '(Unnamed Employment)',
  dates: '',
  company: '',
  bulletlist: []
};


export function Employment(entryObject = DEFAULT) {
  const name = entryObject.name;
  const dates = entryObject.dates;
  const company = entryObject.company;

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

  // Dates, Company and Bulletlist Fields
  const datesField = InlineField('Date(s)', 'text', dates);
  const companyField = InlineField('Company', 'text', company);
  const bulletlistField = Bulletlist(...entryObject.bulletlist);

  // Output
  const result = CheckboxAccordion(
    name, removeButton, nameField, companyField, datesField, bulletlistField
  );
  result.classList.add('entry');

  return result;
}
