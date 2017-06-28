<<<<<<< HEAD
import { Directive, Component, OnInit, Inject } from "@angular/core";
=======
﻿import { Directive, Component, OnInit, Inject } from "@angular/core";
>>>>>>> 76bd1727d97524cce5c775cbac90a2dc4f74d6e7
import { Http } from "@angular/http";

import { AppComponent } from "../app.component";
import { Global } from "../Global";
<<<<<<< HEAD
import { User, List, Comic, Tag, ListComicRelation, TagComicRelation, TagListRelation } from "../Entities/dbObjects";

@Component({
    selector: "sidebar",
=======
import { User, List, Tag, ListComicRelation, TagListRelation, SearchResult, Issue, Volume } from "../Entities/dbObjects";

@Component({
    selector :"sidebar",
>>>>>>> 76bd1727d97524cce5c775cbac90a2dc4f74d6e7
    moduleId: module.id,
    templateUrl: "sidebar.component.html"
})

export class SidebarComponent implements OnInit {
<<<<<<< HEAD

    constructor() {
        
=======
    get Global() {
        return Global;
    }

    constructor() {

>>>>>>> 76bd1727d97524cce5c775cbac90a2dc4f74d6e7
    }

    ngOnInit(): void {
    }
<<<<<<< HEAD
=======

    logout(): void {
        Global.user = null;

    }
>>>>>>> 76bd1727d97524cce5c775cbac90a2dc4f74d6e7
}