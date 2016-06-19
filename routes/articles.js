var express = require('express');
var Model = require('../db');
var middle = require('../middle');
var markdown = require('markdown').markdown;
var router = express.Router();

//显示文章列表
router.get('/list/:pageNum/:pageSize', function (req, res, next) {
    // populate 用于把ID转成对象
    // article.user 5766020df6be175c04ee060a => {user:{_id,username}}
    var keyword = req.query.keyword;//取得查询字符串对象的keyword值
    var query = {};
    //判断此文件的标题或内容中有关键词存在
    if (keyword) {
        var reg = new RegExp(keyword);//得到正则
        //标题和内容中只要有一个包含关键字正则就可以满足条件
        query['$or'] = [{title: reg}, {content: reg}];
    }
    /**
     *  总页数
     *     每页的条数
     *     当前页
     */
    var pageNum = isNaN(req.params.pageNum) ? 1 : parseInt(req.params.pageNum);
    var pageSize = isNaN(req.params.pageSize) ? 2 : parseInt(req.params.pageSize);
    Model.Article.count(query, function (err, count) {
        var totalPage = Math.ceil(count / pageSize);
        Model.Article.find(query).skip((pageNum - 1) * pageSize).limit(pageSize).populate('user').exec(function (err, articles) {
            articles.forEach(function (article) {
                article.content = markdown.toHTML(article.content);
            });
            res.render('article/list', {
                title: '首页',
                articles: articles,
                keyword: keyword,
                pageNum: pageNum,
                pageSize: pageSize,
                totalPage: totalPage
            });
        });
    })

});

//发表博客
router.get('/add', middle.checkLogin, function (req, res, next) {
    res.render('article/add', {title: '发表文章', article: {}});
});
//不管新增加还是修改，点击保存的时候都提交到此路由下面
router.post('/add', middle.checkLogin, function (req, res, next) {
    var article = req.body;
    console.log(article);
    if (article._id) {//如果提交过来的文章对象有ID的话则认为是修改
        Model.Article.update({_id: article._id},
            {$set: {title: article.title, content: article.content}}, function (err, result) {
                if (err) {
                    req.flash('error', '更新文章失败');
                    res.redirect('back');//跳回上一个页面继续编辑
                } else {
                    req.flash('success', '更新文章成功');
                    res.redirect('/articles/detail/' + article._id);//跳转到详情页看更新后的结果
                }
            }
        );
    } else {//否则认为是新增加
//把session中的用户ID赋给文章的作者
        article.user = req.session.user._id;
        if ((!article.title) || (!article.content)) {
            req.flash('error', '标题或正文不能为空');
            req.flash('error', '发表文章失败');
            return res.redirect('back');
        }
        //创建文章的entity也就是实体并保存到数据库中
        new Model.Article(article).save(function (err, doc) {
            if (err) {
                //传二个参数表示赋值，第一个参数是类型，第二个是信息
                //它们实际是保存在session中，所以一旦写入，可以在下次请求中得到
                req.flash('error', '发表文章失败');
                res.redirect('back');
            } else {
                req.flash('success', '发表文章成功');
                res.redirect('/');
            }
        });
    }

});

// /articles/detail/xxxx
/**
 * query 查询字符串 ?后面的
 * body 请求体
 * session
 * cookie 通过请求头传过来的
 * url 路径参数
 */
router.get('/detail/:_id', function (req, res) {
    var _id = req.params._id;
    // doc.comments[].user 默认是个字符串 现在要转成对象
    Model.Article.findOne({_id:_id}).populate('comments.user').exec(function (err, doc) {
        if (err) {
            req.flash('error', err);
            res.redirect('back');
        } else {
            req.flash('success', '查看文章成功');
            res.render('article/detail', {title: '文章详情', article: doc});
        }
    })
});

router.get('/delete/:_id', function (req, res) {
    var _id = req.params._id;
    Model.Article.remove({_id: _id}, function (err, result) {
        if (err) {
            req.flash('error', '删除文章失败');
            res.redirect('back');
        } else {
            req.flash('success', '删除文章成功');
            res.redirect('/articles/list');
        }
    });
});

router.get('/edit/:_id', function (req, res) {
    var _id = req.params._id;
    Model.Article.findById(_id, function (err, doc) {
        res.render('article/add', {title: '编辑文章', article: doc});
    })
})

router.post('/comment', function (req, res) {
    var comment = req.body;
    // 评论内容content 评论的文章ID _id 用户 user
    Model.Article.update({_id: comment._id},
        {$push: {comments: {content: comment.content, user: req.session.user._id}}}, function (err, result) {
            if (err) {
                req.flash('error', '评论失败');
                res.redirect('back');
            } else {
                req.flash('success', '评论成功');
                res.redirect('/articles/detail/' + comment._id);
            }
        });

});
module.exports = router;
