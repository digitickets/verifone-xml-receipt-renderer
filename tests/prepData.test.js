const { prepData } = require('../src/prepData');

describe('prepData', () => {
    it.each([
        ['merchant', true, false],
        ['Merchant', true, false],
        ['MerchantDeclined', true, false],
        ['customer', false, true],
        ['Customer', false, true],
        ['CustomerDeclined', false, true],
        ['cardholder', false, false],
    ])(
        'Should set isMerchant and isCustomer when ReceiptType is %s',
        (ReceiptType, isMerchant, isCustomer) => {
            const result = prepData({ ReceiptType });
            expect(result.isMerchant).toBe(isMerchant);
            expect(result.isCustomer).toBe(isCustomer);
        }
    );

    it.each([
        [{ ReceiptType: 'MerchantSignature' }, true],
        [{ ReceiptType: 'CardholderSignature' }, false],
        [{ CVM: 'Please Sign Below' }, true],
        [{ CVM: 'please sign' }, true],
        [{ CVM: 'please do a squiggle' }, false],
    ])(
        'When data is %j should set showSignatureLine to %j',
        (data, expected) => {
            const result = prepData(data);
            expect(result.showSignatureLine).toBe(expected);
        }
    );
});
