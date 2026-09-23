// Page elements
const postTextarea = document.getElementById('postTextarea');


// Functions to export
export async function calculateCount(phrase, output) {
  // Compute count in backend
  const response = await fetch('/count', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phrase: phrase,
      text: postTextarea.value
    })
  });

  const data = await response.json();

  // Present count in frontend
  output.replaceChildren(`(${data.count})`);
}


export async function refreshCounts() {
  document.querySelectorAll('.csv').forEach((commaSeparatedValue) => {
    const input = commaSeparatedValue.querySelector('.input-text');
    const countText = commaSeparatedValue.querySelector('.form-text');
    calculateCount(input.value, countText);
  }); 
}
