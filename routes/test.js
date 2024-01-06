var express = require('express');

// import controllers
var controllerTestUsers = require('../controllers/testUsers')

// import routers
var router = express.Router();

/* base path: /test */ 

router.get('/', controllerTestUsers.testGetUser); 

module.exports = router;