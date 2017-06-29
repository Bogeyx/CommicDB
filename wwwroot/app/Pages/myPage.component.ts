import { Directive, Component, OnInit, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { AppComponent } from "../app.component";
import { Global } from "../Global";
import { User, List, Tag, ListComicRelation, TagListRelation, SearchResult, Issue, Volume } from "../Entities/dbObjects";

@Component({
    moduleId: module.id,
    templateUrl: "myPage.component.html"
})

export class MyPageComponent implements OnInit {
    public filter: string = "";

    get Global() {
        return Global;
    }

    get FilteredLists() {
        if (this.filter.length > 0) {
            return Global.user.lists.filter(l => l.tags.find(t => t.tagName === this.filter) !== undefined);
        } else {
            return Global.user.lists;
        }
    }


    constructor() {
    }

    ngOnInit(): void {
    }

    missing(list: List): Tag[] {
        return Global.allTags != null ? Global.allTags.filter(t => list.tags.every(tl => tl.tagName !== t.name)) : null;
    }

    addTag(list: List, tagName: string) {
        if (tagName.length > 0) {
            let rel = new TagListRelation();
            rel.listId = list.id;
            rel.tagName = tagName;

            Global.server.addTagToList(rel).subscribe(result => {
                list.tags.push(rel);
            });
        }
    }

    deleteTag(list: List, tagName: string) {
        if (confirm("Wirklich löschen?")) {
            let rel = new TagListRelation();
            rel.listId = list.id;
            rel.tagName = tagName;

            Global.server.removeTagFromList(rel).subscribe(result => {
                let toDelete = list.tags.indexOf(list.tags.find(t => t.tagName === tagName));
                list.tags.splice(toDelete, 1);
            });
        }
    }

    addList(input: HTMLInputElement) {
        let listName = input.value;

        if (listName && listName.length > 2) {
            if (Global.user.lists.filter(l => l.name === listName).length == 0) {
                let list = new List();
                list.name = listName;
                list.userName = Global.user.username;

                Global.server.addOrUpdateList(list).subscribe(result => {
                    Global.user.lists.push(result);
                    alert("Zur Liste hinzugefügt");
                })
            } else {
                alert("Name bereits vorhanden");
            }
        } else {
            alert("Name ungültig");
        }
    }

    delete(id: number) {
        if (confirm("Wirklich löschen?")) {
            Global.server.removeList(id).subscribe(result => {
                let toDelete = Global.user.lists.indexOf(Global.user.lists.find(l => l.id === id));
                Global.user.lists.splice(toDelete, 1);
            })
        }
    }
}