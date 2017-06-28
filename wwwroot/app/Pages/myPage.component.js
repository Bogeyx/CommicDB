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
var MyPageComponent = (function () {
    function MyPageComponent() {
        var allTags = Global_1.Global.server.getAllTags();
    }
    Object.defineProperty(MyPageComponent.prototype, "Global", {
        get: function () {
            return Global_1.Global;
        },
        enumerable: true,
        configurable: true
    });
    MyPageComponent.prototype.ngOnInit = function () {
    };
    MyPageComponent.prototype.addTag = function (input) {
        var listName = input.value;
        var tagName = input.value;
        if (tagName && tagName.length > 2) {
            var tag = new dbObjects_1.Tag();
            tag.name = tagName;
            var list = new dbObjects_1.List();
            list.name = listName;
            Global_1.Global.server.addTagToList(dbObjects_1.TagListRelation).subscribe(function (result) {
                Global_1.Global.user.lists.push(result);
            });
        }
        else {
            alert("Name ungültig");
        }
    };
    MyPageComponent.prototype.addList = function (input) {
        var listName = input.value;
        if (listName && listName.length > 2) {
            if (Global_1.Global.user.lists.filter(function (l) { return l.name === listName; }).length == 0) {
                var list = new dbObjects_1.List();
                list.name = listName;
                list.userName = Global_1.Global.user.username;
                Global_1.Global.server.addOrUpdateList(list).subscribe(function (result) {
                    Global_1.Global.user.lists.push(result);
                    alert("Zur Liste hinzugefügt");
                });
            }
            else {
                alert("Name bereits vorhanden");
            }
        }
        else {
            alert("Name ungültig");
        }
    };
    MyPageComponent.prototype.delete = function (id) {
        Global_1.Global.server.removeList(id).subscribe(function (result) {
            var toDelete = Global_1.Global.user.lists.indexOf(Global_1.Global.user.lists.find(function (l) { return l.id === id; }));
            Global_1.Global.user.lists.splice(toDelete, 1);
        });
    };
    return MyPageComponent;
}());
MyPageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "myPage.component.html"
    }),
    __metadata("design:paramtypes", [])
], MyPageComponent);
exports.MyPageComponent = MyPageComponent;
//# sourceMappingURL=myPage.component.js.map