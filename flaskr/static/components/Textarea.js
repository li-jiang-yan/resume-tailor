import { render } from "./render.js";


export function Textarea(content) {
  return render(`
    <textarea class="form-control auto-expand">${content}</textarea>
  `);
}
