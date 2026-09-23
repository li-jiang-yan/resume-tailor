import { render } from "./render.js";


export function InputGroupText(...children) {
  const result = render('<span class="input-group-text"></span>');
  result.replaceChildren(...children);
  return result;
}
