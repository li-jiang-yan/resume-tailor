import { render } from "./render.js";


export function Card(title, ...children) {
  const result = render('<div class="card"></div>');
  result.replaceChildren(CardBody(
    CardTitle(title),
    ...children
  ));
  return result;
}


function CardTitle(content) {
  const result = render(`<div class="card-title">${content}</div>`);
  return result;
}


function CardBody(...children) {
  const result = render('<div class="card-body"></div>');
  result.replaceChildren(...children);
  return result;
}
