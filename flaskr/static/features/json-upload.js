// Components
import { Accordion } from "../components/Accordion.js";
import { AccordionItem } from "../components/AccordionItem.js";
import { Card } from "../components/Card.js"
import { CardBody } from "../components/CardBody.js";
import { CardImgTop } from "../components/CardImgTop.js";
import { CardTitle } from "../components/CardTitle.js";
import { Certification } from "../components/Certification.js";
import { CommaSeparatedValue } from "../components/CommaSeparatedValue.js";
import { CommaSeparatedValues } from "../components/CommaSeparatedValues.js";
import { DefaultEntry } from "../components/DefaultEntry.js";
import { Div } from "../components/Div.js";
import { Employment } from "../components/Employment.js";
import { FormText } from "../components/FormText.js";
import { InlineField } from "../components/InlineField.js";
import { Modal } from "../components/Modal.js";
import { ModalBody } from "../components/ModalBody.js";
import { ModalHeader } from "../components/ModalHeader.js";
import { NestedSortableDiv } from "../components/NestedSortableDiv.js";
import { NonBreakingSpace } from "../components/NonBreakingSpace.js";
import { Plus } from "../components/icons/Plus.js";
import { PrimaryButton } from "../components/PrimaryButton.js";
import { Section } from "../components/Section.js";
import { SortableDiv } from "../components/SortableDiv.js";
import { SuccessButton } from "../components/SuccessButton.js";


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
  // Add Section
  const addButton = SuccessButton(Plus(), NonBreakingSpace(), 'Section');
  const selections = {
    skill: {
      src: '../static/images/skill.png',
      button: PrimaryButton('Skill Section'),
      description: 'Add a new skill section where values are separated by commas.'
    },
    certification: {
      src: '../static/images/certification.png',
      button: PrimaryButton('Certification Section'),
      description: 'Add a new certification section where certifications are separated by bulletpoints.'
    },
    default: {
      src: '../static/images/default.png',
      button: PrimaryButton('Education/Project Section'),
      description: 'Add a new education/project section where each education/project has a heading, date(s) and a bulletlist.'
    },
    employment: {
      src: '../static/images/employment.png',
      button: PrimaryButton('Employment Section'),
      description: 'Add a new employment section where each employment has a heading, date(s), a subheading (company) and a bulletlist.'
    }
  };
  const modalElement = Modal(
    ModalHeader('Add New Section'),
    ModalBody(
      ...Object.entries(selections).map(([_, value]) => {
        const card = Card(
          CardImgTop(value.src),
          CardBody(value.button, Div(value.description))
        );
        value.button.classList.add('mb-3');
        card.classList.add('mb-3');

        return card;
      })
    )
  );
  const modal = new bootstrap.Modal(modalElement);

  // Add Section: Event listeners
  addButton.addEventListener('click', () => {
    modal.show();
  });

  // Add Section: Suppress aria-hidden warnings
  modalElement.addEventListener('hide.bs.modal', (event) => {
    if (event.defaultPrevented) return;

    const focused = document.activeElement;
    if (focused instanceof HTMLElement && modalElement.contains(focused)) {
      focused.blur();
    }
  });

  modalElement.addEventListener('hidden.bs.modal', () => {
    if (addButton.isConnected && !addButton.disabled) {
      addButton.focus({ preventScroll: true });
    }
  });

  const sectionsBody = SortableDiv(...sectionObjectArray.map(renderSection));
  const sections = AccordionItem(
    'Sections',  // buttonText
    addButton,
    sectionsBody,
    FormText(
      `Here, you may drag each section (as well as elements within each section) to sort them as shown in the resume output (some recruiters like resumes that are mirrors the job post description's structure). You may also use the checkboxes to include/exclude certain points from the resume as needed.`
    )
  );
  sections.id = 'resumeSections';  // set id for use in createObject
  return sections;
}


function renderSection(sectionObject) {
  const addButton = SuccessButton(Plus(), NonBreakingSpace(), 'Entry');
  addButton.addEventListener('click', () => {
    if (sectionObject.type === 'skill') {
      sectionContent.querySelector('.nested-sorted').prepend(CommaSeparatedValue());
    } else if (sectionObject.type === 'certification') {
      sectionContent.prepend(Certification());
    } else if (sectionObject.type === 'default') {
      sectionContent.prepend(DefaultEntry());
    } else if (sectionObject.type === 'employment') {
      sectionContent.prepend(Employment());
    }
  });

  const sectionContent = renderSectionContent(sectionObject);
  const section = Section(
    sectionObject.title,  // accordionButtonText
    addButton,            // accordionBodyChildren
    sectionContent
  );
  section.classList.add(`section-${sectionObject.type}`);
  return section;
}


function renderSectionContent(sectionObject) {
  if (sectionObject.type === 'skill') {
    return renderCSV(sectionObject.entries);
  } else if (sectionObject.type === 'certification') {
    return renderCertifications(sectionObject.entries);
  } else if (sectionObject.type === 'default') {
    return renderEntries(sectionObject.entries);
  } else if (sectionObject.type === 'employment') {
    return renderEmployment(sectionObject.entries);
  }
}


function renderCSV(values) {
  return CommaSeparatedValues(...values);
}


function renderCertifications(certificationArray) {
  return NestedSortableDiv(
    ...certificationArray.map(Certification)
  );
}


function renderEntries(entryArray) {
  return NestedSortableDiv(
    ...entryArray.map(DefaultEntry)
  );
}

function renderEmployment(employmentArray) {
  return NestedSortableDiv(
    ...employmentArray.map(Employment)
  );
}
