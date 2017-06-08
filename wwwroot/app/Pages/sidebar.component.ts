import { Directive, Component, OnInit, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { AppComponent } from "../app.component";
import { Global } from "../Global";
import { User, List, Comic, Tag, ListComicRelation, TagComicRelation, TagListRelation } from "../Entities/dbObjects";

@Component({
    selector: "sidebar",
    moduleId: module.id,
    templateUrl: "sidebar.component.html"
})

export class SidebarComponent implements OnInit {

    constructor() {
        
    }

    ngOnInit(): void {
    }
}