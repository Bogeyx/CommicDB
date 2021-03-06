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
var SidebarComponent = (function () {
    function SidebarComponent() {
    }
    Object.defineProperty(SidebarComponent.prototype, "Global", {
        get: function () {
            return Global_1.Global;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidebarComponent.prototype, "NewItems", {
        get: function () {
            return Global_1.Global.user.checkData.filter(function (cd) { return cd.hasNew; });
        },
        enumerable: true,
        configurable: true
    });
    SidebarComponent.prototype.ngOnInit = function () {
    };
    SidebarComponent.prototype.logout = function () {
        Global_1.Global.deleteCookie("username");
        Global_1.Global.deleteCookie("password");
        Global_1.Global.user = null;
    };
    return SidebarComponent;
}());
SidebarComponent = __decorate([
    core_1.Component({
        selector: "sidebar",
        moduleId: module.id,
        templateUrl: "sidebar.component.html"
    }),
    __metadata("design:paramtypes", [])
], SidebarComponent);
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map