import { Directive, Component, OnInit, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { ActivatedRoute } from '@angular/router';

import { AppComponent } from "../app.component";
import { Global } from "../Global";
import { User, List, Tag, ListComicRelation, TagListRelation, SearchResult, Issue, Volume } from "../Entities/dbObjects";

@Component({
    moduleId: module.id,
    templateUrl: "listInfo.component.html"
})

export class ListInfoComponent implements OnInit {
    public list: List;
    public issues: Issue[] = [];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params['listId']) {
                let id = +params['listId'];
                this.list = Global.user.lists.find(l => l.id == id);

                this.list.comics.forEach(c => {
                    Global.server.apiGetIssue(c.comicId).subscribe(result => {
                        this.issues.push(result);
                    })
                })
            }            
        });
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

    delete(issueId: number) {
        if (confirm("Wirklich löschen?")) {
            Global.server.removeComicFromList(this.list.comics.find(c => c.comicId == issueId)).subscribe(result => {
                if (!result) {
                    alert("Eintrag konnte nicht gelöscht werden");
                } else {
                    let toDelete = this.list.comics.indexOf(this.list.comics.find(c => c.comicId === issueId));
                    this.list.comics.splice(toDelete, 1);
                    let toDeleteIssue = this.issues.indexOf(this.issues.find(i => i.id == issueId));
                    this.issues.splice(toDeleteIssue, 1);
                }
            });
        }
    }
}