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
var router_1 = require("@angular/router");
var Global_1 = require("../Global");
var dbObjects_1 = require("../Entities/dbObjects");
var ListInfoComponent = (function () {
    function ListInfoComponent(route) {
        this.route = route;
        this.issues = [];
    }
    ListInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['listId']) {
                var id_1 = +params['listId'];
                _this.list = Global_1.Global.user.lists.find(function (l) { return l.id == id_1; });
                _this.list.comics.forEach(function (c) {
                    Global_1.Global.server.apiGetIssue(c.comicId).subscribe(function (result) {
                        _this.issues.push(result);
                    });
                });
            }
        });
    };
    ListInfoComponent.prototype.missing = function (list) {
        return Global_1.Global.allTags != null ? Global_1.Global.allTags.filter(function (t) { return list.tags.every(function (tl) { return tl.tagName !== t.name; }); }) : null;
    };
    ListInfoComponent.prototype.addTag = function (list, tagName) {
        if (tagName.length > 0) {
            var rel_1 = new dbObjects_1.TagListRelation();
            rel_1.listId = list.id;
            rel_1.tagName = tagName;
            Global_1.Global.server.addTagToList(rel_1).subscribe(function (result) {
                list.tags.push(rel_1);
            });
        }
    };
    ListInfoComponent.prototype.deleteTag = function (list, tagName) {
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
    ListInfoComponent.prototype.delete = function (issueId) {
        var _this = this;
        if (confirm("Wirklich löschen?")) {
            Global_1.Global.server.removeComicFromList(this.list.comics.find(function (c) { return c.comicId == issueId; })).subscribe(function (result) {
                if (!result) {
                    alert("Eintrag konnte nicht gelöscht werden");
                }
                else {
                    var toDelete = _this.list.comics.indexOf(_this.list.comics.find(function (c) { return c.comicId === issueId; }));
                    _this.list.comics.splice(toDelete, 1);
                    var toDeleteIssue = _this.issues.indexOf(_this.issues.find(function (i) { return i.id == issueId; }));
                    _this.issues.splice(toDeleteIssue, 1);
                }
            });
        }
    };
    return ListInfoComponent;
}());
ListInfoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "listInfo.component.html"
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute])
], ListInfoComponent);
exports.ListInfoComponent = ListInfoComponent;
//# sourceMappingURL=listInfo.component.js.map