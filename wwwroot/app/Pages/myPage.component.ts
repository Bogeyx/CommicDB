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
    get Global() {
        return Global;
    }


    constructor() {

    }

    ngOnInit(): void {
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
        Global.server.removeList(id).subscribe(result => {
            let toDelete = Global.user.lists.indexOf(Global.user.lists.find(l => l.id === id));
                Global.user.lists.splice(toDelete, 1);
        })
    }
}