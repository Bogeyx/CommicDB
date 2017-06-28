import { Directive, Component, OnInit, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { RouterModule, Router } from "@angular/router";

import { Global } from "./Global";
import { User, List, Tag, ListComicRelation, TagListRelation, SearchResult, Issue, Volume } from "./Entities/dbObjects";

@Component({
    moduleId: module.id,
    selector: "my-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements OnInit {
    get Global() {
        return Global;
    }

    constructor() {

        let user = new User();
        user.username = "TestUser";
        user.password = "none";

        Global.server.loginUser(user).subscribe(result => {
            Global.user = result;
        });
    }

    ngOnInit(): void {
        $('#body-special').css("min-height", window.innerHeight - $('.header').height());
        window.onresize = function () {
            $('#body-special').css("min-height", window.innerHeight - $('.header').height());
        };
    }
}