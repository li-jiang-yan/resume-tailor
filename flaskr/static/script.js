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
