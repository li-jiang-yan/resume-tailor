import { render } from "./render.js";


export function Checkbox() {
  return render(`
    <input
      type="checkbox"
      class="checkbox"
      checked>
  `);
}
