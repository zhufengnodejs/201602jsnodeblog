var express = require('express');
var Model = require('../db');
var router = express.Router();

//发表博客
router.get('/add', function(req, res, next) {
  res.render('article/add',{ title: '发表文章' });
});

router.post('/add', function(req, res, next) {
  var article = req.body;
  //把session中的用户ID赋给文章的作者
  article.user = req.session.user._id;
  //创建文章的entity也就是实体并保存到数据库中
  new Model.Article(article).save(function(err,doc){
    if(err){
      res.redirect('back');
    }else{
      res.redirect('/');
    }
  });
});

module.exports = router;
