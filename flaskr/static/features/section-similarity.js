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


export async function calculateSimilarityBulletpoint(text, output) {
  // Compute similarity in backend
  const response = await fetch('/similarity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      corpus: [
        text,
        postTextarea.value
      ]
    })
  });

  const data = await response.json();

  // Present similarity in frontend
  if (data.percentage == '-') {
    output.replaceChildren(`(-%)`);
  } else {
    output.replaceChildren(`(${data.percentage.toFixed(1)}%)`);
  }
}


export async function refreshSimilaritiesBulletpoint() {
  document.querySelectorAll('.bulletpoint').forEach((bulletpoint) => {
    const textArea = bulletpoint.querySelector('textarea');
    const countText = bulletpoint.querySelector('.form-text');
    calculateSimilarityBulletpoint(textArea.value, countText);
  });
}
