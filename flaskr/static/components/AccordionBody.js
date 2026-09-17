import { render } from "./render.js";


export function AccordionBody(...children) {
  const result = render('<div class="accordion-body"></div>');
  result.replaceChildren(...children);
  return result;
}
