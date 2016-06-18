var express = require('express');
var router = express.Router();

//用户注册
router.get('/reg', function(req, res, next) {
  res.send('注册');
});

//用户登陆
router.get('/login', function(req, res, next) {
  res.send('登陆');
});

//用户退出
router.get('/logout', function(req, res, next) {
  res.send('退出');
});

module.exports = router;
