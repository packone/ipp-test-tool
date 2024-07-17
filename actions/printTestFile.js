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
  testFile: {
    type: "string",
    default: "../demoFiles/TestWeiss.jpg",
  },
};
const { values } = parseArgs({ options });

fs.readFile(values.testFile, function (err, data) {
  if (err) return console.log(err);

  const printer = ipp.Printer(values.printerIppUri);

  const fileExt = getFileNameExtension(arrFileExtDocumentFormats.testFile);
  const arrFileExtDocumentFormats = [
    { fExt: "jpg", docF: "image/jpeg" },
    { fExt: "pdf", docF: "application/pdf" },
  ];
  const documentFormat = arrFileExtDocumentFormats.find(
    (s) => s.fExt === fileExt
  )?.docF;
  if (documentFormat === undefined) throw new Error("document-format unknown");

  const msg = {
    "operation-attributes-tag": {
      "requesting-user-name": "Max Mustermann",
      "job-name": "My Test Job",
      "document-format": documentFormat,
    },
    "job-attributes-tag": {
      media: "iso_a4_210x297mm",
      // "print-color-mode": "color"
      "print-color-mode": "monochrome",
      // "print-scaling": "fill", //doesn't work
    },
    data: data,
  };
  printer.execute("Print-Job", msg, function (_err, res) {
    console.log(res);
  });
});

/** see https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript/12900504#12900504 */
function getFileNameExtension(fname) {
  return fname.slice(((fname.lastIndexOf(".") - 1) >>> 0) + 2);
}
