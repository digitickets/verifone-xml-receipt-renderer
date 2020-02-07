const fs = require('fs');
const path = require('path');
const XmlRenderer = require('../src/XmlRenderer');

describe('XmlRenderer', () => {
    /**
     * @type {XmlRenderer}
     */
    let xmlRenderer;

    beforeEach(() => {
        xmlRenderer = new XmlRenderer();
    });

    describe('setTemplateString', () => {
        it('Should allow overriding the template', () => {
            const customTemplate = '<p>my custom template</p>';
            expect(xmlRenderer.getTemplateString()).not.toBe(customTemplate);
            xmlRenderer.setTemplateString(customTemplate);
            expect(xmlRenderer.getTemplateString()).toBe(customTemplate);
        });
    });

    describe('renderXml', () => {
        beforeEach(() => {
            xmlRenderer.setTemplateString(fs.readFileSync(path.join(__dirname, '../src/templates/verifone-xml-receipt.mustache')).toString());
        });

        it('Should produce HTML', () => {
            const xml = fs.readFileSync(path.resolve(__dirname, 'examples/p400-declined-receipt.xml'));
            return xmlRenderer.renderXml(xml)
                .then((result) => {
                    // TODO: Check things
                    console.log(result);
                });
        });
    });
});
