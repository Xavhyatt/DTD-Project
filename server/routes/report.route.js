const express = require('express');
const router = express.Router();
const report_controller = require('../controllers/report.controller');

router.post('/create', report_controller.report_create);

router.get('/get/:id', report_controller.report_getById);

router.get('/getall', report_controller.report_getall);

router.delete('/delete/:report', report_controller.report_delete);

module.exports = router;