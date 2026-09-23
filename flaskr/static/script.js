//// JOB POST ANALYSIS ////
import { analyzePost } from "./features/job-analysis.js";
document.getElementById('analyzeButton').addEventListener('click', analyzePost);


//// RESUME JSON UPLOAD ////
import { enableUpload, uploadJson } from "./features/json-upload.js";
document.getElementById('jsonInput').addEventListener('change', enableUpload);
document.getElementById('uploadButton').addEventListener('click', uploadJson);


//// RESUME DOWNLOAD ////
// -- Event listeners are imported to ./features/json-upload.js -- //


//// JOB POST TO SUMMARY SIMILARITY CALCULATION ////
import { calculateSimilarity } from "./features/summary-similarity.js";
document.getElementById('similarityButton').addEventListener('click', calculateSimilarity);


//// UI UPDATES ////
import { resizeTextarea } from "./ui/textarea.js";

// Increase the height of the text area for a longer input
document.addEventListener('input', (event) => {
  if (event.target.matches('textarea')) {
    resizeTextarea(event.target);
  }
});

// Auto-adjust the height of all text areas when opening an accordion
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('accordion-button')) {
    const collapseId = event.target.getAttribute('data-bs-target').slice(1);
    document.getElementById(collapseId).querySelectorAll('textarea').forEach(resizeTextarea);
  }
});

// Auto-adjust the height of all text areas when window is resized
window.addEventListener('resize', () => {
  document.querySelectorAll('textarea').forEach(resizeTextarea);
})
