import { render } from "./render.js";


export function AccordionButton(collapseId, text) {
  return render(`
    <button
      class="accordion-button"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#${collapseId}">${text}</button>
  `);
}
