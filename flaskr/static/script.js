import { Accordion } from "./components/Accordion.js";
import { AccordionItem } from "./components/AccordionItem.js";
import { Bulletlist } from "./components/Bulletlist.js";
import { Bulletpoint } from "./components/Bulletpoint.js";
import { Canvas } from "./components/Canvas.js";
import { Card } from "./components/Card.js"
import { CardTitle } from "./components/CardTitle.js";
import { CommaSeparatedList } from "./components/CommaSeparatedList.js";
import { CommaSeparatedValue } from "./components/CommaSeparatedValue.js";
import { Entry } from "./components/Entry.js";
import { InlineField } from "./components/InlineField.js";
import { Label } from "./components/Label.js";
import { NestedSortableDiv } from "./components/NestedSortableDiv.js";
import { PrimaryButton } from "./components/PrimaryButton.js";
import { Section } from "./components/Section.js";
import { SortableAccordionItem } from "./components/SortableAccordionItem.js";
import { Spinner } from "./components/Spinner.js";


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

// Parent elements in resume editor
const editorElement = {
  download: null,
  header: null,
  sections: null
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
  jobAnalysisElement.output.replaceChildren(Spinner());

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
  const canvas = Canvas();
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
  summaryElement.output.replaceChildren(Spinner());

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

    // Define editor elements to be used later
    editorElement.download = renderDownloadCard();
    editorElement.header = renderHeader(fileObject.document.header);
    editorElement.sections = renderSections(fileObject.document.sections);

    // Add all elements to output of JSON upload
    jsonUploadElement.output.replaceChildren(
      editorElement.download,
      Accordion(
        editorElement.header,
        editorElement.sections
      )
    );
  } catch (error) {
    console.error('Error reading file:', error);
  }
});


// Function for render download card
function renderDownloadCard() {
  const downloadButtons = {
    master: PrimaryButton('Master'),
    json: PrimaryButton('JSON')
  };

  addDownloadEventListeners(downloadButtons);

  return Card(
    CardTitle('div', 'Download'),
    ...Object.values(downloadButtons)
  );
}


// Function to add download event listeners
function addDownloadEventListeners(downloadButtons) {
  downloadButtons.master.addEventListener('click', () => {
    downloadJSON(createObject(true));
  });
  downloadButtons.json.addEventListener('click', () => {
    downloadJSON(createObject(false));
  });
}


// Function to download a given JSON file
function downloadJSON(jsonObject) {
  const blob = new Blob(
    [ JSON.stringify(jsonObject, null, 2) ],
    { type: 'application/json' }
  );
  const url = URL.createObjectURL(blob);

  // Create an anchor element and click it
  const link = document.createElement('a');
  link.href = url;
  link.download = 'resume.json';
  link.click();

  URL.revokeObjectURL(url);
}


// Function for taking all elements on page to create object
function createObject(all=true) {
  const header = editorElement.header;
  const sections = editorElement.sections;

  return {
    ...parseChildren(header, all),
    ...parseSections(sections, all)
  };
}


function parseChildren(parentElement, all) {
  return Object.fromEntries(
    Array.from([
      ...parentElement.querySelectorAll('.inline-field'),
      ...parentElement.querySelectorAll('.bulletlist')
    ]).map(
      (inputElement) => parseElement(inputElement, all)
    )
  );
}


// Function for parsing input elements
function parseElement(inputElement, all) {
  if (inputElement.classList.contains('inline-field')) {
    const key = convertToKey(inputElement.querySelectorAll('label')[0].innerText);
    const value = inputElement.querySelectorAll('input')[0].value;
    return [key, value];
  } else if (inputElement.classList.contains('bulletlist')) {
    const key = 'bulletlist';
    const value = Array.from(inputElement.querySelectorAll('.bulletpoint')).filter(
      (bulletpointElement) => all ? true : isChecked(bulletpointElement)
    ).map(parseBulletpoint);
    return [key, value];
  } else {
    return null;
  }
}


// Function for checking if bulletpoint/comma separated value is checked
function isChecked(rowElement) {
  return rowElement.querySelectorAll('.checkbox')[0].checked;
}


