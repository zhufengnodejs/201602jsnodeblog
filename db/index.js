var mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://123.57.143.189/201602jsblog');
//创建用户schema
var UserSchema = new mongoose.Schema({
   username:{type:String},   //用户名
   password:{type:String},   //密码
   email:{type:String},      //邮箱
   avatar:{type:String}      //头像
});

//定义一个用来操作数据库的模型
var UserModel = mongoose.model('user',UserSchema);

exports.User = UserModel;
//文章的文档结构定义
var ArticleSchema = new mongoose.Schema({
  title:{type:String},
  content:{type:String},
  user:{type:mongoose.Schema.Types.ObjectId,ref:'user'}, //类型是一个对象ID对象，引用模型是usr
  createAt:{type:Date,default:Date.now()}
})
//定义一个文章相关的模型
var ArticleModel = mongoose.model('article',ArticleSchema);

exports.Article = ArticleModel;