const templateStr = "<style type=\"text/css\">\n.verifone-receipt,\n.verifone-receipt * {\n    margin: 0;\n    padding: 0;\n    text-align: left;\n    font-family: \"Lucida Console\", Monaco, monospace;\n    font-weight: normal;\n    font-size: 12px;\n    word-break: break-all;\n}\n\n.verifone-receipt {\n    width: 100%;\n}\n\n.verifone-receipt strong {\n    font-weight: bolder;\n}\n\n.verifone-receipt hr {\n    margin: 1mm 0;\n    border-style: dashed;\n}\n\n.verifone-receipt h3 {\n    text-align: center;\n}\n\n.verifone-receipt p:after {\n    content: \"\";\n    clear: both;\n    display: table;\n}\n\n.verifone-receipt p.center {\n    text-align: center;\n}\n\n.verifone-receipt p.right {\n    text-align: right;\n}\n\n.verifone-receipt p span {\n    float: left;\n}\n\n.verifone-receipt .signature-box {\n    height: 10mm;\n}\n</style>\n\n<div class=\"verifone-receipt\">\n    {{#isMerchant}}\n        <h3>*** MERCHANT COPY ***</h3>\n    {{/isMerchant}}\n\n    {{#isCustomer}}\n        <h3>*** CARDHOLDER COPY ***</h3>\n    {{/isCustomer}}\n\n    {{#Duplicate}}\n        <h3>*** DUPLICATE COPY ***</h3>\n    {{/Duplicate}}\n\n    {{#Header}}\n        <h3>{{Header}}</h3>\n    {{/Header}}\n\n    <hr />\n\n    {{#CardScheme}}\n        <p>{{CardScheme}}</p>\n    {{/CardScheme}}\n\n    {{#PAN}}\n        <p>{{PAN}}</p>\n    {{/PAN}}\n\n    {{#isMerchant}}\n        {{#formattedStartDate}}\n            <p class=\"right\">\n                <span>Start:</span>\n                {{formattedStartDate}}\n            </p>\n        {{/formattedStartDate}}\n        {{#formattedExpiryDate}}\n            <p class=\"right\">\n                <span>Expiry:</span>\n                {{formattedExpiryDate}}\n            </p>\n        {{/formattedExpiryDate}}\n    {{/isMerchant}}\n\n    {{#IssueNo}}\n        <p class=\"right\">\n            <span>Issue No:</span>\n            {{IssueNo}}\n        </p>\n    {{/IssueNo}}\n\n    {{#TxnType}}\n        <p>{{TxnType}}</p>\n    {{/TxnType}}\n\n    {{#CaptureMethod}}\n        <p>{{CaptureMethod}}</p>\n    {{/CaptureMethod}}\n\n    {{#CreditDebitMessage}}\n        <p class=\"center\">{{CreditDebitMessage}}</p>\n    {{/CreditDebitMessage}}\n\n    {{#Amount}}\n        <p class=\"right\">\n            <span>Amount:</span>\n            {{CurrencySymbol}}{{Amount}}\n        </p>\n    {{/Amount}}\n\n    {{#showGratutiy}}\n        <p class=\"right\">\n            <span>Gratuity:</span>\n            {{CurrencySymbol}}{{Gratuity}}\n        </p>\n    {{/Gratuity}}\n\n    {{#showCashback}}\n        <p class=\"right\">\n            <span>Cashback:</span>\n            {{CurrencySymbol}}{{Cashback}}\n        </p>\n    {{/Cashback}}\n\n    {{#Total}}\n        <p class=\"right\">\n            <span><strong>TOTAL:</strong></span>\n            <strong>{{CurrencySymbol}}{{Total}}</strong>\n        </p>\n    {{/Total}}\n\n    {{#CVM}}\n        <p class=\"center\"><strong>{{CVM}}</strong></p>\n    {{/CVM}}\n\n    {{#showSignatureLine}}\n        <div class=\"signature-box\"></div>\n        <hr />\n    {{/showSignatureLine}}\n\n    {{#KeepText1}}\n        <p class=\"center\">{{KeepText1}}</p>\n    {{/KeepText1}}\n\n    {{#KeepText2}}\n        <p class=\"center\">{{KeepText2}}</p>\n    {{/KeepText2}}\n\n    {{#PTID}}\n        <p class=\"right\">\n            <span>PTID:</span>\n            {{PTID}}\n        </p>\n    {{/PTID}}\n\n    {{#MID}}\n        <p class=\"right\">\n            <span>MID:</span>\n            {{MID}}\n        </p>\n    {{/MID}}\n\n    {{#TID}}\n        <p class=\"right\">\n            <span>TID:</span>\n            {{TID}}\n        </p>\n    {{/TID}}\n\n    {{#showSeparateDateTime}}\n        <p class=\"right\">\n            <span>Date:</span>\n            {{date}}\n        </p>\n        <p class=\"right\">\n            <span>Time:</span>\n            {{time}}\n        </p>\n    {{/showSeparateDateTime}}\n    {{^showSeparateDateTime}}\n        {{#TxnDateTime}}\n            <p class=\"right\">\n                <span>Date:</span>\n                {{TxnDateTime}}\n            </p>\n        {{/TxnDateTime}}\n    {{/showSeparateDateTime}}\n\n\n    {{#EFTSN}}\n        <p class=\"right\">\n            <span>EFTSN:</span>\n            {{EFTSN}}\n        </p>\n    {{/EFTSN}}\n\n    <hr />\n\n    {{#TokenRegistrationResult}}\n        <p class=\"right\">\n            <span>Token:</span>\n            {{TokenRegistrationResult}}\n        </p>\n\n        {{#TokenID}}\n            <p class=\"right\">\n                <span>Token ID:</span>\n                {{TokenID}}\n            </p>\n        {{/TokenID}}\n\n        <hr />\n    {{/TokenRegistrationResult}}\n\n    {{#AuthCode}}\n        <p class=\"right\">\n            <span>Authcode:</span>\n            {{AuthCode}}\n        </p>\n    {{/AuthCode}}\n\n    {{#Reference}}\n        <p class=\"right\">\n            <span>Ref:</span>\n            {{Reference}}\n        </p>\n    {{/Reference}}\n\n    {{#AID}}\n        <p class=\"right\">\n            <span>AID:</span>\n            {{AID}}\n        </p>\n    {{/AID}}\n\n    {{#AppEff}}\n        <p class=\"right\">\n            <span>App Eff:</span>\n            {{AppEff}}\n        </p>\n    {{/AppEff}}\n\n    {{#AppSeq}}\n        <p class=\"right\">\n            <span>App Seq:</span>\n            {{AppSeq}}\n        </p>\n    {{/AppSeq}}\n\n    <hr />\n\n    {{#isExtended}}\n        <p class=\"right\">\n            <span>AppExp:</span>\n            {{AppExp}}\n        </p>\n        <p class=\"right\">\n            <span>TxnType:</span>\n            {{TxnType}}\n        </p>\n        <p class=\"right\">\n            <span>Amount:</span>\n            {{Amount}}\n        </p>\n        <p class=\"right\">\n            <span>TransactionCurrencyCode:</span>\n            {{TransactionCurrencyCode}}\n        </p>\n        <p class=\"right\">\n            <span>CID:</span>\n            {{CID}}\n        </p>\n        <p class=\"right\">\n            <span>CardHolder:</span>\n            {{CardHolder}}\n        </p>\n        <p class=\"right\">\n            <span>CVMR:</span>\n            {{CVMR}}\n        </p>\n        <p class=\"right\">\n            <span>TSI:</span>\n            {{TSI}}\n        </p>\n        <p class=\"right\">\n            <span>TVR:</span>\n            {{TVR}}\n        </p>\n        <p class=\"right\">\n            <span>TxnDateTime:</span>\n            {{TxnDateTime}}\n        </p>\n        <p class=\"right\">\n            <span>IACDef:</span>\n            {{IACDef}}\n        </p>\n        <p class=\"right\">\n            <span>IACDen:</span>\n            {{IACDen}}\n        </p>\n        <p class=\"right\">\n            <span>IACOnl:</span>\n            {{IACOnl}}\n        </p>\n        <p class=\"right\">\n            <span>AC:</span>\n            {{AC}}\n        </p>\n        <p class=\"right\">\n            <span>AIP:</span>\n            {{AIP}}\n        </p>\n        <p class=\"right\">\n            <span>TACDef:</span>\n            {{TACDef}}\n        </p>\n        <p class=\"right\">\n            <span>TACDen:</span>\n            {{TACDen}}\n        </p>\n        <p class=\"right\">\n            <span>TACOnl:</span>\n            {{TACOnl}}\n        </p>\n        <p class=\"right\">\n            <span>TDOL:</span>\n            {{TDOL}}\n        </p>\n        <p class=\"right\">\n            <span>DDOL:</span>\n            {{DDOL}}\n        </p>\n        <p class=\"right\">\n            <span>MCC:</span>\n            {{MCC}}\n        </p>\n        <p class=\"right\">\n            <span>CAPK:</span>\n            {{CAPK}}\n        </p>\n        <p class=\"right\">\n            <span>IAD:</span>\n            {{IAD}}\n        </p>\n        <p class=\"right\">\n            <span>ATC:</span>\n            {{ATC}}\n        </p>\n        <p class=\"right\">\n            <span>UN:</span>\n            {{UN}}\n        </p>\n        <p class=\"right\">\n            <span>TCtry:</span>\n            {{TCtry}}\n        </p>\n        <p class=\"right\">\n            <span>AmtO:</span>\n            {{AmtO}}\n        </p>\n        <p class=\"right\">\n            <span>CRNCY:</span>\n            {{CRNCY}}\n        </p>\n\n        <hr />\n    {{/isExtended}}\n\n    {{#Footer}}\n        <h3>{{Footer}}</h3>\n    {{/Footer}}\n</div>\n";
module.exports = templateStr;
