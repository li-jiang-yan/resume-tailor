import { render } from "./render.js";
import { AccordionButton } from "./AccordionButton.js";


export function AccordionHeader(collapseId, buttonText) {
  const result = render('<div class="accordion-header"></div>');
  result.replaceChildren(AccordionButton(collapseId, buttonText));
  return result;
}
