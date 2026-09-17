import { render } from "./render.js";


export function Card(...elements) {
  const result = render('<div class="card"></div>');
  const body = render('<div class="card-body"></div>');
  body.replaceChildren(...elements);
  result.replaceChildren(body);
  return result;
}
