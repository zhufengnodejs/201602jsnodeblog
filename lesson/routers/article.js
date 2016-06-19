var express = require('express');
//生成一个路由的实例
var router = express.Router();
router.get('/articles/add',function(req,res){
    res.send('/articles/add');
});
// /articles/detail/xxxx
/**
 * query 查询字符串 ?后面的
 * body 请求体
 * session
 * cookie 通过请求头传过来的
 * url 路径参数
 */
router.get('/articles/detail/:_id',function(req,res){
    var _id = req.params._id;

});
module.exports = router;