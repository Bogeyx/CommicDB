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
<<<<<<< HEAD
=======
import { MyPageComponent } from "./Pages/myPage.component";
import { SearchComponent } from "./Pages/search.component";
import { HomeComponent } from "./Pages/home.component";
import { ProfileComponent } from "./Pages/profile.component";
import { ListInfoComponent } from "./Pages/listInfo.component";
>>>>>>> 76bd1727d97524cce5c775cbac90a2dc4f74d6e7
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
        TestComponent,
<<<<<<< HEAD
=======
        MyPageComponent,
        SearchComponent,
        HomeComponent,
        ProfileComponent,
ListInfoComponent,
>>>>>>> 76bd1727d97524cce5c775cbac90a2dc4f74d6e7
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