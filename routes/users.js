var express = require('express');
var router = express.Router();
var Model = require('../db');
//用户注册
router.get('/reg', function(req, res, next) {
  //这是相对路径，是相对于views的相对路径
  res.render('user/reg', { title: '注册' });
});
//注册 得到请求体中的对象并保存到数据库
router.post('/reg', function(req, res, next) {
   var user = req.body;//得到请求体
   new Model.User(user).save(function(err,doc){
     if(err){
        console.error(err);
        res.redirect('back');//回到上一个页面
     }else{
         console.log(doc);
       res.redirect('/');
     }
   });
});

//用户登陆
router.get('/login', function(req, res, next) {
  res.render('user/login', { title: '登录' });
});

//用户退出
router.get('/logout', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
