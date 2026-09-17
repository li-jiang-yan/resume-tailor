export function Div(...children) {
  const result = document.createElement('div');
  result.replaceChildren(...children);
  return result;
}
