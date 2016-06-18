var express = require('express');
var path = require('path');
//处理收藏夹图标
var favicon = require('serve-favicon');
//访问日志记录器
var logger = require('morgan');
//处理cookie 会在request添加 cookies对象 {}
var cookieParser = require('cookie-parser');
//处理请求体 json urlencoded
var bodyParser = require('body-parser');
//路由
var routes = require('./routes/index');
//路由
var users = require('./routes/users');
//文章路由
var articles = require('./routes/articles');
//调用express方法生成的应用实例
var app = express();

//设置模板引擎和模板和存放目录
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//当你把收藏夹图标放在public目录之下的时候就就可以取消注释
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//是否使用默认的querystring来将字符串转成json
app.use(cookieParser());// req.cookies
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/articles', articles);

// catch 404 and forward to error handler
// 捕获404错误并且转向错误处理中单件
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);//有参数则意味着出错了，跳过正常的中间件，直接 交给错误中间件
});

// error handlers 错误处理

// development error handler 开发错误处理
// will print stacktrace 将打印堆栈信息
if (app.get('env') === 'development') {
 // console.log(app.get('env') );
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler 生产环境错误处理
// no stacktraces leaked to user 不向用户暴露堆栈信息
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
