"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Global_1 = require("../Global");
var dbObjects_1 = require("../Entities/dbObjects");
var HomeComponent = (function () {
    function HomeComponent() {
        this.tmpUser = new dbObjects_1.User();
        this.showLogin = true;
        var username = Global_1.Global.getCookie("username");
        var password = Global_1.Global.getCookie("password");
        if (username && password) {
            this.tmpUser.username = username;
            this.tmpUser.password = password;
            this.login();
        }
    }
    Object.defineProperty(HomeComponent.prototype, "Global", {
        get: function () {
            return Global_1.Global;
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.login = function () {
        Global_1.Global.server.loginUser(this.tmpUser).subscribe(function (result) {
            if (result) {
                Global_1.Global.user = result;
                Global_1.Global.setCookie("username", result.username);
                Global_1.Global.setCookie("password", result.password);
            }
            else {
                alert("Einloggen konnte nicht durchgeführt werden");
            }
        });
    };
    HomeComponent.prototype.register = function () {
        var _this = this;
        Global_1.Global.server.addOrUpdateUser(this.tmpUser).subscribe(function (result) {
            if (result) {
                _this.login();
            }
            else {
                alert("Registrierung konnte nicht durchgeführt werden");
            }
        });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "home.component.html"
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map