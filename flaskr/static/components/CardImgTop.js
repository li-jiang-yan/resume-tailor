import { render } from "./render.js";


export function CardImgTop(src) {
  return render(`
    <img
      src="${src}"
      class="card-img-top">
    </img>
  `);
}
