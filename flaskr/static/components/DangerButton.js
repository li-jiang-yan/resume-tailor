import { render } from "./render.js";


export function DangerButton(...children) {
  const result = render(`
    <button
      type="button"
      class="btn btn-danger">
    </button>
  `);
  result.replaceChildren(...children);
  return result;
}
