# Verifone XML Receipt Renderer

Verifone integrated payment terminals send a record that look like this:

```
100,0,170,Printing Merchant Receipt,XML=<?xml version="1.0" encoding="utf-8"?><VoucherDetails>    <TrainingMode>false</TrainingMode>    <ReceiptType>MerchantDeclined</ReceiptType>    <Header>DigiTickets&#10;,&#10;</Header>    <PTID>34310515</PTID>    <TID>35489763</TID>     <MID>21242792</MID>    <MkTransactionID>9794056</MkTransactionID>    <TxnDateTime>2020-02-04 17:02:38</TxnDateTime>    <CardScheme>MasterCard</CardScheme>    <PAN>541333******0045</PAN>    <TxnType>Sale</TxnType>     <CaptureMethod>ICC</CaptureMethod>    <CustomerPresent>1</CustomerPresent>    <ECommerce>false</ECommerce>    <ContAuth>false</ContAuth>    <AccountOnFile>false</AccountOnFile>    <PinEntered>1</PinEntered>    <CreditDebitMessage>Please debit my account</CreditDebitMessage>    <CurrencySymbol>Â£</CurrencySymbol>    <CurrencyAbbreviation>GBP</CurrencyAbbreviation>    <Amount>0.01</Amount>    <Cashback>0</Cashback>    <Total>0.01</Total>    <CVM>DECLINED</CVM>    <KeepText1>Please keep receipt</KeepText1>    <KeepText2>for your records</KeepText2>    <EFTSN>5221</EFTSN>    <AuthCode></AuthCode>    <Reference>10360158083489772903</Reference>    <AID>A0000000041010</AID>    <AC>1122334455667788</AC>    <AppEff>0104</AppEff>    <AppSeq>03</AppSeq>    <AppExp>12/25</AppExp>    <CardHolder>MTIP08-2 MCD 13A</CardHolder>    <CardAVN>0002</CardAVN>    <Footer>,</Footer>    <GratuityBoxRequired>false</GratuityBoxRequired>    <ExtendedReceipt>false</ExtendedReceipt>    <DisableCurrencySymbol>false</DisableCurrencySymbol>    <AuthOnly>false</AuthOnly>    <CardSchemePrintText></CardSchemePrintText>    <PrintAttempts>1</PrintAttempts>    <ContactlessMSD>false</ContactlessMSD>    <TokenID></TokenID>    <TokenRegistrationResult>Registration not performed</TokenRegistrationResult>    <TokenRegistrationOnly>false</TokenRegistrationOnly>    <ARC>00</ARC>    <ExpiryDate>1225</ExpiryDate>    <Duplicate>false</Duplicate>    <Gratuity>0</Gratuity>    <OfflineSpendAmount></OfflineSpendAmount>    <CryptoTxnType>00</CryptoTxnType>    <CID>00</CID>    <CVMR>410302</CVMR>    <TSI>E800</TSI>    <TVR>0200008000</TVR>    <IACDef>FC50A00000</IACDef>    <IACDen>0000000000</IACDen>    <IACOnl>F870A49800</IACOnl>    <AIP>5800</AIP>    <TACDen>0000000000</TACDen>    <TACDef>FE50B8A000</TACDef>    <TACOnl>FE50B8F800</TACOnl>    <TDOL>9F02065F2A029A039C0195059F3704</TDOL>    <DDOL>9F3704</DDOL>    <MCC>5999</MCC>    <CAPK>F1</CAPK>    <IAD>0210600000000000DAC000000000000000FF</IAD>    <ATC>0001</ATC>    <UN>B47AFF97</UN>    <TCtry>0826</TCtry>    <AmtO>000000000000</AmtO>    <TransactionCurrencyCode>0826</TransactionCurrencyCode>    <CharitableDonation></CharitableDonation>    <CharitableDonationReceiptText></CharitableDonationReceiptText></VoucherDetails>
```

It's up to us to take that XML and produce a card receipt from it. This package does just that.

## Install

    npm i @digitickets/verifone-xml-receipt-renderer --save
    
## Use

```javascript
const xmlReceiptRenderer = require('@digitickets/verifone-xml-receipt-renderer');
const xml = '<?xml version="1.0" encoding="utf-8"?><VoucherDetails><ReceiptType>MerchantDeclined</ReceiptType><Amount>12.34</Amount></VoucherDetails'; // Lots omitted.
xmlReceiptRenderer.renderXml(xml)
    .then((html) => {
        // Do what you've gotta do to print it.
        console.log('html', html);    
    });
```

## Examples
In the `examples/input` directory are all the XML examples taken from the integration guide "Ocius Payment Application Solution Integration Specification v2.5 - 11th September 2019.pdf".

Checkout this repository, `npm install` then run:
    
    npm run create-examples
    
to convert these examples into HTML. They will be placed in the `examples/output` directory.
 
![](https://i.imgur.com/tQz8A7u.png)

The receipts look like this:

![](https://i.imgur.com/6mlAch7.png)

## Disclaimer

⚠️ We provide no guarantee whatsoever that this will pass Verifone's accreditation or be compliant with banking regulations. Consider this a learning resource and not a trusted implantation you can rely on! ⚠️
