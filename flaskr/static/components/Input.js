import { render } from "./render.js";


export function Input(type, value) {
  return render(`
    <input
      type="${type}"
      class="form-control input-${type}"
      value="${value}">
  `);
}
