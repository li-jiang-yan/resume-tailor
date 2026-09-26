import { render } from "./render.js";


export function ModalBody(...children) {
  const result = render('<div class="modal-body"></div>');
  result.replaceChildren(...children);
  return result;
}
