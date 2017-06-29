import { Directive, Component, OnInit, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { AppComponent } from "../app.component";
import { Global } from "../Global";
import { User, List, Tag, ListComicRelation, TagListRelation, SearchResult, Issue, Volume, CheckData } from "../Entities/dbObjects";

@Component({
    selector :"sidebar",
    moduleId: module.id,
    templateUrl: "sidebar.component.html"
})

export class SidebarComponent implements OnInit {
    get Global() {
        return Global;
    }

    get NewItems() : CheckData[] {
        return Global.user.checkData.filter(cd => cd.hasNew);
    }

    constructor() {

    }

    ngOnInit(): void {
    }

    logout(): void {
        Global.deleteCookie("username");
        Global.deleteCookie("password");
        Global.user = null;

    }
}