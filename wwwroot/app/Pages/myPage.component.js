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
        this.filter = "";
    }
    Object.defineProperty(MyPageComponent.prototype, "Global", {
        get: function () {
            return Global_1.Global;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPageComponent.prototype, "FilteredLists", {
        get: function () {
            var _this = this;
            if (this.filter.length > 0) {
                return Global_1.Global.user.lists.filter(function (l) { return l.tags.find(function (t) { return t.tagName === _this.filter; }) !== undefined; });
            }
            else {
                return Global_1.Global.user.lists;
            }
        },
        enumerable: true,
        configurable: true
    });
    MyPageComponent.prototype.ngOnInit = function () {
    };
    MyPageComponent.prototype.missing = function (list) {
        return Global_1.Global.allTags != null ? Global_1.Global.allTags.filter(function (t) { return list.tags.every(function (tl) { return tl.tagName !== t.name; }); }) : null;
    };
    MyPageComponent.prototype.addTag = function (list, tagName) {
        if (tagName.length > 0) {
            var rel_1 = new dbObjects_1.TagListRelation();
            rel_1.listId = list.id;
            rel_1.tagName = tagName;
            Global_1.Global.server.addTagToList(rel_1).subscribe(function (result) {
                list.tags.push(rel_1);
            });
        }
    };
    MyPageComponent.prototype.deleteTag = function (list, tagName) {
        if (confirm("Wirklich löschen?")) {
            var rel = new dbObjects_1.TagListRelation();
            rel.listId = list.id;
            rel.tagName = tagName;
            Global_1.Global.server.removeTagFromList(rel).subscribe(function (result) {
                var toDelete = list.tags.indexOf(list.tags.find(function (t) { return t.tagName === tagName; }));
                list.tags.splice(toDelete, 1);
            });
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
        if (confirm("Wirklich löschen?")) {
            Global_1.Global.server.removeList(id).subscribe(function (result) {
                var toDelete = Global_1.Global.user.lists.indexOf(Global_1.Global.user.lists.find(function (l) { return l.id === id; }));
                Global_1.Global.user.lists.splice(toDelete, 1);
            });
        }
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