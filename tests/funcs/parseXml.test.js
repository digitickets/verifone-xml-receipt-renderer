const fs = require('fs');
const path = require('path');
const { parseXml } = require('../../src/funcs/parseXml');

describe('parseXml', () => {
    it('Should convert XML to JSON', (done) => {
        const xml = fs.readFileSync(path.resolve(__dirname, '..', 'examples/p400-declined-receipt.xml'));
        parseXml(xml)
            .then((result) => {
                expect(result.hasOwnProperty('VoucherDetails')).toBe(false);
                expect(result.CardScheme).toBe('MasterCard');
                expect(result.ECommerce).toBe(false);
                expect(result.Amount).toBe('0.01');
                done();
            })
            .catch(done.fail);
    });

    it('Should fail with invalid XML', (done) => {
        const xml = 'hello';
        parseXml(xml)
            .then(done.fail)
            .catch((err) => {
                expect(err instanceof Error).toBe(true);
                done();
            });
    });

    it('Should fail with valid XML without VoucherDetails', (done) => {
        const xml = '<MyDocument><Animal>Cat</Animal></MyDocument>';
        parseXml(xml)
            .then(done.fail)
            .catch((err) => {
                expect(err instanceof Error).toBe(true);
                done();
            });
    });
});
