//检查必须登陆，登陆后才能继续，没登陆不能继续
//退出 发表文章
exports.checkLogin = function(req,res,next){
  if(req.session.user){
      next();
  }else{
      res.redirect('/users/login')
  }
}
//检查必须未登陆，未登陆后才能继续，如果已经登陆则不能继续
// 注册 登陆
exports.checkNotLogin = function(req,res,next){
    if(req.session.user){
       res.redirect('/');
    }else{
        next();
    }
}