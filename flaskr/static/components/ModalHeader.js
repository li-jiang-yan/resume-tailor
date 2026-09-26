import { render } from "./render.js";


export function ModalHeader(titleContent) {
  return render(`
    <div class="modal-header">
      <p class="modal-title">${titleContent}</p>
      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
  `);
}
