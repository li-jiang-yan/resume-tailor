import { render } from "./render.js";


export function CardTitle(localName, text) {
  return render(`<${localName} class="card-title">${text}</${localName}>`);
}
