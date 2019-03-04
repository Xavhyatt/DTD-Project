const express = require('express');
const router = express.Router();
const keyword_controller = require('../controllers/keyword.controller');

router.post('/create', keyword_controller.keyword_create);

router.get('/getall', keyword_controller.keyword_getall);

router.delete('/delete/:keyword', keyword_controller.keyword_delete);

module.exports = router;
