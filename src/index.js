const XmlRenderer = require('../src/XmlRenderer');

// Returns an instance of XmlRenderer, ready to use.
const renderer = new XmlRenderer();

// FIXME: Better way to import the template.
const fs = require('fs');
const path = require('path');
renderer.setTemplateString(fs.readFileSync(path.join(__dirname, 'templates/verifone-xml-receipt.mustache')).toString());

module.exports = renderer;
