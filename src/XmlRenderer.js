const xml2js = require('browser-xml2js');
const { prepData } = require('./prepData');

/**
 * @param {MustacheTemplateCompiler} mustacheTemplateCompiler
 */
const XmlRenderer = function (
    mustacheTemplateCompiler
) {
    this.templateCompiler = mustacheTemplateCompiler;
};

XmlRenderer.prototype = {
    renderXml(xmlString) {
        return this.parseXml(xmlString)
            .then((data) => {
                prepData(data);
                return this.renderData(data);
            });
    },

    /**
     * @param {string} xmlString
     *
     * @return {Promise<string>}
     */
    parseXml(xmlString) {
        return new Promise((resolve, reject) => {
            // https://www.npmjs.com/package/browser-xml2js recommends creating a new parser for each string.
            const parser = new xml2js.Parser({
                emptyTag: null, // Default value for empty tags.
                explicitArray: false, // Don't make all values be arrays.
                valueProcessors: [
                    xml2js.processors.parseBooleans, // Convert boolean-like strings to booleans.
                ]
            });

            parser.parseString(
                xmlString,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else if (result && result.VoucherDetails) {
                        resolve(result.VoucherDetails);
                    } else {
                        reject(new Error('XML did not contain VoucherDetails'));
                    }
                }
            );
        });
    },

    getTemplateContents() {
        // FIXME!!!
        const fs = require('fs');
        const path = require('path');
        return fs.readFileSync(path.join(__dirname, 'templates/verifone-xml-receipt.mustache')).toString();
    },

    /**
     * @param {{}} data Contents of the VoucherDetails element of the Verifone XML.
     *
     * @return {Promise<string>}
     */
    renderData(data) {
        return this.templateCompiler.compile(
            this.getTemplateContents(),
            data
        );
    }
};

module.exports = XmlRenderer;
