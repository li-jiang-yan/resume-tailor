// Components
import { Canvas } from "../components/Canvas.js";
import { Spinner } from "../components/Spinner.js";


// Page elements
const textArea = document.getElementById('postTextarea');
const output = document.getElementById('analyzeOutput');


// Functions to export
export async function analyzePost() {
  output.replaceChildren(Spinner());

  // Analyze job description in backend
  const response = await fetch('/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: textArea.value
    })
  });

  const data = await response.json();

  // Output chart with analysis in frontend
  const canvas = Canvas();
  output.replaceChildren(
    "Frequently repeated words/phrases used",
    canvas
  );

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: data.labels.slice(0, 10),
      datasets: [{
        label: 'Frequency',
        data: data.values.slice(0, 10),
        borderwidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
