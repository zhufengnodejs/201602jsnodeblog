var debug = require('./debug');
//实例化一个debug并指定名称
var debugA = debug('loggerA');
debugA('log a');//向控制台输出日志
var debugB = debug('loggerB');
debugB('log b');

