// angular
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Http, HttpModule, JsonpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

// Eigene Komponenten
import { AppComponent } from "./app.component";

// Sonstiges
import { Global } from "./Global";
import { DataService } from "./Services/data.service";
import { TestComponent } from "./Pages/test.component";

declare var loadingInterval: any;

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: "", component: TestComponent }
        ])
    ],

    providers: [
        DataService
    ],

    declarations: [
        AppComponent,
        TestComponent
    ],
    exports: [AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(private http: Http, private server: DataService) {
        // Laden zuende
        clearInterval((loadingInterval));
        if (performance) {
            performance.clearResourceTimings();
        }

        // Globals
        Global.isDebug = $(".debuginfo").length > 0;
        Global.server = server;
    }
}