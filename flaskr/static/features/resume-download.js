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
  return {
    header: parseChildren(header, true)
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


function parseElement(inputElement, all) {
  if (inputElement.classList.contains('inline-field')) {
    const key = convertToKey(inputElement.querySelector('label').innerText);
    const value = inputElement.querySelector('input').value;
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


function convertToKey(str) {
  return str.trim().toLowerCase();
}


function isChecked(rowElement) {
  return rowElement.querySelector('.checkbox').checked;
}


function parseBulletpoint(bulletpointElement) {
  return bulletpointElement.querySelector('textarea').value;
}


function parseSummary(summaryElement) {
  return {
    summary: summaryElement.value
  };
}


function parseSections(sectionsElement, all) {
  return {
    sections: Array.from(sectionsElement.querySelectorAll('.section')).filter(
      (sectionElement) => all ? true : isChecked(sectionElement)
    ).map(
      (sectionElement) => parseSection(sectionElement, all)
    )
  };
}


function parseSection(sectionElement, all) {
  const result = {};
  const sectionTitle = sectionElement.querySelector('.section-title');
  result.title = sectionTitle.querySelector('input').value;

  const entries = Array.from(sectionElement.querySelectorAll('.entry')).filter(
    (entryElement) => all ? true : isChecked(entryElement)
  ).map(
    (entryElement) => parseEntry(entryElement, all)
  );
  if (entries.length !== 0) result.entries = entries;

  const cslist = Array.from(sectionElement.querySelectorAll('.csv')).filter(
    (csvElement) => all ? true : isChecked(csvElement)
  ).map(
    (csvElement) => parseCSV(csvElement)
  );
  if (cslist.length !== 0) result.cslist = cslist;

  const certifications = Array.from(sectionElement.querySelectorAll('.certification')).filter(
    (certificationElement) => all ? true : isChecked(certificationElement)
  ).map(
    (certificationElement) => parseEntry(certificationElement, all)
  );
  if (certifications.length !== 0) result.certifications = certifications;

  return result;
}


function parseEntry(entryElement, all) {
  return parseChildren(entryElement, all);
}


function parseCSV(csvElement) {
  return csvElement.querySelector('.input-text').value;
}
