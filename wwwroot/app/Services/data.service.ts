import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { ServiceBase } from "./ServiceBase";
import { Global } from "../Global";

@Injectable()
export class DataService extends ServiceBase {
    constructor(private http: Http) { super(); }

    // fügt eine Position hinzu
    examplePost(): Observable<string> {
        return this.http.post("/data/ExamplePost", "")
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    // ruft alle Namen der vorhandenen Übersetzungsdateien ab
    exampleGet(): Observable<string> {
        return this.http.get("/data/ExampleGet")
            .map(this.deserialize)
            .catch(this.handleServerError);
    }
}