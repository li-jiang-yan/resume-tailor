import {
  Accordion,
  AccordionItem,
  Canvas,
  CheckboxAccordion,
  CheckboxInput,
  CheckboxTextarea,
  Div,
  InlineField,
  Label
} from "./components.js";


// Existing elements in index.html
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
    resizeTextarea(event.target);
  }
});


// Function to auto-adjust text area height
function resizeTextarea(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}


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


// Enable JSON upload button only if file is uploaded
jsonUploadElement.input.addEventListener('change', () => {
  jsonUploadElement.button.disabled = (jsonUploadElement.input.length <= 0);
});


// Upload JSON file to system for resume editing
jsonUploadElement.button.addEventListener('click', async () => {
  const file = jsonUploadElement.input.files[0];

  try {
    const fileText = await file.text();
    const fileObject = JSON.parse(fileText);
    jsonUploadElement.output.replaceChildren(
      Accordion(
        renderHeader(fileObject.document.header),
        renderSections(fileObject.document.sections)
      )
    );
  } catch (error) {
    console.error('Error reading file:', error);
  }
});


// Function for rendering headers
function renderHeader(headerObject) {
  return AccordionItem(
    'headerCollapse', // collapseId
    'Header',         // btnText
    InlineField('resumeHeaderName', 'Name', 'text', headerObject.name),
    InlineField('resumeHeaderEmail', 'Email', 'email', headerObject.contact.email),
    InlineField('resumeHeaderMobile', 'Mobile', 'tel', headerObject.contact.mobile),
    InlineField('resumeHeaderPortfolio', 'Portfolio', 'url', headerObject.links.portfolio),
    InlineField('resumeHeaderLinkedIn', 'LinkedIn', 'url', headerObject.links.linkedin)
  );
}


// Function for rendering sections
function renderSections(sectionObjectArray) {
  return AccordionItem(
    'sectionCollapse',  // collapseId
    'Sections',         // btnText
    ...sectionObjectArray.map(renderSection)
  )
}


// Function for rendering a given section
function renderSection(sectionObject) {
  let sectionContent = 'lorem ipsum';

  if (Object.hasOwn(sectionObject, 'csv')) {
    sectionContent = renderCSV(
      sectionObject.csv,      // csvArray
      sectionObject.type,     // idPrefix
      'text'                  // inputType
    );
  } else if (Object.hasOwn(sectionObject, 'entries')) {
    sectionContent = renderEntries(
      sectionObject.entries,  // entryArray
      sectionObject.type      // idPrefix
    )
  }

  return CheckboxAccordion(
    sectionObject.type,       // idPrefix
    sectionObject.title,      // accordionBtnText
    sectionContent            // accordionBodyChildren
  );
}


// Function for rendering comma separated values
function renderCSV(csvArray, sectionId, inputType) {
  return Div(
    ...csvArray.map((value, index) => {
      const valueId = `${sectionId}${String(index).padStart(2, '0')}`;
      return CheckboxInput(valueId, inputType, value);
    })
  );
}


// Function for rendering entries
function renderEntries(entryArray, sectionId) {
  return Div(
    ...entryArray.map((entry, index) => {
      const entryId = `${sectionId}${String(index).padStart(2, '0')}`;
      return renderEntry(entryId, entry);
    })
  );
}


// Function for rendering a single entry
function renderEntry(entryId, entryObject) {
  return CheckboxAccordion(
    entryId,          // idPrefix
    entryObject.name, // accordionBtnText
    ...renderEntryFields(entryId, entryObject)
  );
}


// Function for rendering entry fields
function renderEntryFields(entryId, entryObject) {
  return Object.entries(entryObject).map(
    ([key, value]) => renderEntryField(entryId, key, value)
  );
}


// Function for rendering a single entry field
function renderEntryField(entryId, key, value) {
  const entryFieldId = formatId(entryId, key);
  if (key === 'ul') {
    return renderBulletlist(entryFieldId, value);
  } else {
    return InlineField(entryFieldId, titleCase(key), 'text', value);
  }
}


// Function for rendering bulletlists
function renderBulletlist(entryFieldId, sourceArray) {
  return Div(
    Label('Bulletpoints'),
    ...sourceArray.map((item, index) => {
      const idPrefix = `${entryFieldId}${String(index).padStart(2, '0')}`;
      return CheckboxTextarea(idPrefix, item);
    })
  );
}


// Function for formatting an id based on prefix and suffix
function formatId(idPrefix, idSuffix) {
  return `${idPrefix}${titleCase(idSuffix)}`;
}


// Function for turning a given string to title case
function titleCase(str) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}


// Auto-adjust the height of all text areas when opening a accordion
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('accordion-button')) {
    const collapseId = event.target.getAttribute('data-bs-target').slice(1);
    document.getElementById(collapseId).querySelectorAll('textarea').forEach(
      textarea => resizeTextarea(textarea)
    );
  }
});
