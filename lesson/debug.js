/**
 *
 **/

module.exports = function(name){
   return function(msg){
        var DEBUG = process.env.DEBUG;
        if(DEBUG == name){
            var start = Date.now();
            console.log(name,msg,'+'+(Date.now()-start)+'ms');
        }
   }
}