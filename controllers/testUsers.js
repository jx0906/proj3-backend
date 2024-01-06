// import model
const modelTestUsers = require('../models/testUsers');

module.exports = {
    testGetUser
};

async function testGetUser(req, res) {
        res.json({
          "hello World",
        });
      }