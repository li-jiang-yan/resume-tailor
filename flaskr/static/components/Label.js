import { render } from "./render.js";


export function Label(text) {
  return render(`<label class="col-form-label">${text}</label>`);
}
