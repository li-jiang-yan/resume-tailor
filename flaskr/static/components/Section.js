import { render } from "./render.js";
import { CheckboxAccordion } from "./CheckboxAccordion.js";
import { IconTrash } from "./IconTrash.js";
import { NonBreakingSpace } from "./NonBreakingSpace.js";


export function Section(accordionButtonText, ...accordionBodyChildren) {
  const title = SectionTitle(accordionButtonText);
  const result = CheckboxAccordion(accordionButtonText, title, ...accordionBodyChildren);
  result.classList.add('section');

  // Event listener for section title input
  title.querySelector('input').addEventListener('input', (event) => {
    result.querySelector('.accordion-button').textContent = event.target.value;
    result.querySelector('.btn-danger').replaceChildren(IconTrash(), NonBreakingSpace(), event.target.value);
  });

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
