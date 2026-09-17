import { CheckboxInput } from "./CheckboxInput.js";


export function CommaSeparatedValue(inputType, value) {
  const result = CheckboxInput(inputType, value);
  result.classList.add('csv');
  return result;
}
