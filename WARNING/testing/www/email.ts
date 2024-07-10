function generateRandomEmail(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    const tlds = ['com', 'net', 'org', 'edu', 'gov'];

    const randomString = (length: number): string => {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const localPart = randomString(24);
    return `${localPart}@gmail.com`;
}

console.log(generateRandomEmail());
