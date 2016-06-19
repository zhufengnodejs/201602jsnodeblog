// req.flash('success','成功1');
// req.flash('success','成功2');

// req.flash('success'); ['成功1','成功2']
module.exports = function(){
    return function(req,res,next){
        req.flash = function(type,value){
            if(value){//如果传value赋值
                //判断此消息类型有没有值
                if(req.session[type]){
                    req.session[type].push(value);
                }else{
                    req.session[type] = [value];
                }
            }else{//如果没有传表示取值
                var result = req.session[type]||[];
                req.session[type] = [];
                return result;
            }
        }
        next();
    }
}