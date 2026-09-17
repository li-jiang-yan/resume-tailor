import { CheckboxAccordion } from "./CheckboxAccordion.js";


export function Certification(accordionButtonText, ...accordionBodyChildren) {
  const result = CheckboxAccordion(accordionButtonText, ...accordionBodyChildren);
  result.classList.add('certification');
  return result;
}
