const mustache = require('mustache');

/**
 * Compile a Mustache template string using the given data.
 *
 * @param {string} templateContents
 * @param {object} [data]
 *
 * @return {Promise<string>}
 */
const compileMustacheTemplate = (templateContents, data) => new Promise((resolve) => {
    // Ensure data is an object.
    data = data || {};

    resolve(mustache.render(templateContents, data));
});

module.exports = { compileMustacheTemplate };
