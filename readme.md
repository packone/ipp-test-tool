# IPP (Internet Printing Protocol) Test Tool

nodejs scripts used with ipp printers

## Installation

1. install nodejs
2. run `npm install` inside main folder

## Usage

- Get printer IPP attributes and save to file "printerAttributes/newPrinter.json"  
  `node actions/getAttributes.js --printerIppUri http://192.168.1.111:631/ipp/print`
- Get printer IPP attributes and save to specified file  
  `node actions/getAttributes.js --printerIppUri http://192.168.1.111:631/ipp/print --outputFile printerAttributes/PrinterXYZ.json`
- Get printer IPP attributes and save to specified file, additionally output if native pdf print is supported  
  (attribute "`document-format-supported`: `application/pdf`" exists, otherwise list supported document formats)  
  (important for sending pdf files via ipp without the need to first convert them on device to image files)  
  `node actions/getAttributes.js --printerIppUri http://192.168.1.111:631/ipp/print --outputFile printerAttributes/PrinterXYZ.json --checkNativePdfSupport`
- Test acctual the printing with generated test PDF file  
  `node actions/printTestPDF.js --printerIppUri http://192.168.1.111:631/ipp/print`
- Test acctual the printing with generated test PDF file with custom Text  
  `node actions/printTestPDF.js --printerIppUri http://192.168.1.111:631/ipp/print --testPdfText "This is a PDF"`
- Test acctual the printing with custom test file  
  `node actions/printTestFile.js --printerIppUri http://192.168.1.111:631/ipp/print --testFile "../demoFiles/TestWeiss.jpg"`
