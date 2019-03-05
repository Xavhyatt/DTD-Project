const express = require('express');
const router = express.Router();
const report_controller = require('../controllers/report.controller');

router.post('/report/create', report_controller.report_create);

router.get('/report/getall', report_controller.report_getall);

router.delete('/report/delete/:report', report_controller.report_delete);

module.exports = router;