function render(innerHTML) {
  const template = document.createElement('template');
  template.innerHTML = innerHTML;
  return template.content.firstElementChild;
}

export function Canvas(id) {
    return render(`
        <canvas id="${id}"></canvas>
    `);
}
