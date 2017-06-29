import { Directive, Component, OnInit, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { AppComponent } from "../app.component";
import { Global } from "../Global";
import { User, List, Tag, ListComicRelation, TagListRelation, SearchResult, Issue, Volume } from "../Entities/dbObjects";

@Component({
    moduleId: module.id,
    templateUrl: "home.component.html"
})

export class HomeComponent implements OnInit {
    public tmpUser: User = new User();
    public showLogin: boolean = true;

    get Global() {
        return Global;
    }
    

    constructor() {
        var username = Global.getCookie("username");
        var password = Global.getCookie("password");

        if (username && password) {
            this.tmpUser.username = username;
            this.tmpUser.password = password;
            this.login();
        }
    }

    ngOnInit(): void {
    }

    login() {
        Global.server.loginUser(this.tmpUser).subscribe(result => {
            if (result) {
                Global.user = result;
                Global.setCookie("username", result.username);
                Global.setCookie("password", result.password);
            } else {
                alert("Einloggen konnte nicht durchgeführt werden");
            }           
        });
    }

    register() {
        Global.server.addOrUpdateUser(this.tmpUser).subscribe(result => {
            if (result) {
                this.login();
            } else {
                alert("Registrierung konnte nicht durchgeführt werden");
            }            
        });
    }
}