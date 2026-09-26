import { Accordion } from "./Accordion.js";
import { AccordionItem } from "./AccordionItem.js";
import { Checkbox } from "./Checkbox.js";
import { RowDiv } from "./RowDiv.js";


export function CheckboxAccordion(accordionButtonText, ...accordionBodyChildren) {
  // Checkbox
  const checkbox = Checkbox();
  checkbox.classList.add('col-auto', 'align-self-start', 'my-3');

  // Accordion
  const accordion = Accordion(
    AccordionItem(
      accordionButtonText,
      ...accordionBodyChildren
    )
  );
  accordion.classList.add('col');

  // Result
  const result = RowDiv(checkbox, accordion);
  return result;
}
