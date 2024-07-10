function checkPasswordStrength(password: string): string {
    if (password.length < 8) {
        return "Weak";
    } else if (password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/\d/g) && password.match(/[^a-zA-Z0-9]/g)) {
        return "Strong";
    } else {
        return "Moderate";
    }
}

console.log(checkPasswordStrength("Password1@"));