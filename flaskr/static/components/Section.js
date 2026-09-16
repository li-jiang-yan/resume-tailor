import { render } from "./render.js";
import { CheckboxAccordion } from "./CheckboxAccordion.js";


export function Section(accordionButtonText, ...accordionBodyChildren) {
  const result = CheckboxAccordion(accordionButtonText, SectionTitle(accordionButtonText), ...accordionBodyChildren);
  result.classList.add('section');
  return result;
}


function SectionTitle(inputValue) {
  return render(`
    <div class="row mb-3 section-title">
      <div class="col-sm-2">
        <label class="col-form-label">
          Title
        </label>
      </div>
      <div class="col-sm-10">
        <input
          type="text"
          class="form-control"
          value="${inputValue}">
      </div>
    </div>
  `);
}
