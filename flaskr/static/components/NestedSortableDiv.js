import { Div } from "./Div.js";


export function NestedSortableDiv(...children) {
  const result = Div(...children);

  // Make Div sortable (nested)
  Sortable.create(result, {
    group: 'nested',
    fallbackOnBody: true,
    forceFallback: true,
    dragClass: 'opaque',
    ghostClass: 'invisible'
  });

  result.classList.add('nested-sorted');
  return result;
}
