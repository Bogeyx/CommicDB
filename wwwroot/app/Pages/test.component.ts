import { Directive, Component, OnInit, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { AppComponent } from "../app.component";
import { Global } from "../Global";
import { User, List, Tag, ListComicRelation, TagListRelation, SearchResult, Issue, Volume } from "../Entities/dbObjects";

@Component({
    moduleId: module.id,
    templateUrl: "test.component.html"
})

export class TestComponent implements OnInit {
    public getTest: string;
    public postTest: string
    public tags: Tag[];
    public searchResult: SearchResult;

    constructor() {
        Global.server.exampleGet().subscribe(result => {
            this.getTest = result + " funktioniert";
        });

        Global.server.examplePost().subscribe(result => {
            this.postTest = result + " funktioniert";
        });

        Global.server.getAllTags().subscribe(result => {
            this.tags = result;
        });
    }

    ngOnInit(): void {
    }

    onClick(e : MouseEvent) {
    }
}