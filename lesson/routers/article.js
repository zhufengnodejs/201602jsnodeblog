var express = require('express');
//生成一个路由的实例
var router = express.Router();
router.get('/articles/add',function(req,res){
    res.send('/articles/add');
});

router.get('/articles/delete',function(req,res){
    res.send('/articles/delete');
});
module.exports = router;