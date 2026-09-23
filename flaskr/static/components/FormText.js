import { render } from "./render.js";


export function FormText(content) {
  return render(`<div class="form-text">${content}</div>`);
}
