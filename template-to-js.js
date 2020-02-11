/**
 * This is a simple script that converts the mustache template to a JS string.
 */

const fs = require('fs');
const path = require('path');

const templateStr = fs.readFileSync(path.join(__dirname, 'src/templates/verifone-xml-receipt.mustache')).toString();
fs.writeFileSync(
    path.join(__dirname, 'src/templates/verifone-xml-receipt.js'),
    `const templateStr = ${JSON.stringify(templateStr)};\nmodule.exports = templateStr;\n`
);
