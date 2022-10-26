// Dependencies
const bcrypt = require('bcrypt');

const hashString = async (str) => {
    const hashedString = await bcrypt.hash(str, 10);

    return hashedString;
}

// Module Export
module.exports = hashString;