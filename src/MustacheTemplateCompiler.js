const mustache = require('mustache');

const MustacheTemplateCompiler = function () {

};

MustacheTemplateCompiler.prototype = {
    /**
     * Compile a Mustache template string using the given data.
     *
     * @param {string} templateContents
     * @param {object} [data]
     *
     * @return {Promise<string>}
     */
    compile(templateContents, data) {
        return new Promise((resolve) => {
            // Ensure data is an object.
            data = data || {};

            resolve(mustache.render(templateContents, data));
        });
    }
};

/* istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MustacheTemplateCompiler;
}
