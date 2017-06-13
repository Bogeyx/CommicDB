import { Directive, Component, OnInit, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { AppComponent } from "../app.component";
import { Global } from "../Global";
import { User, List, Tag, ListComicRelation, TagListRelation, SearchResult, Issue, Volume } from "../Entities/dbObjects";

@Component({
    moduleId: module.id,
    templateUrl: "search.component.html"
})

export class SearchComponent implements OnInit {
    public searchText: string;
    public searchResult: SearchResult;
    public loading: boolean;

    get Global() {
        return Global;
    }

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

    addToList(id: number) {
        let listId = $('select#' + id).val();
        let list = Global.user.lists.find(l => l.id == listId);

        if (list.comics.filter(c => c.comicId == id).length !== 0) {
            alert("Comic bereits hinzugefügt");
            return;
        } else {
            let rel = <ListComicRelation>{ listId: listId, comicId: id };
            Global.server.addComicToList(rel).subscribe(result => {
                if (result) {
                    rel.list = list;
                    list.comics.push(rel);
                    alert("Comic zur Liste hinzugefügt");
                } else {
                    alert("Comic hinzufügen fehlgeschlagen");
                }
            });
        }
    }
}