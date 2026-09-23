import { render } from "./render.js";
import { Accordion } from "./Accordion.js";
import { AccordionItem } from "./AccordionItem.js";
import { Checkbox } from "./Checkbox.js";
import { DangerButton } from "./DangerButton.js";
import { IconTrash } from "./IconTrash.js";
import { NonBreakingSpace } from "./NonBreakingSpace.js";


export function CheckboxAccordion(accordionButtonText, ...accordionBodyChildren) {
  // Checkbox
  const checkbox = Checkbox();
  checkbox.classList.add('col-auto', 'align-self-start', 'my-3');

  // Remove button
  const removeButton = DangerButton(IconTrash(), NonBreakingSpace(), accordionButtonText);
  removeButton.classList.add('mb-3');
  removeButton.addEventListener('click', () => {
    result.remove();
  });

  // Accordion
  const accordion = Accordion(
    AccordionItem(
      accordionButtonText,
      removeButton,
      ...accordionBodyChildren
    )
  );
  accordion.classList.add('col');

  // Result
  const result = render('<div class="row"></div>');
  result.replaceChildren(checkbox, accordion);
  return result;
}
