const XmlRenderer = require('../src/XmlRenderer');
const MustacheTemplateCompiler = require('../src/MustacheTemplateCompiler');

// Returns an instance of XmlRenderer, ready to use.
module.exports = new XmlRenderer(
    new MustacheTemplateCompiler()
);
