import { render } from "./render.js";


export function SuccessButton(...children) {
  const result = render(`
    <button
      type="button"
      class="btn btn-success mb-3"></button>
  `);
  result.replaceChildren(...children);
  return result;
}
