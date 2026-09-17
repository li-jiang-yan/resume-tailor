import { NestedSortableDiv } from "./NestedSortableDiv.js";


export function Bulletlist(...children) {
  const result = NestedSortableDiv(...children);
  result.classList.add('bulletlist');
  return result;
}
