var express = require('express');
//生成一个路由的实例
var router = express.Router();

router.get('/users/reg',function(req,res){
    res.send('/users/reg');
});

router.get('/users/login',function(req,res){
    res.send('/users/login');
});
module.exports = router;