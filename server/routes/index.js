let express = require('express');
let router = express.Router();
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  // API routes
  fs.readdirSync(__dirname + '/api/').forEach((file) => {
    require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
  });
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// module.exports = router;
