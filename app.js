const LocaleCode = require('locale-code');
const util = require("util");
const fs = require("fs");
const FileWriter = require('./src/FileWriter.js');
const inputFile = 'input.txt';
const exporter = new FileWriter();

const inputArr = readFiles(inputFile);
let resultArr = [];
let resultFile = '';

(async() => {
    for (const langCode of inputArr) {
        let countryCode = langCode.substring(3);
        let localeCode = LocaleCode.getLanguageNativeName(langCode);
        let resultString = htmlString(langCode, countryCode, localeCode);
        resultArr.push(resultString);
        // console.log(htmlString(langCode, countryCode, localeCode));
    }
    resultFile = await exporter.writeArray(resultArr, "result");
})();

function htmlString(langCode, countryCode, localeCode) {
    return `<li><img width="20px" src="../images/svg/${countryCode.toLowerCase()}.svg"/> <span class="lang-name">${capitalizeFirstLetter(localeCode)}(${countryCode})</span></li>`;
}

function txtString(langCode, countryCode, localeCode) {
    return `${langCode},${localeCode},${capitalizeFirstLetter(localeCode)}(${countryCode}),../images/svg/${countryCode.toLowerCase()}.svg`;
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