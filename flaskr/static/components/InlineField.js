import { render } from "./render.js";


export function InlineField(labelText, inputType, inputValue) {
  return render(`
    <div class="row mb-3 inline-field">
      <div class="col-sm-2">
        <label class="col-form-label">
          ${labelText}
        </label>
      </div>
      <div class="col-sm-10">
        <input
          type="${inputType}"
          class="form-control"
          value="${inputValue}">
      </div>
    </div>
  `);
}
