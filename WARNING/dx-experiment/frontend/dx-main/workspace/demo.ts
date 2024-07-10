// import fs from 'fs';
// import camelCase from 'camelcase';

// function toCamelCase(text: string): string {
//     return camelCase(text);
// }

// const text = 'Custom Color 1';
// console.log(toCamelCase(text));

// const data = fs.readFileSync('./theme.json', 'utf8');

// const jsonData = JSON.parse(data);

// console.log('Description:', jsonData.description);
// console.log('Seed:', jsonData.seed);
// console.log('Core Colors:', jsonData.coreColors);
// console.log('Extended Colors:', jsonData.extendedColors);
// console.log('Schemes:', jsonData.schemes);
// console.log('Palettes:', jsonData.palettes);
// import fs from 'fs';
// import path from 'path';

// function createFiles(numFiles: number, content: string) {
//     for (let i = 1; i <= numFiles; i++) {
//         const fileName = `text_${i}.txt`;
//         fs.writeFileSync(path.join(__dirname, fileName), content);
//         console.log(`File ${fileName} created with content: ${content}`);
//     }
// }

// createFiles(5, 'This is the content of the file');
import fs from 'fs';
import path from 'path';

// Get the file path from the command line arguments
const filePath = process.argv[2];

if (!filePath) {
    console.log('Please provide a file path as a command line argument.');
    process.exit(1);
}

// Check if the file exists
if (!fs.existsSync(filePath)) {
    console.log(`The file ${filePath} does not exist.`);
    process.exit(1);
}

// Read the file
const fileContent = fs.readFileSync(filePath, 'utf8');

// Get the file size
const stats = fs.statSync(filePath);
const fileSizeInBytes = stats.size;

// Log the information
console.log(`File Path: ${filePath}`);
console.log(`File Size: ${fileSizeInBytes} bytes`);
console.log(`File Content: ${fileContent}`);
console.log(`Content Length: ${fileContent.length}`);
