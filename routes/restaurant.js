var express = require('express');
var router = express.Router();

// import controllers
var controllerTestUsers = require('../controllers/testUsers')

/* base path: /test */ 
/* GET restaurant listing. 
input: -
output: restaurant info */

router.get('/', controllerTestUsers.testGetUser); 
