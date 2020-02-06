const XmlRenderer = require('../src/XmlRenderer');

describe('index', () => {
    it('Should return XmlRenderer instance', () => {
        const result = require('../src/index'); // eslint-disable-line global-require
        expect(result instanceof XmlRenderer).toBe(true);
    });
});
