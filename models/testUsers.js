// import daos
const daoTestUser = require('../daos/testUsers');

module.exports = {
    testGetUser,
};

async function testGetUser(query) {
    return daoTestUser.find(query);
}