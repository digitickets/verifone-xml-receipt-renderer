const MustacheTemplateCompiler = require('../src/MustacheTemplateCompiler');

describe('MustacheTemplateCompiler', () => {
    /**
     * @type {MustacheTemplateCompiler}
     */
    let compiler;

    beforeEach(() => {
        compiler = new MustacheTemplateCompiler();
    });

    describe('compile', () => {
        it('Should return compiled string', (done) => {
            const template = '<p>{{ name }}</p>';
            const data = {
                name: 'Anthony'
            };

            compiler.compile(template, data)
                .then((result) => {
                    expect(result).toBe('<p>Anthony</p>');
                    done();
                })
                .catch(done.fail);
        });

        it('Should work with no data', (done) => {
            const template = '<p>hello</p>';

            compiler.compile(template)
                .then((result) => {
                    expect(result).toBe('<p>hello</p>');
                    done();
                })
                .catch(done.fail);
        });
    });
});
