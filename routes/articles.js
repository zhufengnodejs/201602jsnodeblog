var express = require('express');
var Model = require('../db');
var middle = require('../middle');
var markdown = require('markdown').markdown;
var router = express.Router();

//显示文章列表
router.get('/list',function(req, res, next) {
  // populate 用于把ID转成对象
  // article.user 5766020df6be175c04ee060a => {user:{_id,username}}
  Model.Article.find({}).populate('user').exec(function(err,articles){
    articles.forEach(function(article){
      article.content = markdown.toHTML(article.content);
    });
    res.render('article/list',{ title: '首页',articles:articles });
  });
});

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

// /articles/detail/xxxx
/**
 * query 查询字符串 ?后面的
 * body 请求体
 * session
 * cookie 通过请求头传过来的
 * url 路径参数
 */
router.get('/detail/:_id',function(req,res){
  var _id = req.params._id;
  Model.Article.findById(_id,function(err,doc){
    if(err){
      req.flash('error',err);
      res.redirect('back');
    }else{
      req.flash('success','查看文章成功');
      res.render('article/detail',{title:'文章详情',article:doc});
    }
  })
});

router.get('/delete/:_id',function(req,res){
  var _id = req.params._id;
  Model.Article.remove({_id:_id},function(err,result){
    if(err){
      req.flash('error','删除文章失败');
      res.redirect('back');
    }else{
      req.flash('success','删除文章成功');
      res.redirect('/articles/list');
    }
  });
});

module.exports = router;
