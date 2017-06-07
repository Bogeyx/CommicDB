import { Directive, Component, OnInit, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { AppComponent } from "../app.component";
import { Global } from "../Global";
import { User, List, Comic, Tag, ListComicRelation, TagComicRelation, TagListRelation } from "../Entities/dbObjects";

@Component({
    moduleId: module.id,
    templateUrl: "test.component.html"
})

export class TestComponent implements OnInit {
    public getTest: string;
    public postTest: string
    public tags: Tag[];

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


        Global.server.getUserByName("TestUser").subscribe(result => {
            console.log(result);
        });

        Global.server.getComicById(1).subscribe(comic => {
            console.log(comic);
        });
    }

    ngOnInit(): void {
    }
}