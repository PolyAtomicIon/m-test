var express = require('express');
var router = express.Router();
const controller = require('../controller/Hierarchy')

router.get('/', controller.getModels);

module.exports = router;