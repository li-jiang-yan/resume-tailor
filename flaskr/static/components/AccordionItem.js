import { render } from "./render.js";


export function AccordionItem(buttonText, ...bodyChildren) {
  const collapseId = crypto.randomUUID();
  const result = render('<div class="accordion-item"></div>');
  result.replaceChildren(
    AccordionHeader(collapseId, buttonText),
    AccordionCollapse(collapseId, ...bodyChildren)
  );
  return result;
}


function AccordionHeader(collapseId, buttonText) {
  const result = render('<div class="accordion-header"></div>');
  result.replaceChildren(AccordionButton(collapseId, buttonText));
  return result;
}


function AccordionButton(collapseId, text) {
  return render(`
    <button
      class="accordion-button"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#${collapseId}">${text}</button>
  `);
}


function AccordionCollapse(id, ...bodyChildren) {
  const result = render(`<div class="accordion-collapse collapse show" id="${id}"></div>`);
  result.replaceChildren(AccordionBody(...bodyChildren));
  return result;
}


function AccordionBody(...children) {
  const result = render('<div class="accordion-body"></div>');
  result.replaceChildren(...children);
  return result;
}