// Function for parsing sections
function parseSections(sectionsElement, all) {
  return {
    sections: Array.from(sectionsElement.querySelectorAll('.section')).filter(
      (sectionElement) => all ? true : isChecked(sectionElement)
    ).map(
      (sectionElement) => parseSection(sectionElement, all)
    )
  };
}


// Function for parsing a given section
function parseSection(sectionElement, all) {
  const result = {};
  const sectionTitle = sectionElement.querySelectorAll('.section-title')[0];
  result.title = sectionTitle.querySelectorAll('input')[0].value;

  const entries = Array.from(sectionElement.querySelectorAll('.entry')).filter(
    (entryElement) => all ? true : isChecked(entryElement)
  ).map(
    (entryElement) => parseEntry(entryElement, all)
  );
  if (entries.length !== 0) result.entries = entries;

  const cslist = Array.from(sectionElement.querySelectorAll('.csv')).filter(
    (csvElement) => all ? true : isChecked(csvElement)
  ).map(
    (csvElement) => parseCsv(csvElement)
  );
  if (cslist.length !== 0) result.cslist = cslist;

  return result;
}


// Function for parsing a section entry
function parseEntry(entryElement, all) {
  return parseChildren(entryElement, all);
}


// Function for parsing a bulletpoint
function parseBulletpoint(bulletpointElement) {
  return bulletpointElement.querySelectorAll('textarea')[0].value;
}


// Function for parsing a comma separated value
function parseCsv(csvElement) {
  return csvElement.querySelectorAll('.input-text')[0].value;
}


// Function for trimming strings and converting them to lowercase
function convertToKey(str) {
  return str.trim().toLowerCase();
}


// Function for rendering headers
function renderHeader(headerObject) {
  return AccordionItem(
    'Header', // btnText
    InlineField('Name', 'text', headerObject.name),
    InlineField('Email', 'email', headerObject.email),
    InlineField('Mobile', 'tel', headerObject.mobile),
    InlineField('Portfolio', 'url', headerObject.portfolio),
    InlineField('LinkedIn', 'url', headerObject.linkedin)
  );
}


// Function for rendering sections
function renderSections(sectionObjectArray) {
  return SortableAccordionItem(
    'sectionCollapse',  // collapseId
    'Sections',         // btnText
    ...sectionObjectArray.map(renderSection)
  )
}


// Function for rendering a given section
function renderSection(sectionObject) {
  let sectionContent = 'lorem ipsum';

  if (Object.hasOwn(sectionObject, 'cslist')) {
    sectionContent = renderCSV(
      sectionObject.cslist,   // csvArray
      'text'                  // inputType
    );
  } else if (Object.hasOwn(sectionObject, 'entries')) {
    sectionContent = renderEntries(
      sectionObject.entries,  // entryArray
    )
  }

  return Section(
    sectionObject.title,      // accordionBtnText
    sectionContent            // accordionBodyChildren
  );
}


// Function for rendering comma separated values
function renderCSV(csvArray, inputType) {
  return CommaSeparatedList(
    Label('List'),
    ...csvArray.map((value) => CommaSeparatedValue(inputType, value))
  );
}


// Function for rendering entries
function renderEntries(entryArray) {
  return NestedSortableDiv(
    ...entryArray.map(renderEntry)
  );
}


// Function for rendering a single entry
function renderEntry(entryObject) {
  return Entry(
    entryObject.name, // accordionBtnText
    ...renderEntryFields(entryObject)
  );
}


// Function for rendering entry fields
function renderEntryFields(entryObject) {
  return Object.entries(entryObject).map(
    ([key, value]) => renderEntryField(key, value)
  );
}


// Function for rendering a single entry field
function renderEntryField(key, value) {
  if (key === 'bulletlist') {
    return renderBulletlist(value);
  } else {
    return InlineField(titleCase(key), 'text', value);
  }
}


// Function for rendering bulletlists
function renderBulletlist(sourceArray) {
  return Bulletlist(
    Label('Bulletlist'),
    ...sourceArray.map(Bulletpoint)
  );
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
