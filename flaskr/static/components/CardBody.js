import { render } from "./render.js";


export function CardBody(...children) {
  const result = render('<div class="card-body"></div>');
  result.replaceChildren(...children);
  return result;
}
