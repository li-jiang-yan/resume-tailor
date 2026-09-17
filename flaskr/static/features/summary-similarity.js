// Components
import { Spinner } from "../components/Spinner.js";


// Page elements
const postTextarea = document.getElementById('jobAnalysisTextarea');
const summaryTextarea = document.getElementById('summaryTextarea');
const output = document.getElementById('summaryOutput');


// Functions to export
export async function calculateSimilarity() {
  output.replaceChildren(Spinner());

  // Compute similarity in backend
  const response = await fetch('/similarity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      corpus: [
        postTextarea.value,
        summaryTextarea.value
      ]
    })
  });

  const data = await response.json();

  // Present similarity in frontend
  output.replaceChildren(
    `Similarity = ${data.percentage.toFixed(1)}%`
  );
}
