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
import { MyPageComponent } from "./Pages/myPage.component";
import { SearchComponent } from "./Pages/search.component";
import { HomeComponent } from "./Pages/home.component";
import { ProfileComponent } from "./Pages/profile.component";
import { ListInfoComponent } from "./Pages/listInfo.component";
import { SidebarComponent } from "./Pages/sidebar.component";

declare var loadingInterval: any;

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: "", component: HomeComponent },
            { path: "home", component: HomeComponent },
            { path: "my", component: MyPageComponent },
            { path: "search", component: SearchComponent },
            { path: "profile", component: ProfileComponent },
            { path: "listInfo/:listId", component: ListInfoComponent }
        ])
    ],

    providers: [
        DataService
    ],

    declarations: [
        AppComponent,
        MyPageComponent,
        SearchComponent,
        HomeComponent,
        ProfileComponent,
        ListInfoComponent,
        SidebarComponent
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