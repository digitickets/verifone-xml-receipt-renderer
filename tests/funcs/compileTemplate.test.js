const { compileMustacheTemplate } = require('../../src/funcs/compileTemplate');

describe('compileTemplate', () => {
    describe('compileMustacheTemplate', () => {
        it('Should return compiled string', (done) => {
            const template = '<p>{{ name }}</p>';
            const data = {
                name: 'Anthony'
            };

            compileMustacheTemplate(template, data)
                .then((result) => {
                    expect(result).toBe('<p>Anthony</p>');
                    done();
                })
                .catch(done.fail);
        });

        it('Should work with no data', (done) => {
            const template = '<p>hello</p>';

            compileMustacheTemplate(template)
                .then((result) => {
                    expect(result).toBe('<p>hello</p>');
                    done();
                })
                .catch(done.fail);
        });
    });
});
