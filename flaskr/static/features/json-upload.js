// Components
import { Accordion } from "../components/Accordion.js";
import { AccordionItem } from "../components/AccordionItem.js";
import { Bulletlist } from "../components/Bulletlist.js";
import { Bulletpoint } from "../components/Bulletpoint.js";
import { Card } from "../components/Card.js"
import { CardTitle } from "../components/CardTitle.js";
import { CommaSeparatedList } from "../components/CommaSeparatedList.js";
import { CommaSeparatedValue } from "../components/CommaSeparatedValue.js";
import { Entry } from "../components/Entry.js";
import { InlineField } from "../components/InlineField.js";
import { Label } from "../components/Label.js";
import { NestedSortableDiv } from "../components/NestedSortableDiv.js";
import { PrimaryButton } from "../components/PrimaryButton.js";
import { SortableAccordionItem } from "../components/SortableAccordionItem.js";
import { Section } from "../components/Section.js";


// Function imports
import { addDownloadEventListeners } from "./resume-download.js";


// Page elements
const button = document.getElementById('jsonUploadButton');
const input = document.getElementById('jsonUploadInput');
const output = document.getElementById('jsonUploadOutput');


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
    json: PrimaryButton('JSON')
  };

  addDownloadEventListeners(downloadButtons);

  return Card(
    CardTitle('div', 'Download'),
    ...Object.values(downloadButtons)
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
    ...sectionObjectArray.map(renderSection)
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
      sectionObject.entries,  // entryArray
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
    entryObject.name, // accordionBtnText
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
