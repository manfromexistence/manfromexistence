// Import the xml2js library
import * as xml2js from 'xml2js';

// Create an instance of the xml2js parser
const parser = new xml2js.Parser();
const builder = new xml2js.Builder();
let XML_STRING:any;
let XML_XML:any;

// Your XML data
const xmlData: string = `
<root>
  <element>Text content</element>
</root>
`;

// Convert XML to string
parser.parseString(xmlData, (err: any, result: any) => {
  if (err) {
    console.error(err);
  } else {
    XML_XML = builder.buildObject(result);
    XML_STRING = JSON.stringify(result);
  }
});

console.log(XML_XML);
console.log(XML_STRING);





