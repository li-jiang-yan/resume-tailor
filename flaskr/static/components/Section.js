import { render } from "./render.js";
import { CheckboxAccordion } from "./CheckboxAccordion.js";
import { DangerButton } from "./DangerButton.js";
import { Trash } from "./icons/Trash.js";
import { NonBreakingSpace } from "./NonBreakingSpace.js";


export function Section(accordionButtonText, ...accordionBodyChildren) {
  const removeButton = DangerButton(Trash(), NonBreakingSpace(), accordionButtonText);
  removeButton.classList.add('mb-3');
  removeButton.addEventListener('click', () => {
    result.remove();
  });

  const title = SectionTitle(accordionButtonText);
  title.querySelector('input').addEventListener('input', (event) => {
    result.querySelector('.accordion-button').textContent = event.target.value;
    removeButton.replaceChildren(Trash(), NonBreakingSpace(), event.target.value);
  });

  const result = CheckboxAccordion(accordionButtonText, removeButton, title, ...accordionBodyChildren);
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
