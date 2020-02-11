const defaultTemplate = require('./templates/verifone-xml-receipt');
const { compileMustacheTemplate } = require('./funcs/compileTemplate');
const { parseXml } = require('./funcs/parseXml');
const { prepData } = require('./funcs/prepData');

const XmlRenderer = function () {
    /**
     * The mustache template to use to render the receipts.
     *
     * @private
     * @type {string}
     */
    this.templateString = defaultTemplate;
};

XmlRenderer.prototype = {
    /**
     * Take a string of raw XML from a Verifone response, parses it, and renders it with the HTML template.
     * Returns a string of HTML.
     *
     * @param {string} xmlString
     * @return {Promise<string>}
     */
    renderXml(xmlString) {
        return parseXml(xmlString)
            .then((data) => {
                prepData(data);
                return this.renderTemplateWithData(data);
            });
    },

    /**
     * @param {string} templateString
     */
    setTemplateString(templateString) {
        this.templateString = templateString;
    },

    /**
     * @return {string}
     */
    getTemplateString() {
        return this.templateString;
    },

    /**
     * @private
     *
     * @param {{}} data Contents of the VoucherDetails element of the Verifone XML.
     *
     * @return {Promise<string>}
     */
    renderTemplateWithData(data) {
        return compileMustacheTemplate(
            this.getTemplateString(),
            data
        );
    }
};

module.exports = XmlRenderer;
