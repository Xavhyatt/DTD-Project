const express = require('express');
const router = express.Router();
const keyword_controller = require('../controllers/keyword.controller');

router.post('/create', keyword_controller.keyword_create);

router.get('/getall', keyword_controller.keyword_getall);

router.get('/getallkeys', keyword_controller.keyword_getallkeys);

router.delete('/delete/:keyword', keyword_controller.keyword_delete);

router.delete('/deleteByGroup/:group', keyword_controller.keyword_deleteByGroup);

module.exports = router;
