import { render } from "./render.js";


export function SmallSuccessButton(...children) {
  const result = render(`
    <button
      type="button"
      class="btn btn-success px-1 py-0"></button>
  `);
  result.replaceChildren(...children);
  return result;
}
