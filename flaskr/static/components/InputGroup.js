import { render } from "./render.js";


export function InputGroup(...children) {
  const result = render(`
    <div
      class="input-group"
      style="padding-left: 0px; padding-right: 0px;"></div>
  `);
  result.replaceChildren(...children);
  return result;
}
