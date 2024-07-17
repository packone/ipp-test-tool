var ipp = require("ipp");
var fs = require("fs");
const { parseArgs } = require("node:util");

/*
 * script arguments
 */
const options = {
  printerIppUri: {
    type: "string",
    default: "http://192.168.1.111:631/ipp/print",
  },
  outputFile: {
    type: "string",
    default: "printerAttributes/newPrinter.json",
    short: "o",
  },
  checkNativePdfSupport: {
    type: "boolean",
  },
};
const { values } = parseArgs({ options });

/*
 * create request
 *
 * Sometimes has to be `"attributes-natural-language": "en-us"`
 * or different Charset...
 */
const data = ipp.serialize({
  operation: "Get-Printer-Attributes",
  "operation-attributes-tag": {
    "attributes-charset": "utf-8",
    "attributes-natural-language": "en",
    "printer-uri": values.printerIppUri,
  },
});

/*
 * process response
 */
ipp.request(values.printerIppUri, data, function (err, res) {
  if (err) return console.log(err);

  fs.writeFile(values.outputFile, JSON.stringify(res, null, 2), function (err) {
    if (err) return console.log(err);
    console.log("\nnew Printer Attributes written!\n");

    if (values.checkNativePdfSupport) {
      const arrSupportedDocumentFormats =
        res["printer-attributes-tag"]["document-format-supported"];
      const appPDF = "application/pdf";
      if (arrSupportedDocumentFormats.includes(appPDF))
        console.log(`Printer supports "${appPDF}" for native pdf print!`);
      else
        console.log(
          `Printer does not support native pdf print, only the following: \n\n${arrSupportedDocumentFormats.join(
            ", \n"
          )}\n`
        );
    }
  });
});
