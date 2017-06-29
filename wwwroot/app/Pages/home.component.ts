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

    }

    ngOnInit(): void {
    }

    login() {
        Global.server.loginUser(this.tmpUser).subscribe(result => {
            if (result) {
                Global.user = result;
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