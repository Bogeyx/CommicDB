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
var TestComponent = (function () {
    function TestComponent() {
        var _this = this;
        Global_1.Global.server.exampleGet().subscribe(function (result) {
            _this.getTest = result + " funktioniert";
        });
        Global_1.Global.server.examplePost().subscribe(function (result) {
            _this.postTest = result + " funktioniert";
        });
        Global_1.Global.server.getAllTags().subscribe(function (result) {
            _this.tags = result;
        });
        Global_1.Global.server.getUserByName("TestUser").subscribe(function (result) {
            console.log(result);
        });
        Global_1.Global.server.getComicById(1).subscribe(function (comic) {
            console.log(comic);
        });
    }
    TestComponent.prototype.ngOnInit = function () {
    };
    return TestComponent;
}());
TestComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "test.component.html"
    }),
    __metadata("design:paramtypes", [])
], TestComponent);
exports.TestComponent = TestComponent;
//# sourceMappingURL=test.component.js.map