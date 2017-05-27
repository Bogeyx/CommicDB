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
    getAllTags(): Observable<Tag[]> {
        return this.http.get("/data/GetAllTags")
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    getUserByName(username: string): Observable<User> {
        return this.http.get("/data/GetUserByName?username=" + username, )
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    getListWithDataById(id: number): Observable<List> {
        return this.http.get("/data/GetListWithDataById?id=" + id, )
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    getComicById(id: number): Observable<Comic> {
        return this.http.get("/data/GetComicById?id=" + id, )
            .map(this.deserialize)
            .catch(this.handleServerError);
    }


    // addOrUpdate
    addOrUpdateList(list: List): Observable<List> {
        return this.http.post("/data/AddOrUpdateList", list)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    addOrUpdateComic(comic: Comic): Observable<Comic> {
        return this.http.post("/data/AddOrUpdateComic", comic)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    addOrUpdateUser(user: User): Observable<User> {
        return this.http.post("/data/AddOrUpdateUser", user)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    addTagToList(rel: TagListRelation): Observable<boolean> {
        return this.http.post("/data/AddTagToList", rel)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    addTagToComic(rel: TagComicRelation): Observable<boolean> {
        return this.http.post("/data/AddTagToComic", rel)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }


    // remove
    removeList(id: number): Observable<boolean> {
        return this.http.get("/data/RemoveList?id=" + id)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    removeComic(id: number): Observable<boolean> {
        return this.http.get("/data/RemoveComic?id=" + id)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    removeUser(userName: string): Observable<boolean> {
        return this.http.get("/data/RemoveUser?name=", userName)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    removeTagFromList(rel: TagListRelation): Observable<boolean> {
        return this.http.post("/data/RemoveTagFromList", rel)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    removeTagFromComic(rel: TagComicRelation): Observable<boolean> {
        return this.http.post("/data/RemoveTagFromComic", rel)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }
}