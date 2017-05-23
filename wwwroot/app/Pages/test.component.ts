import { Directive, Component, OnInit, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { AppComponent } from "../app.component";
import { Global } from "../Global";

@Component({
    moduleId: module.id,
    templateUrl: "test.component.html"
})

export class TestComponent implements OnInit {
    public getTest: string;
    public postTest: string
    public tags: string[];

    constructor() {
        Global.server.exampleGet().subscribe(result => {
            this.getTest = result + " funktioniert";
        });

        Global.server.examplePost().subscribe(result => {
            this.postTest = result + " funktioniert";
        });

        Global.server.getTags().subscribe(result => {
            this.tags = result;
        });
    }

    ngOnInit(): void {
    }
}