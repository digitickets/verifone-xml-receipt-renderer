const xml2js = require('browser-xml2js');

/**
 * @param {string} xmlString
 *
 * @return {Promise<string>}
 */
const parseXml = (xmlString) => new Promise((resolve, reject) => {
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

module.exports = { parseXml };
