"use strict";
var cookie_1 = require("./Entities/cookie");
var Global = (function () {
    function Global() {
    }
    // wirft eine sichtbare Fehlermeldung
    Global.throwError = function (error) {
        alert(error);
    };
    // klont ein Objekt
    Global.clone = function (obj) {
        var copy;
        if (null == obj || "object" !== typeof obj) {
            return obj;
        }
        // date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        // array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = Global.clone(obj[i]);
            }
            return copy;
        }
        // object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = Global.clone(obj[attr]);
                }
            }
            return copy;
        }
        throw new Error("Library.clone fehlgeschlagen");
    };
    Global.setCookie = function (name, value, expires) {
        if (expires === void 0) { expires = 365; }
        cookie_1.Cookie.set(name, value, expires, "/");
    };
    Global.getCookie = function (name) {
        return cookie_1.Cookie.get(name);
    };
    Global.deleteCookie = function (name) {
        return cookie_1.Cookie.delete(name, "/");
    };
    return Global;
}());
exports.Global = Global;
//# sourceMappingURL=Global.js.map