import { render } from "./render.js";
import { AccordionBody } from "./AccordionBody.js";
import { AccordionHeader } from "./AccordionHeader.js";


export function AccordionItem(buttonText, ...bodyChildren) {
  const collapseId = crypto.randomUUID();
  const result = render('<div class="accordion-item"></div>');
  result.replaceChildren(
    AccordionHeader(collapseId, buttonText),
    AccordionCollapse(collapseId, ...bodyChildren)
  );
  return result;
}


function AccordionCollapse(id, ...bodyChildren) {
  const result = render(`<div class="accordion-collapse collapse" id="${id}"></div>`);
  result.replaceChildren(AccordionBody(...bodyChildren));
  return result;
}
