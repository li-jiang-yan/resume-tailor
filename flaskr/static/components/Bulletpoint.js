import { CheckboxTextarea } from "./CheckboxTextarea.js";


export function Bulletpoint(value) {
  const result = CheckboxTextarea(value);
  result.classList.add('bulletpoint');
  return result;
}
