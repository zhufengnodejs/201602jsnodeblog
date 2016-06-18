var express = require('express');
var router = express.Router();

//发表博客
router.get('/add', function(req, res, next) {
  res.render('article/add');
});

module.exports = router;
