var express = require('express');
var Model = require('../db');
var middle = require('../middle');
var router = express.Router();

//发表博客
router.get('/add',middle.checkLogin, function(req, res, next) {
  res.render('article/add',{ title: '发表文章' });
});

router.post('/add',middle.checkLogin, function(req, res, next) {
  var article = req.body;
  //把session中的用户ID赋给文章的作者
  article.user = req.session.user._id;
  if((!article.title) || (!article.content) ){
    req.flash('error','标题或正文不能为空');
    req.flash('error','发表文章失败');
    return res.redirect('back');
  }
  //创建文章的entity也就是实体并保存到数据库中
  new Model.Article(article).save(function(err,doc){
    if(err){
      //传二个参数表示赋值，第一个参数是类型，第二个是信息
      //它们实际是保存在session中，所以一旦写入，可以在下次请求中得到
      req.flash('error','发表文章失败');
      res.redirect('back');
    }else{
      req.flash('success','发表文章成功');
      res.redirect('/');
    }
  });
});

module.exports = router;
