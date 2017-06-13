﻿import { Directive, Component, OnInit, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { AppComponent } from "../app.component";
import { Global } from "../Global";
import { User, List, Comic, Tag, ListComicRelation, TagComicRelation, TagListRelation, SearchResult, Issue, Volume } from "../Entities/dbObjects";

@Component({
    moduleId: module.id,
    templateUrl: "home.component.html"
})

export class HomeComponent implements OnInit {

    constructor() {

    }

    ngOnInit(): void {
    }
}