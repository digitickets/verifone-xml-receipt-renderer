/**
 * @param {string} receiptType
 * @return {boolean}
 */
const isMerchant = (receiptType) => !!receiptType.match(/^Merchant/i);

/**
 * @param {string} receiptType
 * @return {boolean}
 */
const isCustomer = (receiptType) => !!receiptType.match(/^Customer/i);

/**
 * Verifone sends the expiry date as MMYY but on their example receipts has it has MM/YY.
 * Change it to that format.
 *
 * @param {string} expiry
 * @return {string}
 */
const formatExpiryDate = (expiry) => expiry.slice(0, 2) + '/' + expiry.slice(2);

/**
 * Accepts an object of data and adds a bunch of extra properties to help with rendering it.
 *
 * @param {object} data
 * @return {object}
 */
const prepData = (data) => {
    data.isMerchant = isMerchant(data.ReceiptType);
    data.isCustomer = isCustomer(data.ReceiptType);
    data.formattedExpiryDate = data.ExpiryDate ? formatExpiryDate(data.ExpiryDate) : '';

    return data;
};

module.exports = {
    prepData
};
