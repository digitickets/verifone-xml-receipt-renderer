const { prepData } = require('../../src/funcs/prepData');

describe('prepData', () => {
    describe('isMerchant and isCustomer', () => {
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
    });

    describe('formattedExpiryDate', () => {
        it('Should add slash to expiry date when in expected format', () => {
            expect(prepData({ ExpiryDate: '0219' }).formattedExpiryDate).toBe('02/19');
        });

        it('Should not add slash to expiry date when not in expected format', () => {
            expect(prepData({}).formattedExpiryDate).toBe(null);
            expect(prepData({ ExpiryDate: '' }).formattedExpiryDate).toBe(null);
            expect(prepData({ ExpiryDate: '219' }).formattedExpiryDate).toBe('219');
            expect(prepData({ ExpiryDate: '022019' }).formattedExpiryDate).toBe('022019');
            expect(prepData({ ExpiryDate: 'Jan1' }).formattedExpiryDate).toBe('Jan1');
        });
    });

    describe('showSignatureLine', () => {
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

    describe('date and time', () => {
        it.each(
            [
                ['07/02/2020 12:51:22', '07/02/2020', '12:51:22', true],
                ['07-02-2020 12:51:22', '07-02-2020', '12:51:22', true],
                ['2020/02/07 12:51:22', '2020/02/07', '12:51:22', true],
                ['2020-02-07 12:51:22', '2020-02-07', '12:51:22', true],
                ['07/02/2020', null, null, false],
                ['12:51:22', null, null, false],
                ['', null, null, false],
                [null, null, null, false],
                ['                   ', null, null, false],
            ]
        )(
            'Should split date and time with format (%s)',
            (TxnDateTime, expectedDate, expectedTime, showSeparateDateTime) => {
                const result = prepData({ TxnDateTime });
                expect(result.date).toBe(expectedDate);
                expect(result.time).toBe(expectedTime);
                expect(result.showSeparateDateTime).toBe(showSeparateDateTime);
            }
        );
    });
});
