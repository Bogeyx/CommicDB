"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("rxjs/Rx");
var Global_1 = require("../Global");
var ServiceBase = (function () {
    function ServiceBase() {
    }
    // überprüft, ob die Nachricht im korrektem Format ist.
    // wenn Ja, dann Nutzer zeigen, sonst nur intern weiterbehandeln
    ServiceBase.prototype.handleServerError = function (error) {
        var errorHeader = "Error";
        if (error.message) {
            Global_1.Global.throwError(error.message);
        }
        else if (error.headers.has(errorHeader)) {
            Global_1.Global.throwError(error.headers.get(errorHeader));
        }
        else if (error.status == 0 && Global_1.Global.isDebug && Global_1.Global.sessionValid) {
            Global_1.Global.throwError("Verbindung verloren");
            Global_1.Global.sessionValid = false;
        }
        return Rx_1.Observable.throw(error);
    };
    // löst die Antwort vom Server auf
    ServiceBase.prototype.deserialize = function (data) {
        var text = data.text();
        if (text === "true" || text === "false") {
            return text === "true";
        }
        else if (text[0] === "{" || text[0] === "[") {
            return JSON.parse(text, this.reviveDateTime);
        }
        else {
            var number = parseInt(text);
            if (number.toString() === text) {
                return number;
            }
            else {
                return text;
            }
        }
    };
    // macht aus DateTime-Strings wieder ein Date-Objekt
    ServiceBase.prototype.reviveDateTime = function (key, value) {
        if (typeof value === "string" && value.length < 40 && value.length > 7) {
            var parsedTime = Date.parse(value);
            if (!isNaN(parsedTime)) {
                return new Date(parsedTime);
            }
        }
        return value;
    };
    return ServiceBase;
}());
exports.ServiceBase = ServiceBase;
//# sourceMappingURL=ServiceBase.js.map