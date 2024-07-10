import { parse } from 'papaparse';

let csvData = `Student Username,Password
st11,1@
st22,Password2@
st33,Password3@
`
function checkPasswordStrength(password: string): string {
    if (password.length < 8) {
        return "Weak";
    } else if (password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/\d/g) && password.match(/[^a-zA-Z0-9]/g)) {
        return "Strong";
    } else {
        return "Moderate";
    }
}

const parsedData = parse(csvData, {
    header: true, // Treat the first row as header
    delimiter: ',', // Adjust if needed (e.g., '\t' for tabs)
    skipEmptyLines: true, // Ignore empty lines
});

if (parsedData.errors.length > 0) {
    console.error("Error parsing CSV:", parsedData.errors);
}

parsedData.data.forEach(async (row: any) => {
    const username = row.hasOwnProperty('Student Username') ? row['Student Username'] : '';
    const password = row.hasOwnProperty('Password') ? row['Password'] : '';
    const strength = checkPasswordStrength(password);
    const PASSWORD_VERIFICATION = strength === "Strong";

    if (PASSWORD_VERIFICATION) {
        console.log(`Created: ${username} === ${password}`);
    } else {
        console.log(`Dismissed: ${username} === ${password}`);
    }
});
