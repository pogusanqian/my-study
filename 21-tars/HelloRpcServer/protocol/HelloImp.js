"use strict";
// 实现包对象中接口属性的原型方法add, 因为Hello.js中有太多的框架代码
// 这里单独领出来了一个HelloImp文件用来专门实现逻辑方法, 相当用是Java中的重写
var Hello = require("./Hello.js").Hello;

// TODO 初始化方法作用场景是什么?
Hello.TestImp.prototype.initialize = function () {
};

Hello.TestImp.prototype.add = function (current, a, b, c) {
    c = a + b;
    // TODO 为什么这里返回的第一个参数是0
    current.sendResponse(0, c);
};

module.exports.Hello = Hello;
