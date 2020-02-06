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
 * Accepts an object of data and adds a bunch of extra properties to help with rendering it.
 *
 * @param {object} data
 *
 * @return {object}
 */
const prepData = (data) => {
    data.isMerchant = isMerchant(data.ReceiptType);
    data.isCustomer = isCustomer(data.ReceiptType);

    return data;
};

module.exports = {
    prepData
};
