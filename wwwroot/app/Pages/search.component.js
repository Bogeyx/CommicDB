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
var SearchComponent = (function () {
    function SearchComponent() {
    }
    Object.defineProperty(SearchComponent.prototype, "Global", {
        get: function () {
            return Global_1.Global;
        },
        enumerable: true,
        configurable: true
    });
    SearchComponent.prototype.ngOnInit = function () {
    };
    SearchComponent.prototype.onInput = function (event) {
        var _this = this;
        if (event.key === "Enter") {
            this.loading = true;
            Global_1.Global.server.apiSearch(this.searchText).subscribe(function (result) {
                _this.searchResult = result;
                _this.loading = false;
            });
        }
        else {
            this.searchText = event.target.value;
        }
    };
    SearchComponent.prototype.addToList = function (id) {
        var listId = $('select#' + id).val();
        var list = Global_1.Global.user.lists.find(function (l) { return l.id == listId; });
        if (list.comics.filter(function (c) { return c.comicId == id; }).length !== 0) {
            alert("Comic bereits hinzugefügt");
            return;
        }
        else {
            var rel_1 = { listId: listId, comicId: id };
            Global_1.Global.server.addComicToList(rel_1).subscribe(function (result) {
                if (result) {
                    rel_1.list = list;
                    list.comics.push(rel_1);
                    alert("Comic zur Liste hinzugefügt");
                }
                else {
                    alert("Comic hinzufügen fehlgeschlagen");
                }
            });
        }
    };
    return SearchComponent;
}());
SearchComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "search.component.html"
    }),
    __metadata("design:paramtypes", [])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map