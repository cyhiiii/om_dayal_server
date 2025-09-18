export const genrateStudentID = async () => {
    const prefix = "OM";
    const middle = Math.floor(Math.random() * 900 + 100);
    const suffix = "SL";
    const end = Math.floor(Math.random() * 90 + 10);

    return `${prefix}${middle}${suffix}${end}`;
}

export const genrateLeadID = async () => {
    const prefix = "OM";
    const middle = Math.floor(Math.random() * 900 + 100);
    const suffix = "LD";
    const end = Math.floor(Math.random() * 90 + 10);

    return `${prefix}${middle}${suffix}${end}`;
}