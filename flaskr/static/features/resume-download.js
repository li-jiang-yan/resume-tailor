// Functions to export
export function addDownloadEventListeners(downloadButtons) {
  downloadButtons.master.addEventListener('click', () => {
    downloadJSON(createObject(true));
  });
  downloadButtons.json.addEventListener('click', () => {
    downloadJSON(createObject(false));
  });
  downloadButtons.word.addEventListener('click', downloadWord);
}


// Private functions
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


async function downloadWord() {
  const response = await fetch('/word', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createObject(false))
  });
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  // Create an anchor element and click it
  const link = document.createElement('a');
  link.href = url;
  link.download = 'resume.docx';
  link.click();

  URL.revokeObjectURL(url);
}


function createObject(all=true) {
  const header = document.getElementById('resumeHeader');
  const summary = document.getElementById('summaryTextarea');
  const sections = document.getElementById('resumeSections');

  return {
    ...parseHeader(header),
    ...parseSummary(summary),
    ...parseSections(sections, all)
  };
}


function parseHeader(header) {
  const fields = header.querySelectorAll('.inline-field');
  return {
    header: {
      name: fields[0].querySelector('input').value,
      email: fields[1].querySelector('input').value,
      mobile: fields[2].querySelector('input').value,
      portfolio: fields[3].querySelector('input').value,
      linkedin: fields[4].querySelector('input').value
    }
  };
}


function parseSummary(summaryElement) {
  return {
    summary: summaryElement.value
  };
}


function parseSections(sectionsElement, all) {
  const sectionElements = Array.from(sectionsElement.querySelectorAll('.section'));
  return {
    sections: filter(sectionElements, all).map((sectionElement) => parseSection(sectionElement, all))
  };
}


function filter(elementArray, all) {
  return elementArray.filter((element) => all ? true : isChecked(element));
}


function isChecked(rowElement) {
  return rowElement.querySelector('.checkbox').checked;
}


function parseSection(sectionElement, all) {
  const result = {};
  const sectionTitle = sectionElement.querySelector('.section-title');
  const entries = filter(Array.from(sectionElement.querySelectorAll('.entry')), all);
  result.title = sectionTitle.querySelector('input').value;

  if (sectionElement.classList.contains('section-skill')) {
    result.type = 'skill';
    result.entries = entries.map(parseCSV);
  } else if (sectionElement.classList.contains('section-certification')) {
    result.type = 'certification';
    result.entries = entries.map(parseCertification);
  } else if (sectionElement.classList.contains('section-default')) {
    result.type = 'default';
    result.entries = entries.map((entry) => parseEntry(entry, all));
  } else if (sectionElement.classList.contains('section-employment')) {
    result.type = 'employment';
    result.entries = entries.map((entry) => parseEmployment(entry, all));
  }

  return result;
}


function parseCSV(entry) {
  return entry.querySelector('.input-text').value;
}


function parseCertification(entry) {
  const fields = entry.querySelectorAll('.inline-field');
  return {
    'name': fields[0].querySelector('input').value,
    'institution': fields[1].querySelector('input').value,
    'dates': fields[2].querySelector('input').value
  };
}


function parseEntry(entry, all) {
  const fields = entry.querySelectorAll('.inline-field');
  return {
    'name': fields[0].querySelector('input').value,
    'dates': fields[1].querySelector('input').value,
    'bulletlist': filter(Array.from(entry.querySelectorAll('.bulletpoint')), all).map(parseBulletpoint)
  };
}


function parseBulletpoint(bulletpointElement) {
  return bulletpointElement.querySelector('textarea').value;
}


function parseEmployment(entry, all) {
  const fields = entry.querySelectorAll('.inline-field');
  return {
    'name': fields[0].querySelector('input').value,
    'company': fields[1].querySelector('input').value,
    'dates': fields[2].querySelector('input').value,
    'bulletlist': filter(Array.from(entry.querySelectorAll('.bulletpoint')), all).map(parseBulletpoint)
  };
}
