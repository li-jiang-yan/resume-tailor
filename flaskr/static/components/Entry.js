import { CheckboxAccordion } from "./CheckboxAccordion.js";


export function Entry(accordionButtonText, ...accordionBodyChildren) {
  const result = CheckboxAccordion(accordionButtonText, ...accordionBodyChildren);
  result.classList.add('entry');
  return result;
}
