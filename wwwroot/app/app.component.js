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
var Global_1 = require("./Global");
var dbObjects_1 = require("./Entities/dbObjects");
var AppComponent = (function () {
    function AppComponent() {
        var user = new dbObjects_1.User();
        user.username = "TestUser";
        user.password = "none";
        Global_1.Global.server.loginUser(user).subscribe(function (result) {
            Global_1.Global.user = result;
        });
    }
    Object.defineProperty(AppComponent.prototype, "Global", {
        get: function () {
            return Global_1.Global;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.ngOnInit = function () {
        $('#body-special').css("min-height", window.innerHeight - $('.header').height());
        window.onresize = function () {
            $('#body-special').css("min-height", window.innerHeight - $('.header').height());
        };
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "my-app",
        templateUrl: "app.component.html",
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map