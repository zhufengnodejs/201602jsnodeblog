var async = require('async');
console.time('cost');
async.parallel([
    function(cb){
        setTimeout(function(){
            cb(null,1);
        },5000)
    },
    function(cb){
        setTimeout(function(){
            cb(null,2);
        },3000)
    }
],function(err,result){
   console.log(result);
    console.timeEnd('cost');
})