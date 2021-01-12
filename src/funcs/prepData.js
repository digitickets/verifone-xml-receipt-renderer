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
    if (expiry && expiry.match(/^\d{4}$/)) {
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

const splitDateTimeString = (str) => {
    let date = null;
    let time = null;

    // DD-MM-YYYY or DD/MM/YYYY HH:MM:SS
    if (str && str.match(/^\d{2}[/-]\d{2}[/-]\d{4} \d{2}:\d{2}:\d{2}$/)) {
        date = str.substr(0, 10);
        time = str.substr(11);
    }

    // YYYY-MM-DD HH:MM:SS
    if (str && str.match(/^\d{4}[/-]\d{2}[/-]\d{2} \d{2}:\d{2}:\d{2}$/)) {
        date = str.substr(0, 10);
        time = str.substr(11);
    }

    return { date, time };
};

/**
 * Accepts an object of data and adds a bunch of extra properties to help with rendering it.
 *
 * @param {object} data
 * @return {{ isMerchant: boolean, isCustomer: boolean, formattedExpiryDate: string, isExtended: boolean }}
 */
const prepData = (data) => {
    data.isMerchant = isMerchant(data.ReceiptType);
    data.isCustomer = isCustomer(data.ReceiptType);
    data.formattedStartDate = data.StartDate ? formatExpiryDate(data.StartDate) : null;
    data.formattedExpiryDate = data.ExpiryDate ? formatExpiryDate(data.ExpiryDate) : null;
    data.showSignatureLine = showSignatureLine(data);

    data.showGratutiy = parseFloat(data.Gratuity) > 0;
    data.showCashback = parseFloat(data.Cashback) > 0;

    // Split up the date and time. But only display these if they are both present.
    // Otherwise fall back to displaying the string as given.
    const { date, time } = splitDateTimeString(data.TxnDateTime);
    data.date = date;
    data.time = time;
    data.showSeparateDateTime = !!(data.date && data.time);

    // Print extended receipt if either the XML tells us to, or it was enabled in XmlRenderer.
    data.isExtended = data.ExtendedReceipt;

    return data;
};

module.exports = {
    prepData
};
