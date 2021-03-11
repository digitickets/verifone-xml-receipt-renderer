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

    /**
     * Should extended receipts always be created?
     *
     * @type {boolean}
     */
    this.extendedReceipts = false;

    /**
     * Additional text (HTML) to add to the top of every receipt.
     *
     * @type {string}
     */
    this.customHeader = '';

    /**
     * Additional text (HTML) to add to the bottom of every receipt.
     *
     * @type {string}
     */
    this.customFooter = '';
};

XmlRenderer.prototype = {
    /**
     * @param {string} value
     */
    setCustomHeader(value) {
        this.customHeader = value || '';
    },

    /**
     * @param {string} value
     */
    setCustomFooter(value) {
        this.customFooter = value || '';
    },

    /**
     * @param {boolean} value
     */
    setExtendedReceipts(value) {
        this.extendedReceipts = value;
    },

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
                data = prepData(data);

                // Enable extended receipts of the XML says to or if extended receipts are enabled.
                data.isExtended = !!(data.isExtended || this.extendedReceipts);

                data.customHeader = this.customHeader;
                data.customFooter = this.customFooter;

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
