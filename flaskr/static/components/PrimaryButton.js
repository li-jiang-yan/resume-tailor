import { render } from "./render.js";


export function PrimaryButton(...children) {
  const result = render(`
    <button
      type="button"
      class="btn btn-primary me-3"></button>
  `);
  result.replaceChildren(...children);
  return result;
}
