const LocaleCode = require('locale-code');
const util = require('util');
const fs = require('fs');
const FileWriter = require('./src/FileWriter.js');
const prompt = require('prompt-sync')();
const inputFile = 'input.txt';
const exporter = new FileWriter();

const inputArr = readFiles(inputFile);
let resultArr = [];
const format = prompt(`1 - html, 2 - csv (1):`, '1');
const ext = format === '2' ? '.csv' : '.html';

(async () => {
  for (const langCode of inputArr) {
    let resultString = '';
    const countryCode = langCode.substring(3);
    const localeCode = LocaleCode.getLanguageNativeName(langCode);
    if (format === '1') {
      resultString = htmlString(langCode, countryCode, localeCode);
    }
    if (format === '2') {
      resultString = txtString(langCode, countryCode, localeCode);
    }
    resultArr.push(resultString);
    // console.log(htmlString(langCode, countryCode, localeCode));
  }
  resultArr.sort();
  await exporter.writeArray(resultArr, `result${ext}`);
})();

function htmlString(langCode, countryCode, localeCode) {
  return `<li><span class="sorting-helper" style="display:none">${countryCode}</span><img width="20px" src="../images/svg/${countryCode.toLowerCase()}.svg"/> <span class="lang-name">${capitalizeFirstLetter(
    localeCode
  )}(${countryCode})</span></li>`;
}

function txtString(langCode, countryCode, localeCode) {
  return `${countryCode.toLowerCase()}.svg,${langCode},${capitalizeFirstLetter(localeCode)}(${countryCode})`;
}

function readFiles(filepath) {
  const data = fs.readFileSync(filepath, 'utf8');
  const content = util.format(data);
  const array = content.split(/\r?\n|\r/g);
  return array;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
