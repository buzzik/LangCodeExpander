const LocaleCode = require('locale-code');
const util = require('util');
const fs = require('fs');
const FileWriter = require('./src/FileWriter.js');
const prompt = require('prompt-sync')();
const inputFile = 'input.txt';
const exporter = new FileWriter();


const inputArr = readFiles(inputFile);
let resultArr = [];
let resultFile = '';
let format = prompt(`1 - html, 2 - csv (1):`, '1');
let ext = (format === '2') ? '.csv' : '.html';

(async() => {
    for (const langCode of inputArr) {
        let resultString = ''
        let countryCode = langCode.substring(3);
        let localeCode = LocaleCode.getLanguageNativeName(langCode);
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
    resultFile = await exporter.writeArray(resultArr, `result${ext}`);
})();

function htmlString(langCode, countryCode, localeCode) {
    return `<li><span class="sorting-helper" style="display:none">${countryCode}</span><img width="20px" src="../images/svg/${countryCode.toLowerCase()}.svg"/> <span class="lang-name">${capitalizeFirstLetter(localeCode)}(${countryCode})</span></li>`;
}

function txtString(langCode, countryCode, localeCode) {
    return `${countryCode.toLowerCase()}.svg,${langCode},${capitalizeFirstLetter(localeCode)}(${countryCode})`;
}

function readFiles(filepath) {
    var data = fs.readFileSync(filepath, 'utf8');
    var content = util.format(data);
    let array = content.split(/\r?\n|\r/g);
    return array;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}