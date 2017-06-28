import { Directive, Component, OnInit, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { AppComponent } from "../app.component";
import { Global } from "../Global";
import { User, List, Tag, ListComicRelation, TagListRelation, SearchResult, Issue, Volume } from "../Entities/dbObjects";

@Component({
    selector :"sidebar",
    moduleId: module.id,
    templateUrl: "sidebar.component.html"
})

export class SidebarComponent implements OnInit {
    get Global() {
        return Global;
    }

    constructor() {

    }

    ngOnInit(): void {
    }

    logout(): void {
        Global.user = null;

    }
}