"use strict";

var TarsStream = require("@tars/stream");
var TarsError  = require("@tars/rpc").error;

var _makeError = function (data, message, type) {
    var error = new Error(message || "");
    error.request = data.request;
    error.response = {
        "costtime" : data.request.costtime
    };
    if (type === TarsError.CLIENT.DECODE_ERROR) {
        error.name = "DECODE_ERROR";
        error.response.error = {
            "code" : type,
            "message" : message
        };
    } else {
        error.name = "RPC_ERROR";
        error.response.error = data.error;
    }
    return error;
};

var Hello = Hello || {};

Hello.TestProxy = function () {
    this._name    = undefined;
    this._worker  = undefined;
};

Hello.TestProxy.prototype.setTimeout = function (iTimeout) {
    this._worker.timeout = iTimeout;
};

Hello.TestProxy.prototype.getTimeout = function () {
    return this._worker.timeout;
};

Hello.TestProxy.prototype.setVersion = function (iVersion) {
    this._worker.version = iVersion;
};

Hello.TestProxy.prototype.getVersion = function () {
    return this._worker.version;
};

var __Hello_Test$add$IF = {
    "name" : "add",
    "return" : "int32",
    "arguments" : [{
        "name" : "a",
        "class" : "int32",
        "direction" : "in"
    }, {
        "name" : "b",
        "class" : "int32",
        "direction" : "in"
    }, {
        "name" : "c",
        "class" : "int32",
        "direction" : "out"
    }]
};

var __Hello_Test$add$IE = function (a, b) {
    var os = new TarsStream.TarsOutputStream();
    os.writeInt32(1, a);
    os.writeInt32(2, b);
    return os.getBinBuffer();
};

var __Hello_Test$add$ID = function (data) {
    try {
        var is = new TarsStream.TarsInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "c" : is.readInt32(3, true, 0)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TarsError.CLIENT.DECODE_ERROR);
    }
};

var __Hello_Test$add$PE = function (a, b, __$PROTOCOL$VERSION) {
    var tup = new TarsStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeInt32("a", a);
    tup.writeInt32("b", b);
    return tup;
};

var __Hello_Test$add$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "c" : tup.readInt32("c")
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TarsError.CLIENT.DECODE_ERROR);
    }
};

var __Hello_Test$add$ER = function (data) {
    throw _makeError(data, "Call Test::add failed");
};

Hello.TestProxy.prototype.add = function (a, b) {
    var version = this._worker.version;
    if (version === TarsStream.Tup.TUP_SIMPLE || version === TarsStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("add", __Hello_Test$add$PE(a, b, version), arguments[arguments.length - 1], __Hello_Test$add$IF).then(__Hello_Test$add$PD, __Hello_Test$add$ER);
    } else {
        return this._worker.tars_invoke("add", __Hello_Test$add$IE(a, b), arguments[arguments.length - 1], __Hello_Test$add$IF).then(__Hello_Test$add$ID, __Hello_Test$add$ER);
    }
};
Hello.TestProxy.add = __Hello_Test$add$IF;

module.exports.Hello = Hello;