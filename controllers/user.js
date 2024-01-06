// import model
const modelTestUsers = require('../models/testUsers');

module.exports = {
    testGetUser
};

async function testGetUser(req, res) {
        res.json({
          test: await modelTestUsers.testGetUser(req.query),
        });
      }