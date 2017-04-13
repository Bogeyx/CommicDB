import { Directive, Component, OnInit, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { RouterModule, Router } from "@angular/router";

import { Global } from "./Global";

@Component({
    moduleId: module.id,
    selector: "my-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements OnInit {
    get Global() {
        return Global;
    }

    constructor() {
    }

    ngOnInit(): void {
    }
}