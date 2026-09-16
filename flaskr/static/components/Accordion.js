import { render } from "./render.js";


export function Accordion(...children) {
  const result = render('<div class="accordion mb-3"></div>');
  result.replaceChildren(...children);
  return result;
}
