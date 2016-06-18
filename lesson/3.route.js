var express = require('express');
var app = express();
var user = require('./routers/user');
var article = require('./routers/article');
/**
 * 对扩展开放，对修改关闭
 */
app.use(user);
app.use(article);
app.get('*',function(req,res){
    res.end('404');
});

app.listen(9090);