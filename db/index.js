var mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost/201602jsblog');
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
