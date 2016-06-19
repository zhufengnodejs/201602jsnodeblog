var express = require('express');
var router = express.Router();

//首页
router.get('/', function(req, res, next) {
  res.redirect('/articles/list');
});

module.exports = router;
