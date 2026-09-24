// Components
import { Accordion } from "../components/Accordion.js";
import { AccordionItem } from "../components/AccordionItem.js";
import { Card } from "../components/Card.js"
import { CardBody } from "../components/CardBody.js";
import { CardTitle } from "../components/CardTitle.js";
import { Certification } from "../components/Certification.js";
import { CommaSeparatedValues } from "../components/CommaSeparatedValues.js";
import { Entry } from "../components/Entry.js";
import { FormText } from "../components/FormText.js";
import { InlineField } from "../components/InlineField.js";
import { NestedSortableDiv } from "../components/NestedSortableDiv.js";
import { PrimaryButton } from "../components/PrimaryButton.js";
import { Section } from "../components/Section.js";
import { SortableDiv } from "../components/SortableDiv.js";


// Function imports
import { addDownloadEventListeners } from "./resume-download.js";
import { resizeTextarea } from "../ui/textarea.js";


// Page elements
const button = document.getElementById('uploadButton');
const input = document.getElementById('jsonInput');
const output = document.getElementById('uploadOutput');


// Functions to export
export function enableUpload() {
  button.disabled = (input.length <= 0);
}


export async function uploadJson() {
  const file = input.files[0];

  try {
    const fileText = await file.text();
    const fileObject = JSON.parse(fileText);

    // Define editor elements to be used later
    const downloadCard = renderDownloadCard();
    const header = renderHeader(fileObject.header);
    const sections = renderSections(fileObject.sections);

    // Add all elements to output of JSON upload
    output.replaceChildren(
      downloadCard,
      Accordion(header, sections)
    );

    // Adjust all textareas
    document.querySelectorAll('textarea').forEach(resizeTextarea);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}


// Private functions
function renderDownloadCard() {
  const downloadButtons = {
    master: PrimaryButton('Master'),
    json: PrimaryButton('JSON'),
    word: PrimaryButton('Word')
  };

  addDownloadEventListeners(downloadButtons);

  return Card(
    CardBody(
      CardTitle('Download'),
      ...Object.values(downloadButtons),
      FormText(
        'After editing the resume below to your liking, you may download an updated master resume JSON (Master button), a non-master resume JSON (JSON button), or a formatted Word Doc resume (Word button).'
      )
    )
  );
}


function renderHeader(headerObject) {
  const header = AccordionItem(
    'Header',  // buttonText
    InlineField('Name', 'text', headerObject.name),
    InlineField('Email', 'email', headerObject.email),
    InlineField('Mobile', 'tel', headerObject.mobile),
    InlineField('Portfolio', 'url', headerObject.portfolio),
    InlineField('LinkedIn', 'url', headerObject.linkedin)
  );
  header.id = 'resumeHeader';  // set id for use in createObject
  return header;
}


function renderSections(sectionObjectArray) {
  const sections = AccordionItem(
    'Sections',  // buttonText
    SortableDiv(...sectionObjectArray.map(renderSection)),
    FormText(
      `Here, you may drag each section (as well as elements within each section) to sort them as shown in the resume output (some recruiters like resumes that are mirrors the job post description's structure). You may also use the checkboxes to include/exclude certain points from the resume as needed.`
    )
  );
  sections.id = 'resumeSections';  // set id for use in createObject
  return sections;
}


function renderSection(sectionObject) {
  return Section(
    sectionObject.title,                 // accordionButtonText
    renderSectionContent(sectionObject)  // accordionBodyChildren
  );
}


function renderSectionContent(sectionObject) {
  if (Object.hasOwn(sectionObject, 'cslist')) {
    return renderCSV(sectionObject.cslist);
  } else if (Object.hasOwn(sectionObject, 'entries')) {
    return renderEntries(sectionObject.entries);
  } else if (Object.hasOwn(sectionObject, 'certifications')) {
    return renderCertifications(sectionObject.certifications);
  }
}


function renderCSV(values) {
  return CommaSeparatedValues(...values);
}


function renderEntries(entryArray) {
  return NestedSortableDiv(
    ...entryArray.map(Entry)
  );
}


function renderCertifications(certificationArray) {
  return NestedSortableDiv(
    ...certificationArray.map(Certification)
  );
}
