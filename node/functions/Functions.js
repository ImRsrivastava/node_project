const bcrypt = require('bcrypt');


async function bcryptPassword (password)
{
    const saltRound = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, saltRound);
    return hashPassword;
}


async function bcryptPasswordCompare (password, dbPassword)
{
    const compareStatus = await bcrypt.compare(password, dbPassword);
    return compareStatus;
}










module.exports = {
    bcryptPassword,
    bcryptPasswordCompare
}