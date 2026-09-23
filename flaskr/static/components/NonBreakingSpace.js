import { render } from "./render.js";


export function NonBreakingSpace() {
  return render('<span>&nbsp;</span>');
}
