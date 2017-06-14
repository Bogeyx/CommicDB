import { Directive, Component, OnInit, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { AppComponent } from "../app.component";
import { Global } from "../Global";
import { User, List, Tag, ListComicRelation, TagListRelation, SearchResult, Issue, Volume } from "../Entities/dbObjects";

@Component({
    moduleId: module.id,
    templateUrl: "home.component.html"
})

export class HomeComponent implements OnInit {
    get Global() {
        return Global;
    }
    

    constructor() {

    }

    ngOnInit(): void {
    }
}