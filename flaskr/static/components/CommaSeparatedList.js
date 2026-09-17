import { NestedSortableDiv } from "./NestedSortableDiv.js";


export function CommaSeparatedList(...children) {
  const result = NestedSortableDiv(...children);
  result.classList.add('cslist');
  return result;
}
