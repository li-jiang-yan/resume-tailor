import { render } from "./render.js";
import { AccordionBody } from "./AccordionBody.js";
import { AccordionHeader } from "./AccordionHeader.js";


export function SortableAccordionItem(buttonText, ...bodyChildren) {
  const collapseId = crypto.randomUUID();
  const result = render('<div class="accordion-item"></div>');
  result.replaceChildren(
    AccordionHeader(collapseId, buttonText),
    SortableAccordionCollapse(collapseId, ...bodyChildren)
  );
  return result;
}


function SortableAccordionCollapse(id, ...bodyChildren) {
  const result = render(`<div class="accordion-collapse collapse" id="${id}"></div>`);
  result.replaceChildren(SortableAccordionBody(...bodyChildren));
  return result;
}


function SortableAccordionBody(...children) {
  const result = AccordionBody(...children);

  // Make accordion body sortable
  Sortable.create(result, {
    forceFallback: true,
    dragClass: 'opaque',
    ghostClass: 'invisible',
    filter: '.filtered'
  });

  return result;
}
