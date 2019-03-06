const express = require('express');
const routerG = express.Router();
const group_controller = require('../controllers/group.controller');

routerG.post('/create', group_controller.group_create);

routerG.get('/getall', group_controller.group_getall);

routerG.delete('/delete/:group', group_controller.group_delete);

module.exports = routerG;