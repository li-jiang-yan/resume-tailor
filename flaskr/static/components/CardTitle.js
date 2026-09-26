import { render } from "./render.js";


export function CardTitle(content) {
  const result = render(`<div class="card-title">${content}</div>`);
  return result;
}
