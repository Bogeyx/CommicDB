import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { ServiceBase } from "./ServiceBase";
import { Global } from "../Global";
import { User, List, Tag, ListComicRelation, TagListRelation, SearchResult, Issue, Volume, CheckData } from "../Entities/dbObjects";

@Injectable()
export class DataService extends ServiceBase {
    constructor(private http: Http) { super(); }

    // get
    getAllTags(): Observable<Tag[]> {
        return this.http.get("/data/GetAllTags")
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    loginUser(user : User): Observable<User> {
        return this.http.post("/data/LoginUser", user)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    getListWithDataById(id: number): Observable<List> {
        return this.http.get("/data/GetListWithDataById?id=" + id, )
            .map(this.deserialize)
            .catch(this.handleServerError);
    }


    // addOrUpdate
    addOrUpdateList(list: List): Observable<List> {
        return this.http.post("/data/AddOrUpdateList", list)
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

    addComicToList(rel: ListComicRelation): Observable<boolean> {
        return this.http.post("/data/AddComicToList", rel)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    addCheckData(data: CheckData): Observable<CheckData> {
        return this.http.post("/data/AddCheckData", data)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }


    // remove
    removeList(id: number): Observable<boolean> {
        return this.http.get("/data/RemoveList?id=" + id)
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

    removeComicFromList(rel: ListComicRelation): Observable<boolean> {
        let copy = Global.clone(rel);
        return this.http.post("/data/RemoveComicFromList", copy)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }

    removeCheckData(rel: TagListRelation): Observable<boolean> {
        return this.http.post("/data/RemoveCheckData", rel)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }


    // API
    apiSearch(text:string): Observable<SearchResult> {
        return this.http.get("/data/Search?text=" + text)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }
    apiGetIssue(id: number): Observable<Issue> {
        return this.http.get("/data/GetIssue?id=" + id)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }
    apiGetVolume(id: number): Observable<Volume> {
        return this.http.get("/data/GetVolume?id=" + id)
            .map(this.deserialize)
            .catch(this.handleServerError);
    }
}