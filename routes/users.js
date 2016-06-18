var express = require('express');
var router = express.Router();

//用户注册
router.get('/reg', function(req, res, next) {
  //这是相对路径，是相对于views的相对路径
  res.render('user/reg');
});

//用户登陆
router.get('/login', function(req, res, next) {
  res.render('user/login');
});

//用户退出
router.get('/logout', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
