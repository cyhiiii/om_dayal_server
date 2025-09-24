export const genrateLeadID = async () => {
    const prefix = "OMD";
    const suffix = "LD";

    const randomTwoDigit = () => Math.floor(Math.random() * 90 + 10); // 10–99
    const randomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A–Z

    let letters;

    // Retry if the letters are "LD"
    do {
        letters = randomLetter() + randomLetter();
    } while (letters === "LD");

    const firstNumber = randomTwoDigit();
    const secondNumber = randomTwoDigit();

    return `${prefix}${firstNumber}${letters}${secondNumber}${suffix}`;
}