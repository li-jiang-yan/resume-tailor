// Components
import { Accordion } from "../components/Accordion.js";
import { AccordionItem } from "../components/AccordionItem.js";
import { Bulletlist } from "../components/Bulletlist.js";
import { Bulletpoint } from "../components/Bulletpoint.js";
import { Card } from "../components/Card.js"
import { CardTitle } from "../components/CardTitle.js";
import { Certification } from "../components/Certification.js";
import { CommaSeparatedList } from "../components/CommaSeparatedList.js";
import { CommaSeparatedValue } from "../components/CommaSeparatedValue.js";
import { Entry } from "../components/Entry.js";
import { FormTextDiv } from "../components/FormTextDiv.js";
import { InlineField } from "../components/InlineField.js";
import { Label } from "../components/Label.js";
import { NestedSortableDiv } from "../components/NestedSortableDiv.js";
import { PrimaryButton } from "../components/PrimaryButton.js";
import { SortableAccordionItem } from "../components/SortableAccordionItem.js";
import { Section } from "../components/Section.js";


// Function imports
import { addDownloadEventListeners } from "./resume-download.js";


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
    CardTitle('div', 'Download'),
    ...Object.values(downloadButtons),
    FormTextDiv(
      'After editing the resume below to your liking, you may download an updated master resume JSON (Master button), a non-master resume JSON (JSON button), or a formatted Word Doc resume (Word button).'
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
  const sections = SortableAccordionItem(
    'Sections',  // buttonText
    ...sectionObjectArray.map(renderSection),
    FormTextDiv(
      `Here, you may drag each section (as well as elements within each section) to sort them as shown in the resume output (some recruiters like resumes that are mirrors the job post description's structure). You may also use the checkboxes to include/exclude certain points from the resume as needed.`
    )
  );
  sections.id = 'resumeSections';  // set id for use in createObject
  return sections;
}


function renderSection(sectionObject) {
  let sectionContent = 'lorem ipsum';

  if (Object.hasOwn(sectionObject, 'cslist')) {
    sectionContent = renderCSV(
      sectionObject.cslist,   // csvArray
      'text'                  // inputType
    );
  } else if (Object.hasOwn(sectionObject, 'entries')) {
    sectionContent = renderEntries(
      sectionObject.entries   // entryArray
    )
  } else if (Object.hasOwn(sectionObject, 'certifications')) {
    sectionContent = renderCertifications(
      sectionObject.certifications
    )
  }

  return Section(
    sectionObject.title,      // accordionButtonText
    sectionContent            // accordionBodyChildren
  );
}


function renderCSV(csvArray, inputType) {
  return CommaSeparatedList(
    Label('List'),
    ...csvArray.map((value) => CommaSeparatedValue(inputType, value))
  );
}


function renderEntries(entryArray) {
  return NestedSortableDiv(
    ...entryArray.map(renderEntry)
  );
}


function renderEntry(entryObject) {
  return Entry(
    entryObject.name,  // accordionButtonText
    ...renderEntryFields(entryObject)
  );
}


function renderEntryFields(entryObject) {
  return Object.entries(entryObject).map(
    ([key, value]) => renderEntryField(key, value)
  );
}


function renderEntryField(key, value) {
  if (key === 'bulletlist') {
    return renderBulletlist(value);
  } else {
    return InlineField(titleCase(key), 'text', value);
  }
}


function renderBulletlist(sourceArray) {
  return Bulletlist(
    Label('Bulletlist'),
    ...sourceArray.map(Bulletpoint)
  );
}


function titleCase(str) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}


function renderCertifications(certificationArray) {
  return NestedSortableDiv(
    ...certificationArray.map(renderCertification)
  );
}


function renderCertification(certificationObject) {
  return Certification(
    certificationObject.name,  // accordionButtonText
    ...renderEntryFields(certificationObject)
  );
}
