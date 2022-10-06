var express = require('express');
var router = express.Router();
const controller = require('./controller')

router.get('/', controller.menu);
router.get('/hierarchy', controller.getTree);
router.get('/drawings', controller.getDrawings);
router.get('/drawings/:id', controller.getDrawingById);
router.get('/services', controller.getServices);

module.exports = router;