"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var http_1 = require("@angular/http");
var ServiceBase_1 = require("./ServiceBase");
var DataService = (function (_super) {
    __extends(DataService, _super);
    function DataService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    // fügt eine Position hinzu
    DataService.prototype.examplePost = function () {
        return this.http.post("/data/ExamplePost", "")
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    // ruft alle Namen der vorhandenen Übersetzungsdateien ab
    DataService.prototype.exampleGet = function () {
        return this.http.get("/data/ExampleGet")
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    // get
    DataService.prototype.getAllTags = function () {
        return this.http.get("/data/GetAllTags")
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    DataService.prototype.getUserByName = function (username) {
        return this.http.get("/data/GetUserByName?username=" + username)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    DataService.prototype.getListWithDataById = function (id) {
        return this.http.get("/data/GetListWithDataById?id=" + id)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    DataService.prototype.getComicById = function (id) {
        return this.http.get("/data/GetComicById?id=" + id)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    // addOrUpdate
    DataService.prototype.addOrUpdateList = function (list) {
        return this.http.post("/data/AddOrUpdateList", list)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    DataService.prototype.addOrUpdateComic = function (comic) {
        return this.http.post("/data/AddOrUpdateComic", comic)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    DataService.prototype.addOrUpdateUser = function (user) {
        return this.http.post("/data/AddOrUpdateUser", user)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    DataService.prototype.addTagToList = function (rel) {
        return this.http.post("/data/AddTagToList", rel)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    DataService.prototype.addTagToComic = function (rel) {
        return this.http.post("/data/AddTagToComic", rel)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    // remove
    DataService.prototype.removeList = function (id) {
        return this.http.get("/data/RemoveList?id=" + id)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    DataService.prototype.removeComic = function (id) {
        return this.http.get("/data/RemoveComic?id=" + id)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    DataService.prototype.removeUser = function (userName) {
        return this.http.get("/data/RemoveUser?name=", userName)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    DataService.prototype.removeTagFromList = function (rel) {
        return this.http.post("/data/RemoveTagFromList", rel)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    DataService.prototype.removeTagFromComic = function (rel) {
        return this.http.post("/data/RemoveTagFromComic", rel)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    return DataService;
}(ServiceBase_1.ServiceBase));
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map