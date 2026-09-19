import { render } from "./render.js";


export function FormTextDiv(text) {
  return render(`<div class="form-text filtered">${text}</div>`);
}
