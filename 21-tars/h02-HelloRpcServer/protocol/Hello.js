"use strict";

// 根据tars文件生成对应的包对象, 包对象属性接口对象, 而接口对象原型上实现了格式各样的方法
var assert = require("assert");
var TarsStream = require("@tars/stream");
var TarsError = require("@tars/rpc").error;

// Hello就是包对象, 注意Hello对象是挂载到了导出的对象的Hello属性上
// TODO 这里直接引用了一个为声明的变量Hello, 会报错的呀, 为什么这么写呢?
var Hello = Hello || {};
module.exports.Hello = Hello;

// 给Hello对象添加TestImp属性, TestImp是一个方法对象, 此方法对象的原型上实现了众多方法, 业务方法add()也是挂载在此属性的原型上
Hello.TestImp = function () {
    this._name = undefined;
    this._worker = undefined;
};

Hello.TestImp.prototype.initialize = function () { };
Hello.TestImp.prototype.onDispatch = function (current, funcName, binBuffer) {
    if ("__" + funcName in this) {
        return this["__" + funcName](current, binBuffer);
    } else {
        return TarsError.SERVER.FUNC_NOT_FOUND;
    }
};

var __Hello_Test$tars_ping$RE = function (_ret) {
    if (this.getRequestVersion() === TarsStream.Tup.TUP_SIMPLE || this.getRequestVersion() === TarsStream.Tup.TUP_COMPLEX) {
        var tup = new TarsStream.UniAttribute();
        tup.tupVersion = this.getRequestVersion();
        tup.writeInt32("", _ret);

        this.doResponse(tup.encode());
    } else {
        var os = new TarsStream.TarsOutputStream();
        os.writeInt32(0, _ret);

        this.doResponse(os.getBinBuffer());
    }
};

// TODO 这个方法是干什么用的? 转码用的吗?
Hello.TestImp.prototype.__tars_ping = function (current) {
    __Hello_Test$tars_ping$RE.call(current, 0);
    return TarsError.SUCCESS;
};

// 实现结构体定义的add方法
Hello.TestImp.prototype.add = function () {
    assert.fail("add function not implemented");
};

// TODO 这个方法是干什么用的?
var __Hello_Test$add$RE = function (_ret, c) {
    if (this.getRequestVersion() === TarsStream.Tup.TUP_SIMPLE || this.getRequestVersion() === TarsStream.Tup.TUP_COMPLEX) {
        var tup = new TarsStream.UniAttribute();
        tup.tupVersion = this.getRequestVersion();
        tup.writeInt32("", _ret);
        tup.writeInt32("c", c);
        this.doResponse(tup.encode());
    } else if (this.getRequestVersion() === TarsStream.Tup.JSON_VERSION) {
        var _data_ = {};
        _data_["tars_ret"] = _ret;
        _data_["c"] = c.toObject ? c.toObject() : c;
        this.doResponse(new TarsStream.BinBuffer(Buffer.from(JSON.stringify(_data_))));
    } else {
        var os = new TarsStream.TarsOutputStream();
        os.writeInt32(0, _ret);
        os.writeInt32(3, c);
        this.doResponse(os.getBinBuffer());
    }
};

// TODO 这个方法是干什么用的?
Hello.TestImp.prototype.__add = function (current, binBuffer) {
    var a = null;
    var b = null;
    var c = null;

    if (current.getRequestVersion() === TarsStream.Tup.TUP_SIMPLE || current.getRequestVersion() === TarsStream.Tup.TUP_COMPLEX) {
        var tup = new TarsStream.UniAttribute();
        tup.tupVersion = current.getRequestVersion();
        tup.decode(binBuffer);
        a = tup.readInt32("a");
        b = tup.readInt32("b");
        c = tup.readInt32("c", 0);
    } else if (current.getRequestVersion() === TarsStream.Tup.JSON_VERSION) {
        var _data_ = JSON.parse(binBuffer.toNodeBuffer());
        a = _data_.a;
        b = _data_.b;
        c = _data_.c || 0;
    } else {
        var is = new TarsStream.TarsInputStream(binBuffer);
        a = is.readInt32(1, true, 0);
        b = is.readInt32(2, true, 0);
        c = is.readInt32(3, false, 0);
    }

    current.sendResponse = __Hello_Test$add$RE;
    this.add(current, a, b, c);
    return TarsError.SUCCESS;
};
