var ipp = require("ipp");
var PDFDocument = require("pdfkit");
const { parseArgs } = require("node:util");

/*
 * script arguments
 */
const options = {
  printerIppUri: {
    type: "string",
    default: "http://192.168.1.111:631/ipp/print",
  },
  testPdfText: {
    type: "string",
    default: "PDF",
  },
};
const { values } = parseArgs({ options });

/*
 * create a PDF document
 */
var doc = new PDFDocument({ margin: 0 });
doc.text(values.testPdfText, 200, 780);

var buffers = [];
doc.on("data", buffers.push.bind(buffers));
doc.on("end", function () {
  const printer = ipp.Printer(values.printerIppUri);

  const msg = {
    "operation-attributes-tag": {
      "requesting-user-name": "Max Mustermann",
      "job-name": "My Test Job",
      "document-format": "application/pdf",
    },
    data: Buffer.concat(buffers),
  };

  printer.execute("Print-Job", msg, function (_err, res) {
    console.log(res);
  });
});
doc.end();
