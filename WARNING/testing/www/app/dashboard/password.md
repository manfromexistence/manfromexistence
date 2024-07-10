import { parse } from 'papaparse'; // Install papaparse for CSV parsing

// Function to check password strength (replace with your preferred library)
function checkPasswordStrength(password: string): string {
    if (password.length < 8) {
        return "Weak";
    } else if (password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/\d/g) && password.match(/[^a-zA-Z0-9]/g)) {
        return "Strong";
    } else {
        return "Moderate";
    }
}

function processCsvPasswords(csvData: string) {
    const parsedData = parse(csvData, {
        header: true, // Treat the first row as header
        delimiter: ',', // Adjust if needed (e.g., '\t' for tabs)
        skipEmptyLines: true, // Ignore empty lines
    });

    if (parsedData.errors.length > 0) {
        console.error("Error parsing CSV:", parsedData.errors);
        return; // Exit if parsing errors occur
    }

    parsedData.data.forEach((row: any) => {
        const username = row.hasOwnProperty('Student Username') ? row['Student Username'] : '';
        const password = row.hasOwnProperty('Password') ? row['Password'] : '';

        if (username && password) { // Check if username and password are not empty
            const strength = checkPasswordStrength(password);
            console.log(`Username: ${username}, Password Strength: ${strength}`);
        }
    });
}

// Sample CSV data
const csvData = `Student Username,Password
fsf,Sumon123@!
upstd2,A@2asdF2020!!*
upstd3,A@2asdF2020!!*
`;

processCsvPasswords(csvData);




















// import { passwordStrength } from 'check-password-strength'

// let csvData: any = `Student Username,Password
// upstd1,A@2asdF2020!!*
// upstd2,A@2asdF2020!!*
// upstd3,A@2asdF2020!!*


// `
// const lines: any = csvData.split('\n');
// lines.shift(); // Remove the header line

// lines.forEach(async (line: { split: (arg0: string) => [any, any] }, index: any) => {
//     const [username, password] = line.split(',');

//     const PASSWORD_VERIFICATION = passwordStrength(password).value === "Strong";
//     console.log(passwordStrength(password).value);
// });






























// import { parse } from 'papaparse'; // Install papaparse for CSV parsing

// // Function to check password strength (replace with your preferred library)
// function checkPasswordStrength(password: string): string {
//   // Replace this with your preferred password strength checking logic
//   // You can use a library like zxcvbn or implement your own rules
//   if (password.length < 8) {
//     return "Weak";
//   } else if (password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/\d/g) && password.match(/[^a-zA-Z0-9]/g)) {
//     return "Strong";
//   } else {
//     return "Moderate";
//   }
// }

// function processCsvPasswords(csvData: string) {
//   const parsedData = parse(csvData, { header: true }); // Parse CSV with header row

//   if (parsedData.errors.length > 0) {
//     console.error("Error parsing CSV:", parsedData.errors);
//     return;
//   }

//   parsedData.data.forEach((row) => {
//     const username = row.hasOwnProperty('Student Username') ? row['Student Username'] : '';
//     const password = row.hasOwnProperty('Password') ? row['Password'] : '';

//     if (username && password) { // Check if username and password are not empty
//       const strength = checkPasswordStrength(password);
//       console.log(`Username: ${username}, Password Strength: ${strength}`);
//     }
//   });
// }

// // Sample CSV data
// const csvData = `Student Username,Password
// upstd1,A@2asdF2020!!*
// upstd2,A@2asdF2020!!*
// upstd3,A@2asdF2020!!*


// `;

// processCsvPasswords(csvData);




























// in this code I am reading all the lines of csv file and checking the passwords streanth. But in a csv file there can be some useless empty lines so please change this lines for loop only work when there is a work in this case username and after , comma there is the password and there is no word in the line please donot consider the line. Here is the code ```import { passwordStrength } from 'check-password-strength'
// let csvData: any = `Student Username,Password

// upstd1,A@2asdF2020!!*

// upstd2,A@2asdF2020!!*

// upstd3,A@2asdF2020!!*





// `
// const lines: any = csvData.split('\n');
// lines.shift(); // Remove the header line
// lines.forEach(async (line: { split: (arg0: string) => [any, any] }, index: any) => {
//     const [username, password] = line.split(',');
//     const PASSWORD_VERIFICATION = passwordStrength(password).value === "Strong";
//     console.log(passwordStrength(password).value);
// });
// ```