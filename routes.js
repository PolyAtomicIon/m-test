var express = require('express');
var router = express.Router();
const controller = require('./controller')

router.get('/hierarchy', controller.getModels);
router.get('/drawings', controller.getDrawings);
router.get('/drawings/:id', controller.getDrawingById);
router.get('/services', controller.getServices);

module.exports = router;