const fs = require('fs');
const path = require('path');
const XmlRenderer = require('../src/XmlRenderer');

describe('XmlRenderer', () => {
    /**
     * @type {XmlRenderer}
     */
    let xmlRenderer;

    beforeEach(() => {
        xmlRenderer = new XmlRenderer();
    });

    describe('setTemplateString', () => {
        it('Should allow overriding the template', () => {
            const customTemplate = '<p>my custom template</p>';
            expect(xmlRenderer.getTemplateString()).not.toBe(customTemplate);
            xmlRenderer.setTemplateString(customTemplate);
            expect(xmlRenderer.getTemplateString()).toBe(customTemplate);
        });
    });

    describe('renderXml', () => {
        beforeEach(() => {
            xmlRenderer.setTemplateString(fs.readFileSync(path.join(__dirname, '../src/templates/verifone-xml-receipt.mustache')).toString());
        });

        it('Should have signature line on merchant swipe receipt', () => {
            const xml = fs.readFileSync(path.resolve(__dirname, '../examples/input/swipe-authorized-merchant.xml'));
            return xmlRenderer.renderXml(xml)
                .then((result) => {
                    expect(result).toMatch(/class="signature-box"/);
                    expect(result).toMatch(/please sign below/i);
                });
        });

        it('Should not have signature line on customer swipe receipt', () => {
            const xml = fs.readFileSync(path.resolve(__dirname, '../examples/input/swipe-authorized-customer.xml'));
            return xmlRenderer.renderXml(xml)
                .then((result) => {
                    expect(result).not.toMatch(/class="signature-box"/);
                    expect(result).not.toMatch(/please sign below/i);
                });
        });

        describe('Extended receipts', () => {
            it('Should have extended receipt fields', () => {
                const xml = fs.readFileSync(path.resolve(__dirname, '../examples/input/icc-chip-and-pin-authorized-customer-extended.xml'));
                return xmlRenderer.renderXml(xml)
                    .then((result) => {
                        expect(result).toMatch(/AID:/);
                        expect(result).toMatch(/CID:/i);
                        expect(result).toMatch(/IAD:/i);
                        expect(result).toMatch(/UN:/i);
                        expect(result).toMatch(/ATC:/i);
                        expect(result).toMatch(/TVR:/i);
                        expect(result).toMatch(/TxnDateTime:/i);
                        expect(result).toMatch(/TxnType:/i);
                        expect(result).toMatch(/Amount:/i);
                        expect(result).toMatch(/TransactionCurrencyCode:/i);
                        expect(result).toMatch(/AIP:/i);
                        expect(result).toMatch(/TCtry:/i);
                        expect(result).toMatch(/CVMR:/i);
                        expect(result).toMatch(/AmtO:/i);
                        expect(result).toMatch(/TSI:/i);
                        expect(result).toMatch(/TACDef:/i);
                        expect(result).toMatch(/TACDen:/i);
                        expect(result).toMatch(/TACOnl:/i);
                        expect(result).toMatch(/IACDef:/i);
                        expect(result).toMatch(/IACDen:/i);
                        expect(result).toMatch(/IACOnl:/i);
                    });
            });
        });
    });
});
