import { render } from "./render.js";


export function PrimaryButton(text) {
  return render(`
    <button
      type="button"
      class="btn btn-primary me-3">
      ${text}
    </button>
  `);
}
