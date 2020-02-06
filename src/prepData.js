/**
 * @param {string} receiptType
 * @return {boolean}
 */
const isMerchant = (receiptType) => (receiptType ? !!receiptType.match(/^Merchant/i) : false);

/**
 * @param {string} receiptType
 * @return {boolean}
 */
const isCustomer = (receiptType) => (receiptType ? !!receiptType.match(/^Customer/i) : false);

/**
 * Verifone sends the expiry date as MMYY but on their example receipts has it has MM/YY.
 * Change it to that format.
 *
 * @param {string} expiry
 * @return {string}
 */
const formatExpiryDate = (expiry) => {
    if (expiry.length === 4) {
        // Only insert the slash if it's in the expected format.
        return expiry.slice(0, 2) + '/' + expiry.slice(2);
    }

    // Otherwise leave it alone.
    return expiry;
};

const showSignatureLine = (data) => {
    if (data.ReceiptType === 'MerchantSignature') {
        return true;
    }
    return !!(data.CVM && data.CVM.match(/please sign/i));
};

const getDate = (data) => (data.TxnDateTime && data.TxnDateTime.length === 19
    ? data.TxnDateTime.substr(0, 10)
    : null);

const getTime = (data) => (data.TxnDateTime && data.TxnDateTime.length === 19
    ? data.TxnDateTime.substr(11)
    : null);

/**
 * Accepts an object of data and adds a bunch of extra properties to help with rendering it.
 *
 * @param {object} data
 * @return {{ isMerchant: boolean, isCustomer: boolean, formattedExpiryDate: string }}
 */
const prepData = (data) => {
    data.isMerchant = isMerchant(data.ReceiptType);
    data.isCustomer = isCustomer(data.ReceiptType);
    data.formattedExpiryDate = data.ExpiryDate ? formatExpiryDate(data.ExpiryDate) : '';
    data.showSignatureLine = showSignatureLine(data);

    // Split up the date and time. But only display these if they are both present.
    // Otherwise fall back to displaying the string as given.
    data.date = getDate(data);
    data.time = getTime(data);
    data.showSeparateDateTime = data.date && data.time;

    return data;
};

module.exports = {
    prepData
};
