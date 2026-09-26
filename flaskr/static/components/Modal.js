import { render } from "./render.js";


export function Modal(...children) {
  // Modal Content
  const content = render('<div class="modal-content"></div>');
  content.replaceChildren(...children);

  // Modal Dialog
  const dialog = render('<div class="modal-dialog modal-lg"></div>');
  dialog.replaceChildren(content);

  // Modal
  const result = render('<div class="modal fade" aria-hidden="true"></div>');
  result.replaceChildren(dialog);
  return result;
}


