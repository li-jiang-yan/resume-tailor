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

// Increase the height of the text area for a longer input
jobAnalysisElement.textarea.addEventListener('input', (event) => {
  event.currentTarget.style.height = 'auto';
  event.currentTarget.style.height = event.currentTarget.scrollHeight + 'px';
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
