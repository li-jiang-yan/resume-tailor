export function SortableDiv(...children) {
  const result = document.createElement('div');
  result.replaceChildren(...children);

  // Make div sortable
  Sortable.create(result, {
    forceFallback: true,
    dragClass: 'opaque',
    ghostClass: 'invisible',
  });

  return result;
}
