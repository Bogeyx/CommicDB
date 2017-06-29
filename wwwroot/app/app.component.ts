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
        let bot = new User();
        bot.username = "Bot";
        bot.password = "bot";

        Global.server.loginUser(bot).subscribe(result => {
            Global.bot = result;
        });

        Global.server.getAllTags().subscribe(result => {
            Global.allTags = result;
        });
    }

    ngOnInit(): void {
        $('#body-special').css("min-height", window.innerHeight - $('.header').height());
        window.onresize = function () {
            $('#body-special').css("min-height", window.innerHeight - $('.header').height());
        };
    }
}