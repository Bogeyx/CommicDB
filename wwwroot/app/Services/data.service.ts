import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { ServiceBase } from "./ServiceBase";
import { Global } from "../Global";
import { User, List, Comic, Tag, ListComicRelation, TagComicRelation, TagListRelation } from "../Entities/dbObjects";

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



    // get
    getTags(): Observable<string[]> {
        return this.http.get("/data/GetTags")
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    getUserByName(username: string): Observable<User> {
        return this.http.get("/data/GetUserByName?username=" + username, )
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    getListById(id: number): Observable<List> {
        return this.http.get("/data/GetListById?id=" + id, )
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    getComicById(id: number): Observable<Comic> {
        return this.http.get("/data/GetComicById?id=" + id, )
            .map(this.deserialize)
            .catch(this.handleServerError);
    }


    // addOrUpdate
    addOrList(list: List): Observable<List> {
        return this.http.post("/data/AddList", list)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    addOrComic(comic: Comic): Observable<Comic> {
        return this.http.post("/data/AddComic", comic)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    addOrUser(user: User): Observable<any> {
        return this.http.post("/data/AddUser", user)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }


    // remove
    removeList(id: number): Observable<List> {
        return this.http.get("/data/RemoveList?id=" + id)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    removeComic(id: number): Observable<Comic> {
        return this.http.get("/data/RemoveComic?id=" + id)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    removeUser(userName: string): Observable<any> {
        return this.http.get("/data/RemoveUser?name=", userName)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }
}