var express = require('express');
var router = express.Router();
const controller = require('./controller/controller')

router.get('/hierarchy', controller.getModels);
router.get('/drawings', controller.getDrawings);
router.get('/drawings/:number', controller.getDrawingByNumber);
router.get('/services', controller.getModels);

module.exports = router;