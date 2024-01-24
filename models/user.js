const daoUser = require("../daos/user");

module.exports = {
    createUser
};

//basic function to post new account data into database
async function createUser(body) {
    const user = await daoUser.findOne({"email": body.email})
    // temporary if condition
    if (user) {
        return {success: false, error: "user already exist"};
    }
    // if condition not met, backend will proceed to POST new user
    const newUser = await daoUser.create(body);
    return {success:true, data: newUser};
}