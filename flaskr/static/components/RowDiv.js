import { render } from "./render.js";


export function RowDiv(...children) {
  const result = render('<div class="row"></div>');
  result.replaceChildren(...children);
  return result;
}
