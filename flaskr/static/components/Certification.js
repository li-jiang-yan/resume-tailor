import { CheckboxAccordion } from "./CheckboxAccordion.js";
import { DangerButton } from "./DangerButton.js";
import { IconTrash } from "./IconTrash.js";
import { InlineField } from "./InlineField.js";
import { NonBreakingSpace } from "./NonBreakingSpace.js";


export function Certification(certificationObject) {
  const name = certificationObject.name;
  const institution = certificationObject.institution;
  const dates = certificationObject['date(s)']

  // Remove Button
  const removeButton = DangerButton(IconTrash(), NonBreakingSpace(), name);
  removeButton.classList.add('mb-3');
  removeButton.addEventListener('click', () => {
    result.remove();
  });

  // Name Field
  const nameField = InlineField('Name', 'text', name);
  nameField.querySelector('input').addEventListener('input', (event) => {
    result.querySelector('.accordion-button').textContent = event.target.value;
    removeButton.replaceChildren(IconTrash(), NonBreakingSpace(), event.target.value);
  });

  // Institution and Date(s) Field
  const institutionField = InlineField('Institution', 'text', institution);
  const dateField = InlineField('Date(s)', 'text', dates);

  // Output
  const result = CheckboxAccordion(name, removeButton, nameField, institutionField, dateField);
  result.classList.add('certification');

  return result;
}
