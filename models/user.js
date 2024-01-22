const daoUser = require("../daos/user");

module.exports = {
    createUser
};

//basic function to post new account data into database
function createUser(body) {
    return daoUser.create(body);
}