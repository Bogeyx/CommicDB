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
var Global_1 = require("../Global");
var DataService = (function (_super) {
    __extends(DataService, _super);
    function DataService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    // get
    DataService.prototype.getAllTags = function () {
        return this.http.get("/data/GetAllTags")
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    DataService.prototype.loginUser = function (user) {
        return this.http.post("/data/LoginUser", user)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    DataService.prototype.getListWithDataById = function (id) {
        return this.http.get("/data/GetListWithDataById?id=" + id)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    // addOrUpdate
    DataService.prototype.addOrUpdateList = function (list) {
        return this.http.post("/data/AddOrUpdateList", list)
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
    DataService.prototype.addComicToList = function (rel) {
        return this.http.post("/data/AddComicToList", rel)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    DataService.prototype.addCheckData = function (data) {
        return this.http.post("/data/AddCheckData", data)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    // remove
    DataService.prototype.removeList = function (id) {
        return this.http.get("/data/RemoveList?id=" + id)
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
    DataService.prototype.removeComicFromList = function (rel) {
        var copy = Global_1.Global.clone(rel);
        return this.http.post("/data/RemoveComicFromList", copy)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    DataService.prototype.removeCheckData = function (rel) {
        return this.http.post("/data/RemoveCheckData", rel)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    // API
    DataService.prototype.apiSearch = function (text) {
        return this.http.get("/data/Search?text=" + text)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    DataService.prototype.apiGetIssue = function (id) {
        return this.http.get("/data/GetIssue?id=" + id)
            .map(this.deserialize)
            .catch(this.handleServerError);
    };
    DataService.prototype.apiGetVolume = function (id) {
        return this.http.get("/data/GetVolume?id=" + id)
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