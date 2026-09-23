import { CheckboxAccordion } from "./CheckboxAccordion.js";
import { DangerButton } from "./DangerButton.js";
import { IconTrash } from "./IconTrash.js";
import { NonBreakingSpace } from "./NonBreakingSpace.js";


export function Entry(accordionButtonText, ...accordionBodyChildren) {
  const removeButton = DangerButton(IconTrash(), NonBreakingSpace(), accordionButtonText);
  removeButton.classList.add('mb-3');
  removeButton.addEventListener('click', () => {
    result.remove();
  });

  const nameField = accordionBodyChildren.find((child) => {
    return child.querySelector('label').textContent.trim().toLowerCase() === 'name';
  });
  nameField.querySelector('input').addEventListener('input', (event) => {
    result.querySelector('.accordion-button').textContent = event.target.value;
    removeButton.replaceChildren(IconTrash(), NonBreakingSpace(), event.target.value);
  });

  const result = CheckboxAccordion(accordionButtonText, removeButton, ...accordionBodyChildren);
  result.classList.add('entry');

  return result;
}
