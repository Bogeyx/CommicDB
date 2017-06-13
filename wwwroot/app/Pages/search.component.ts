import { Directive, Component, OnInit, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { AppComponent } from "../app.component";
import { Global } from "../Global";
import { User, List, Comic, Tag, ListComicRelation, TagComicRelation, TagListRelation, SearchResult, Issue, Volume } from "../Entities/dbObjects";

@Component({
    moduleId: module.id,
    templateUrl: "search.component.html"
})

export class SearchComponent implements OnInit {
    public searchText: string;
    public searchResult: SearchResult;
    public loading: boolean;

    constructor() {

    }

    ngOnInit(): void {
    }

    onInput(event: KeyboardEvent) {
        if (event.key === "Enter") {
            this.loading = true;
            Global.server.apiSearch(this.searchText).subscribe(result => {
                this.searchResult = result;
                this.loading = false;
            });
        } else {
            this.searchText = (event.target as HTMLInputElement).value;
        }        
    }
}