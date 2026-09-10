import { Canvas } from "./components.js";

const jobAnalysisElement = {
  textarea: document.getElementById('jobAnalysisTextarea'),
  button: document.getElementById('jobAnalysisButton'),
  output: document.getElementById('jobAnalysisOutput')
};

const jsonUploadElement = {
  input: document.getElementById('jsonUploadInput'),
  button: document.getElementById('jsonUploadButton'),
  output: document.getElementById('jsonUploadOutput')
};

const summaryElement = {
  textarea: document.getElementById('summaryTextarea'),
  button: document.getElementById('summaryButton'),
  output: document.getElementById('summaryOutput')
}

// Increase the height of the text area for a longer input
document.addEventListener('input', (event) => {
  if (event.target.matches('textarea')) {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  }
});

// Perform analysis on the job description given
jobAnalysisElement.button.addEventListener('click', async () => {
  // Analyze job description in backend
  const response = await fetch('/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: jobAnalysisElement.textarea.value
    })
  });

  const data = await response.json();

  // Output chart with analysis in frontend
  const canvas = Canvas('jobAnalysisCanvas');
  jobAnalysisElement.output.replaceChildren(
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

});

// Perform similarity computation on summary and job description given
summaryElement.button.addEventListener('click', async () => {
  // Compute similarity in backend
  const response = await fetch('/similarity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      corpus: [
        jobAnalysisElement.textarea.value,
        summaryElement.textarea.value
      ]
    })
  });

  const data = await response.json();

  // Present similarity in frontend
  summaryElement.output.replaceChildren(`Similarity = ${data.percentage.toFixed(1)}%`);
})
