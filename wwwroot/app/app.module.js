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
// angular
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
// Eigene Komponenten
var app_component_1 = require("./app.component");
// Sonstiges
var Global_1 = require("./Global");
var data_service_1 = require("./Services/data.service");
var test_component_1 = require("./Pages/test.component");
var AppModule = (function () {
    function AppModule(http, server) {
        this.http = http;
        this.server = server;
        // Laden zuende
        clearInterval((loadingInterval));
        // Globals
        Global_1.Global.isDebug = $(".debuginfo").length > 0;
        Global_1.Global.server = server;
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            forms_1.FormsModule,
            router_1.RouterModule.forRoot([
                { path: "", component: test_component_1.TestComponent }
            ])
        ],
        providers: [
            data_service_1.DataService
        ],
        declarations: [
            app_component_1.AppComponent,
            test_component_1.TestComponent
        ],
        exports: [app_component_1.AppComponent],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [http_1.Http, data_service_1.DataService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map